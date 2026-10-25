# Adaptive model cache experiment

Branch: `test/adaptive-model-cache`, based on main `e22d6b5`.

The scene keeps its tileset objects and shares a tile-resource allowance across OSM,
Rhino buildings, Rhino urban, and BIM. The approximate `navigator.deviceMemory`
hint selects 96 MiB for unknown/low-memory devices, 192 MiB for 4 GiB, or 384 MiB
for 8 GiB and above. Unsupported browsers use 96 MiB. These are experimental
starting values, not established safe device limits. Total device RAM does not
report free memory, GPU capacity, or the browser's tab limit.

The selected group receives the available allowance, including 20% overflow.
The most recently hidden group can retain up to 40% of the shared allowance for
45 seconds, with no hidden overflow. Older groups release tile content while
keeping their tileset objects. If estimated usage exceeds the shared budget, the
recently hidden group also releases content immediately. Returning before eviction
reuses retained content; returning afterward requires content loading and GPU uploads.

Allocations rebalance every two seconds and on registration/selection. Within the
active group, tilesets with more observed loaded content receive more allowance,
with a minimum allocation weight for unloaded buildings. The budget is shared
across all 60 Rhino buildings rather than applied to each building separately.
Late-loading model groups honor the current selection when they register.

This is a soft budget: Cesium's resource estimate excludes other browser resources,
and coarse tiles, in-flight work, and delayed unloading may exceed the allowance.
Terrain, imagery, decoded photos, and the rest of the application need additional
memory. The controller does not infer memory safety from FPS or increase its ceiling
until the browser fails. It does not change model detail settings or asset files.

## Try it locally

Run `yarn dev` with your usual environment settings. For production-equivalent
imagery load, use `PUBLIC_SHOW_MAPBOX=true` in the local environment.

Development-only URL controls:

- `/?modelCacheMemory=2`: simulate the 96 MiB tier.
- `/?modelCacheMemory=4`: simulate the 192 MiB tier.
- `/?modelCacheMemory=8`: simulate the 384 MiB tier.
- `/?modelCacheMemory=unknown`: simulate an unavailable device hint.
- `/?modelCache=off`: preserve Cesium's default caches for comparison.

In the development browser console:

```js
const stats = window.modelCacheDebug.snapshot();
console.log(stats);
console.table(stats.groups);
```

Snapshots include estimated resource use and the assigned allowance per group,
plus the selected tier, active group, and retained group. Query overrides and this
debug interface are unavailable in production; production uses the actual browser
hint with the conservative fallback.

On a physical affected device, compare fresh sessions at the same camera positions:

1. Visit several areas in OSM, then select Rhino buildings and return within 30 seconds.
2. Repeat after leaving Rhino selected for more than 45 seconds.
3. Cycle all four groups and confirm only the current and latest hidden group have allowances.
4. Explore more buildings and inspect whether pressure evicts the hidden group earlier.
5. Compare switching latency, network requests, resource estimates, and tab stability
   with caching disabled and across the simulated tiers. Simulating a tier does not
   simulate that device's hardware capacity.

Run the policy tests with `yarn test:model-cache` (Node 22.18+ or Node 24).
These use fake tilesets and a controlled clock; physical-device validation is still
needed to establish suitable budgets and actual Cesium eviction/switching behavior.
