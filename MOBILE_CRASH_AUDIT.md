# Mobile stability audit

Date: 25 October 2026
Baseline: `origin/main` at `e22d6b58489ecf27938c8791c3d958572ffef0bc`
Scope: index page, Cesium scene and loaders, React menus and primitives, layouts, application state, assets, and API/analytics paths.

## Assessment and limits

The leading remaining source-backed concern after sustained mobile use is memory pressure across independent Cesium tile caches. Continuous rendering and simultaneously enabled basemaps add sustained GPU and imagery load. Main has fixed the accumulating menu store listeners and substantially reduced routine image memory demand through optimized previews; those original findings should no longer be treated as current high-severity causes. These are source-backed findings; no physical-device crash, heap profile, or WebGL context loss was captured, so the root cause remains unconfirmed.

This is a documentation-only audit update. No application code or configuration was changed beyond bringing the audit branch up to main. The original audit checked Cesium 1.142.0 and Nanostores implementations. This refresh rechecked cache and rendering defaults against the installed Cesium 1.146.0 engine/widgets source in the main workspace, matching main's dependency upgrade. Loader counts and changed application paths were inspected directly. No physical-device profiling or application build/lint run was performed for this Markdown-only update.

## Changes since the previous baseline

| Main change                                                         | Effect on this audit                                                                                                                           |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `3ae4eca` (#213), menu subscription cleanup                         | Finding 1 resolved in source; the missing bottom-panel ref is also guarded.                                                                    |
| `354e31c` (#214), Astro JPG previews                                | Finding 3 substantially mitigated; residual eager slide loading and point-photo EXIF reads remain.                                             |
| `29f39a9`, `59cee3d`, `b0ec3ec` (#212, #215, #216), model additions | Rhino loader count rises from 44 to **60**. University Hall now belongs to the normal Rhino model group.                                       |
| `a321603` (#217), Cesium 1.146.0                                    | Relevant cache/render defaults remain unchanged in the installed version. The upgrade alone does not demonstrate resolution of a device crash. |
| `e22d6b5` (#218), building images                                   | More photos are available, using the preview pipeline; source image count or disk size does not establish startup decoded-image usage.         |

Finding numbers below are retained so earlier references remain meaningful.

## Findings

### 1. Resolved in main: store listeners accumulated on every component render

Evidence: [Menu.tsx](src/components/menu/Menu.tsx), [Searchbar.tsx](src/components/menu/Searchbar.tsx), [BuildingInfo.tsx](src/components/menu/building-info/BuildingInfo.tsx), and [PointInfo.tsx](src/components/menu/points-of-interest/PointInfo.tsx).

All four manual subscriptions now register inside `useEffect` and return the Nanostores unsubscribe function. Searchbar stabilizes its scroll callback with `useCallback`, and the effects declare their dependencies. Menu also checks that its bottom-panel ref exists before reading or writing its height. Re-renders and unmounts therefore no longer leave behind the registrations identified in the original audit.

The earlier isolated 1,000-listener check demonstrated the old pattern, not the current application's listener count. Physical-device verification should confirm listener counts stabilize across repeated search and panel sessions; the source defect itself is fixed by #213.

### 2. High: separate model caches have no shared mobile memory budget

Evidence: [CesiumScene.astro](src/components/cesium/CesiumScene.astro), [cesiumUtils.ts](src/components/cesium/cesiumUtils.ts), and [rhinoBuildingModels.ts](src/components/cesium/rhinoBuildingModels.ts).

The scene initializes OSM buildings, two BIM tilesets, an urban tileset, and 60 Rhino building tilesets. Switching model groups changes their `show` flags. It does not explicitly trim loaded tile caches or destroy inactive tilesets.

The installed Cesium 1.146.0 implementation defaults to 512 MiB of `cacheBytes` plus 512 MiB of `maximumCacheOverflowBytes` **per tileset**. These are allowances, not immediate allocations or a prediction that every tileset reaches that usage. There is no application-wide budget across these independent caches. Content loaded while exploring a model group can remain cached after the group is hidden, especially below its individual eviction threshold.

`globe.tileCacheSize = 50` controls the globe tile cache; it does not constrain the separate 3D Tiles caches.

Important qualification: `preloadWhenHidden` defaults to false. Initializing all hidden tilesets does not mean their full geometry streams at startup. The stronger concern is retained content after viewing and switching models, plus the metadata and initialization overhead.

Suggested follow-up: record each tileset's `totalMemoryUsageInBytes` before and after switching groups, and consider shared budgeting, lazy initialization, or releasing inactive content. This metric is an estimate of tile resources, not total browser-process memory.

Reference: [Cesium3DTileset cache documentation](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileset.html#cacheBytes).

### 3. Substantially mitigated; residual medium concern: image and metadata work

Evidence: [imagePreviews.ts](src/lib/imagePreviews.ts), [index.astro](src/pages/index.astro), [LazyImage.tsx](src/components/primitives/LazyImage.tsx), [Carousel.tsx](src/components/primitives/Carousel.tsx), and [PointInfo.tsx](src/components/menu/points-of-interest/PointInfo.tsx).

The Astro page now generates JPG previews at quality 80 and a maximum width of 960 pixels, preserving aspect ratio and avoiding upscaling. The preview URL map reaches React through context. `LazyImage` displays the preview with asynchronous decoding; original URLs remain available for downloads and optional metadata. Ordinary building carousels no longer fetch the original image for EXIF. Metadata reads now run only when `showDateTime` is requested and use an AbortController on cleanup. Image changes also reset loading and metadata state through a keyed component.

The earlier 5712 × 4284 Raffles Hall photos correspond to approximately 960 × 720 previews: about **2.64 MiB** per unscaled RGBA bitmap rather than **93.3 MiB** for the source. These are width × height × 4 estimates, not measured browser allocations. The old full-resolution bitmap table does not describe the current routine carousel path.

Residual work remains: all carousel slides mount together, and the image element has no viewport-based lazy loading. PointInfo's regular photo still requests `showDateTime`, which fetches the complete original into an ArrayBuffer and parses EXIF. Aborting a fetch on unmount helps, but does not interrupt synchronous EXIF parsing already in progress. Hidden desktop and mobile detail panels can duplicate effects (finding 4), although browser caching and decoded-resource sharing may reduce duplication.

Suggested follow-up: profile image-heavy visits and point-photo metadata reads on a physical device, compare original-image requests with preview requests, and consider deferring offscreen slides or supplying timestamps without full-file reads. Treat the original high-severity full-resolution carousel concern as mitigated by #214, with these narrower residual costs still unmeasured.

### 4. Medium: mobile can mount both mobile and hidden desktop details

Evidence: [Menu.tsx](src/components/menu/Menu.tsx) and [Searchbar.tsx](src/components/menu/Searchbar.tsx).

Desktop menus are hidden using `hidden lg:flex`; React still mounts their contents. Building selection sets both the desktop `left` page and mobile `bottom` page to `building-info`. On mobile, two BuildingInfo components can therefore mount, each with its carousel, effects, and subscriptions. Those subscriptions now clean up correctly (finding 1). Point selection similarly sets both page locations.

This still duplicates component work and the residual image/metadata work in finding 3. Smaller previews and subscription cleanup reduce its impact relative to the original audit. It does not prove every image bitmap is duplicated, because browser resource sharing may apply. The desktop search component is also mounted on mobile despite being invisible.

Suggested follow-up: inspect mounted components on a phone-width viewport and compare requests, effects, and listener counts for one building selection.

### 5. Medium: three basemaps remain enabled simultaneously

Evidence: `addMapLayer`, `tileLoadProgressListener`, and the `activeMapLayer` subscription in [CesiumScene.astro](src/components/cesium/CesiumScene.astro).

After initial globe loading, the scene adds dark, satellite, and street layers. Selecting a map raises it to the top but does not hide or remove the others. Cesium prepares imagery for enabled layers even when an opaque layer covers them. This creates avoidable imagery requests and texture residency while navigating.

Production always enables the Mapbox path, while development only enables it when `PUBLIC_SHOW_MAPBOX` is true. A default local session may therefore underrepresent production resource use.

Suggested follow-up: compare network activity and memory with only the selected imagery layer enabled.

### 6. Medium: continuous rendering sustains mobile GPU load

Evidence: Viewer options in [CesiumScene.astro](src/components/cesium/CesiumScene.astro), plus backdrop-filter styles in [app.css](src/styles/app.css) and related partials.

The Viewer leaves `requestRenderMode` at its false default and does not specify `targetFrameRate`. `animation: false` hides the animation widget; it does not stop the render loop. Supported WebGL2 devices also inherit the default four-sample MSAA setting. Blurred overlays add compositing work over the changing scene.

This is sustained load rather than a demonstrated memory leak. It can worsen battery use, heat, and responsiveness over time, and may contribute to GPU instability on constrained devices.

The app does not explicitly enable device-pixel-ratio rendering: Cesium defaults `useBrowserRecommendedResolution` to true. High phone pixel density alone should not be assumed to multiply the canvas dimensions here.

Suggested follow-up: measure idle frame activity, temperature, and frame time; evaluate explicit rendering and mobile quality settings while ensuring state changes still request frames.

Reference: [Cesium Viewer options](https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#.ConstructorOptions).

## Other defects and lower-confidence contributors

- **Incorrect loading-completion test:** `tileLoadProgressListener` tests `osmBuildingsTileset.allTilesLoaded`, which is an Event object, rather than the `tilesLoaded` boolean. The object is truthy, so the loading screen may disappear and extra imagery may be added before OSM finishes. This is a definite correctness issue, not an established crash trigger.
- **Unbounded map-selection retry:** `updateLayer` schedules another timeout every 100 ms when a selected layer is missing, without cancellation or a retry limit. Failed initialization or an invalid persisted map-layer value can leave retries running indefinitely.
- **Screenshot memory peaks:** the screenshot handler creates a canvas data URL, an image, a second canvas, and another data URL. This can create temporary memory pressure. It sets `resolutionScale = 2`, but calls `scene.render` without explicitly resizing the widget before restoring the scale, so a fourfold capture allocation should not be assumed from this code alone.
- **Unguarded selection lookups:** Searchbar reads `.name` from the first matching building, BuildingInfo calls `Object.entries` on its lookup result, and PointInfo does the same for points. Unexpected or missing IDs can throw. These explain application errors more directly than an operating-system tab termination.
- **Missing scene teardown:** Cesium store subscriptions, camera listeners, and the index MutationObserver have no explicit teardown. The current layout has no client router, so repeated in-document Viewer creation was not established. This is a lifecycle risk rather than evidence that normal page visits accumulate multiple Viewers.
- **Scroll listener cleanup mismatch:** ScrollContainer adds and removes different anonymous scroll functions. Its cleanup therefore does not remove that listener. Detached nodes can still be garbage-collected if nothing retains them, so this alone does not establish an unbounded leak.
- **Eager GIS loading:** all three GeoJSON sources load regardless of selection. The files contain 420 building footprints, 2,059 road features, and 54 green-space features. Their initial state is hidden after subscription synchronization, but parsing and entity creation still occur. This is baseline overhead, with lower priority than the findings above.

The reviewed API and analytics paths did not reveal a comparable long-lived client allocation pattern. Large downloadable CAD files in `public` are not automatically loaded merely because they exist; their disk sizes should not be treated as startup memory usage.

## University Hall: superseded local-checkout observation

The original audit described an uncommitted, always-visible Ion asset `6072623` outside the model groups. That standalone addition is absent from the current baseline. Main now loads `/university-hall/university-hall-rhino-ion/tileset.json` through `rhinoBuildingModels.ts`, adds it hidden with the other Rhino buildings, and includes it in the group's show/hide functions. It is one of the 60 Rhino tilesets counted above, not an extra always-visible tileset. The old local-checkout warning does not apply to this implementation; the shared-budget concern in finding 2 still does.

## Verification plan

Use a physical affected device with remote browser inspection and production-equivalent Mapbox settings. Repeat each scenario from a fresh page load:

1. Leave the initial scene idle for several minutes.
2. Pan and zoom without opening panels.
3. Cycle OSM, Rhino buildings, urban, and BIM repeatedly.
4. Open and close mobile search repeatedly; type queries and select buildings.
5. Visit image-heavy buildings, including Raffles Hall, and points of interest.
6. Generate screenshots separately from the other scenarios.

Record device/browser version, elapsed time, listener counts for `activePages`, `buildingId`, and `pointId`, heap trends where supported, each tileset's memory estimate, network activity, console exceptions, Cesium render errors, and WebGL context-loss events. Use device/process diagnostics where available to identify memory termination; a JavaScript heap alone does not account for GPU resources and decoded images.

Distinguish these outcomes: the operating system reloads or terminates the tab, the WebGL context is lost, Cesium stops rendering after an error, or React fails after an uncaught exception. Prioritize model-cache measurements, selected-basemap-only comparisons, and idle rendering measurements before selecting a final fix. Use repeated panel sessions to verify the subscription fix, and profile the narrower remaining image/metadata paths rather than assuming the old full-resolution carousel behavior persists.
