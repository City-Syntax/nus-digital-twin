# Mobile stability audit

Date: 23 October 2026
Baseline: `origin/main` at `6a0c067c74ddfbdb89a425dc6603efd32fe6a2b3`
Scope: index page, Cesium scene and loaders, React menus and primitives, layouts, application state, assets, and API/analytics paths.

## Assessment and limits

The strongest explanation for a crash after sustained mobile use is combined memory pressure from Cesium tile caches and large images, compounded by store listeners that accumulate during interaction. Continuous rendering adds sustained GPU load. These are source-backed findings; no physical-device crash, heap profile, or WebGL context loss was captured, so the root cause remains unconfirmed.

This is a documentation-only audit. No application code or configuration was changed. Dependency behavior was checked against the installed Cesium 1.142.0 and Nanostores implementations in the original workspace and Cesium's official documentation. Asset dimensions and loader counts were inspected directly. Application builds and lint checks were not run because this change only adds Markdown.

The original audit examined a different checkout with 46 Rhino building tilesets and an uncommitted, always-visible University Hall tileset. This main baseline has **44 Rhino building tilesets** and does **not** contain that University Hall addition. The addition is discussed separately below and is not attributed to main.

## Findings

### 1. High: store listeners accumulate on every component render

Evidence:

- [Menu.tsx](src/components/menu/Menu.tsx#L48): `activePages.listen(...)` runs in the component body.
- [Searchbar.tsx](src/components/menu/Searchbar.tsx#L71): `buildingId.listen(...)` runs in the component body.
- [BuildingInfo.tsx](src/components/menu/building-info/BuildingInfo.tsx#L28): another `buildingId.listen(...)` runs in the component body.
- [PointInfo.tsx](src/components/menu/points-of-interest/PointInfo.tsx#L16): `pointId.listen(...)` runs in the component body.

None retains and invokes the unsubscribe function. Each render adds another callback to a long-lived store. Typing in search, selecting buildings, and changing menu state increase registrations. Closing and reopening the mobile search panel also leaves old listeners behind. These callbacks retain component-related closures, and later store updates invoke all accumulated callbacks.

This is a definite leak pattern. An isolated check of the installed Nanostores implementation confirmed that 1,000 registrations without cleanup retain 1,000 listeners; this was not a measurement of the running application's listener count.

Suggested follow-up: register subscriptions in effects with cleanup, or express the reaction through `useStore` and effects. Measure store listener counts across repeated search and panel sessions.

### 2. High: separate model caches have no shared mobile memory budget

Evidence: [CesiumScene.astro](src/components/cesium/CesiumScene.astro), [cesiumUtils.ts](src/components/cesium/cesiumUtils.ts), and [rhinoBuildingModels.ts](src/components/cesium/rhinoBuildingModels.ts).

The scene initializes OSM buildings, two BIM tilesets, an urban tileset, and 44 Rhino building tilesets. Switching model groups changes their `show` flags. It does not explicitly trim loaded tile caches or destroy inactive tilesets.

The installed Cesium implementation defaults to 512 MiB of `cacheBytes` plus 512 MiB of `maximumCacheOverflowBytes` **per tileset**. These are allowances, not immediate allocations or a prediction that every tileset reaches that usage. There is no application-wide budget across these independent caches. Content loaded while exploring a model group can remain cached after the group is hidden, especially below its individual eviction threshold.

`globe.tileCacheSize = 50` controls the globe tile cache; it does not constrain the separate 3D Tiles caches.

Important qualification: `preloadWhenHidden` defaults to false. Initializing all hidden tilesets does not mean their full geometry streams at startup. The stronger concern is retained content after viewing and switching models, plus the metadata and initialization overhead.

Suggested follow-up: record each tileset's `totalMemoryUsageInBytes` before and after switching groups, and consider shared budgeting, lazy initialization, or releasing inactive content. This metric is an estimate of tile resources, not total browser-process memory.

Reference: [Cesium3DTileset cache documentation](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileset.html#cacheBytes).

### 3. High: full-resolution images create substantial transient memory demand

Evidence: [LazyImage.tsx](src/components/primitives/LazyImage.tsx#L30) and [Carousel.tsx](src/components/primitives/Carousel.tsx).

`LazyImage` imports an image URL, fetches the complete file into an `ArrayBuffer`, and parses EXIF before displaying the image. It does this even when the date is not displayed. The effect has no cancellation when the panel closes. The image element requests no smaller responsive variant, and carousel slides all mount together. The component does not implement viewport-based lazy loading.

Examples from repository assets:

| Image | Dimensions | Approximate unscaled RGBA bitmap size |
| --- | --- | --- |
| `raffles-hall-6-2.jpg` | 5712 × 4284 | 93.3 MiB |
| `raffles-hall-6-3.jpg` | 5712 × 4284 | 93.3 MiB |
| `sde4-2.jpg` | 4592 × 3448 | 60.4 MiB |
| `pioneer-house-1.jpg` | 4032 × 3024 | 46.5 MiB |

These are width × height × 4 estimates, not observed allocations. Browsers may downsample, share decoded resources, or evict them. Nevertheless, image decoding and full-file EXIF reads can produce significant peaks alongside WebGL resources. Rapidly changing panels can leave several reads in flight.

Suggested follow-up: profile image-heavy building visits, serve display-sized variants, defer offscreen slides, and avoid EXIF parsing when the metadata is not needed.

### 4. High: mobile can mount both mobile and hidden desktop details

Evidence: [Menu.tsx](src/components/menu/Menu.tsx#L57) and [Searchbar.tsx](src/components/menu/Searchbar.tsx#L197).

Desktop menus are hidden using `hidden lg:flex`; React still mounts their contents. Building selection sets both the desktop `left` page and mobile `bottom` page to `building-info`. On mobile, two BuildingInfo components can therefore mount, each with its carousel, effects, and listeners. Point selection similarly sets both page locations.

This duplicates application work and compounds findings 1 and 3. It does not prove every image bitmap is duplicated, because browser resource sharing may apply. The desktop search component is also mounted on mobile despite being invisible.

Suggested follow-up: inspect mounted components on a phone-width viewport and compare requests, effects, and listener counts for one building selection.

### 5. Medium: three basemaps remain enabled simultaneously

Evidence: `addMapLayer`, `tileLoadProgressListener`, and the `activeMapLayer` subscription in [CesiumScene.astro](src/components/cesium/CesiumScene.astro).

After initial globe loading, the scene adds dark, satellite, and street layers. Selecting a map raises it to the top but does not hide or remove the others. Cesium prepares imagery for enabled layers even when an opaque layer covers them. This creates avoidable imagery requests and texture residency while navigating.

Production always enables the Mapbox path, while development only enables it when `PUBLIC_SHOW_MAPBOX` is true. A default local session may therefore underrepresent production resource use.

Suggested follow-up: compare network activity and memory with only the selected imagery layer enabled.

### 6. Medium: continuous rendering sustains mobile GPU load

Evidence: Viewer options in [CesiumScene.astro](src/components/cesium/CesiumScene.astro#L72), plus backdrop-filter styles in [app.css](src/styles/app.css) and related partials.

The Viewer leaves `requestRenderMode` at its false default and does not specify `targetFrameRate`. `animation: false` hides the animation widget; it does not stop the render loop. Supported WebGL2 devices also inherit the default four-sample MSAA setting. Blurred overlays add compositing work over the changing scene.

This is sustained load rather than a demonstrated memory leak. It can worsen battery use, heat, and responsiveness over time, and may contribute to GPU instability on constrained devices.

The app does not explicitly enable device-pixel-ratio rendering: Cesium defaults `useBrowserRecommendedResolution` to true. High phone pixel density alone should not be assumed to multiply the canvas dimensions here.

Suggested follow-up: measure idle frame activity, temperature, and frame time; evaluate explicit rendering and mobile quality settings while ensuring state changes still request frames.

Reference: [Cesium Viewer options](https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#.ConstructorOptions).

## Other defects and lower-confidence contributors

- **Incorrect loading-completion test:** `tileLoadProgressListener` tests `osmBuildingsTileset.allTilesLoaded`, which is an Event object, rather than the `tilesLoaded` boolean. The object is truthy, so the loading screen may disappear and extra imagery may be added before OSM finishes. This is a definite correctness issue, not an established crash trigger.
- **Unbounded map-selection retry:** `updateLayer` schedules another timeout every 100 ms when a selected layer is missing, without cancellation or a retry limit. Failed initialization or an invalid persisted map-layer value can leave retries running indefinitely.
- **Screenshot memory peaks:** the screenshot handler creates a canvas data URL, an image, a second canvas, and another data URL. This can create temporary memory pressure. It sets `resolutionScale = 2`, but calls `scene.render` without explicitly resizing the widget before restoring the scale, so a fourfold capture allocation should not be assumed from this code alone.
- **Unguarded selection lookups:** Searchbar reads `.name` from the first matching building, BuildingInfo calls `Object.entries` on its lookup result, and PointInfo does the same for points. Unexpected or missing IDs can throw. Menu's listener also assumes its bottom-panel ref exists when closing. These explain application errors more directly than an operating-system tab termination.
- **Missing scene teardown:** Cesium store subscriptions, camera listeners, and the index MutationObserver have no explicit teardown. The current layout has no client router, so repeated in-document Viewer creation was not established. This is a lifecycle risk rather than evidence that normal page visits accumulate multiple Viewers.
- **Scroll listener cleanup mismatch:** ScrollContainer adds and removes different anonymous scroll functions. Its cleanup therefore does not remove that listener. Detached nodes can still be garbage-collected if nothing retains them, so this alone does not establish an unbounded leak.
- **Eager GIS loading:** all three GeoJSON sources load regardless of selection. The files contain 420 building footprints, 2,059 road features, and 54 green-space features. Their initial state is hidden after subscription synchronization, but parsing and entity creation still occur. This is baseline overhead, with lower priority than the findings above.

The reviewed API and analytics paths did not reveal a comparable long-lived client allocation pattern. Large downloadable CAD files in `public` are not automatically loaded merely because they exist; their disk sizes should not be treated as startup memory usage.

## Finding specific to the original local checkout

The original uncommitted CesiumScene change adds Ion asset `6072623` as an always-visible University Hall tileset. It sits outside the model groups, so their toggles do not hide it. It introduces another active tileset and independent cache. That code is absent from the main baseline used for this report, and its deployment status is unknown.

## Verification plan

Use a physical affected device with remote browser inspection and production-equivalent Mapbox settings. Repeat each scenario from a fresh page load:

1. Leave the initial scene idle for several minutes.
2. Pan and zoom without opening panels.
3. Cycle OSM, Rhino buildings, urban, and BIM repeatedly.
4. Open and close mobile search repeatedly; type queries and select buildings.
5. Visit image-heavy buildings, including Raffles Hall, and points of interest.
6. Generate screenshots separately from the other scenarios.

Record device/browser version, elapsed time, listener counts for `activePages`, `buildingId`, and `pointId`, heap trends where supported, each tileset's memory estimate, network activity, console exceptions, Cesium render errors, and WebGL context-loss events. Use device/process diagnostics where available to identify memory termination; a JavaScript heap alone does not account for GPU resources and decoded images.

Distinguish these outcomes: the operating system reloads or terminates the tab, the WebGL context is lost, Cesium stops rendering after an error, or React fails after an uncaught exception. Prioritize listener cleanup and measurements of model/image memory before selecting a final fix.
