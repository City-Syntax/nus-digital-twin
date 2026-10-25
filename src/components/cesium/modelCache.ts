const MiB = 1024 * 1024;
const RETAIN_MS = 45_000;

// Structural type keeps the policy testable without constructing a WebGL scene.
export type CachedTileset = {
  show: boolean;
  cacheBytes: number;
  maximumCacheOverflowBytes: number;
  totalMemoryUsageInBytes: number;
  trimLoadedTiles(): void;
};

type Group = {
  tilesets: CachedTileset[];
  hiddenAt: number;
};

export function getModelCacheBudget(deviceMemory?: number) {
  if (deviceMemory !== undefined && Number.isFinite(deviceMemory)) {
    if (deviceMemory >= 8) return 384 * MiB;
    if (deviceMemory >= 4) return 192 * MiB;
  }
  return 96 * MiB;
}

/** A shared, soft tile-resource budget; this is not a browser memory limit. */
export function createModelCache(options: {
  deviceMemory?: number;
  enabled?: boolean;
  requestRender: () => void;
  now?: () => number;
}) {
  const budget = getModelCacheBudget(options.deviceMemory);
  const now = options.now ?? (() => performance.now());
  const groups = new Map<string, Group>();
  let active = '';
  let warm = '';
  let lastUpdate = -Infinity;

  const usage = (group: Group) => group.tilesets.reduce((sum, tile) => sum + tile.totalMemoryUsageInBytes, 0);

  function allocate(group: Group, bytes: number, visible: boolean) {
    // Loaded buildings get more headroom than unloaded/offscreen buildings.
    // Rebalance as traversal loads content, rather than multiplying a fixed cap by 60.
    const weights = group.tilesets.map((tile) =>
      visible ? Math.max(tile.totalMemoryUsageInBytes, MiB) : tile.totalMemoryUsageInBytes,
    );
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    group.tilesets.forEach((tile, index) => {
      const allowance = totalWeight > 0 ? Math.floor((bytes * weights[index]) / totalWeight) : 0;
      const cache = visible ? Math.floor(allowance * 0.8) : allowance;
      const overflow = visible ? allowance - cache : 0;
      const wasCached = tile.cacheBytes + tile.maximumCacheOverflowBytes > 0;
      tile.cacheBytes = cache;
      tile.maximumCacheOverflowBytes = overflow;
      if (wasCached && allowance === 0) tile.trimLoadedTiles();
    });
  }

  function rebalance() {
    const time = now();
    if (options.enabled === false) {
      lastUpdate = time;
      return;
    }
    const retained = groups.get(warm);
    const totalUsage = [...groups.values()].reduce((sum, group) => sum + usage(group), 0);
    // Pressure takes priority over the grace period. Once evicted, do not
    // automatically warm the group again until it is actually selected.
    if (!retained || time - retained.hiddenAt >= RETAIN_MS || totalUsage > budget) warm = '';

    const warmGroup = groups.get(warm);
    const warmBudget = warmGroup ? Math.min(usage(warmGroup), Math.floor(budget * 0.4)) : 0;
    for (const [id, group] of groups) {
      const visible = id === active;
      const groupBudget = visible ? budget - warmBudget : id === warm ? warmBudget : 0;
      allocate(group, groupBudget, visible);
    }
    lastUpdate = time;
    options.requestRender();
  }

  return {
    register(id: string, tilesets: CachedTileset[]) {
      if (groups.has(id)) throw new Error(`Model cache group already registered: ${id}`);
      groups.set(id, { tilesets, hiddenAt: -Infinity });
      for (const tile of tilesets) tile.show = id === active;
      rebalance();
    },
    select(id: string) {
      if (id === active) return;
      const previous = groups.get(active);
      if (previous) {
        previous.hiddenAt = now();
        warm = active;
      }
      active = id;
      if (warm === active) warm = '';
      for (const [groupId, group] of groups) {
        for (const tile of group.tilesets) tile.show = groupId === active;
      }
      rebalance();
    },
    update() {
      if (now() - lastUpdate >= 2_000) rebalance();
    },
    snapshot() {
      return {
        enabled: options.enabled !== false,
        deviceMemory: options.deviceMemory ?? null,
        budgetMiB: budget / MiB,
        active,
        warm,
        groups: [...groups].map(([id, group]) => ({
          id,
          tilesets: group.tilesets.length,
          usageMiB: usage(group) / MiB,
          allowanceMiB:
            group.tilesets.reduce((sum, tile) => sum + tile.cacheBytes + tile.maximumCacheOverflowBytes, 0) / MiB,
        })),
      };
    },
  };
}
