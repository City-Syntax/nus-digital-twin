import assert from 'node:assert/strict';
import test from 'node:test';
import { createModelCache, getModelCacheBudget } from '../src/components/cesium/modelCache.ts';

const MiB = 1024 * 1024;
const tile = (usageMiB = 0) => ({
  show: false,
  cacheBytes: 512 * MiB,
  maximumCacheOverflowBytes: 512 * MiB,
  totalMemoryUsageInBytes: usageMiB * MiB,
  trims: 0,
  trimLoadedTiles() {
    this.trims++;
  },
});
const allowance = (tileset) => tileset.cacheBytes + tileset.maximumCacheOverflowBytes;

function setup(options = {}) {
  let time = 0;
  const cache = createModelCache({ requestRender() {}, now: () => time, ...options });
  return {
    cache,
    advance: (ms) => {
      time += ms;
      cache.update();
    },
  };
}

test('device hints choose bounded tiers, with a conservative unknown/invalid fallback', () => {
  for (const hint of [undefined, NaN, Infinity, -1, 0.5, 2]) {
    assert.equal(getModelCacheBudget(hint), 96 * MiB);
  }
  assert.equal(getModelCacheBudget(4), 192 * MiB);
  assert.equal(getModelCacheBudget(8), 384 * MiB);
  assert.equal(getModelCacheBudget(128), 384 * MiB);
});

test('60 active tilesets share one allowance including overflow', () => {
  const { cache } = setup();
  const buildings = Array.from({ length: 60 }, () => tile());
  cache.select('rhino');
  cache.register('rhino', buildings);
  const total = buildings.reduce((sum, model) => sum + allowance(model), 0);
  assert.ok(total <= 96 * MiB);
  assert.ok(total >= 95 * MiB);
  assert.ok(buildings.every((model) => model.show && model.maximumCacheOverflowBytes > 0));
});

test('recently hidden content stays allocated and switching back reuses the same objects', () => {
  const { cache, advance } = setup();
  const osm = tile(20);
  const rhino = tile(10);
  cache.select('osm');
  cache.register('osm', [osm]);
  cache.register('rhino', [rhino]);
  cache.select('rhino');
  assert.equal(osm.show, false);
  assert.equal(allowance(osm), 20 * MiB);
  assert.equal(osm.maximumCacheOverflowBytes, 0);
  assert.equal(cache.snapshot().warm, 'osm');
  advance(30_000);
  cache.select('osm');
  assert.equal(osm.show, true);
  assert.equal(cache.snapshot().warm, 'rhino');
  assert.equal(allowance(rhino), 10 * MiB);
  assert.ok(allowance(osm) > 20 * MiB);
});

test('grace expiry releases hidden content once without destroying the tileset', () => {
  const { cache, advance } = setup();
  const osm = tile(20);
  cache.select('osm');
  cache.register('osm', [osm]);
  cache.register('rhino', [tile(10)]);
  cache.select('rhino');
  const trimsBefore = osm.trims;
  advance(46_000);
  assert.equal(allowance(osm), 0);
  assert.equal(osm.trims, trimsBefore + 1);
  assert.equal(cache.snapshot().warm, '');
  advance(2_000);
  assert.equal(osm.trims, trimsBefore + 1);
});

test('budget pressure evicts the warm group before its grace period expires', () => {
  const { cache, advance } = setup();
  const osm = tile(20);
  const rhino = tile(10);
  cache.select('osm');
  cache.register('osm', [osm]);
  cache.register('rhino', [rhino]);
  cache.select('rhino');
  rhino.totalMemoryUsageInBytes = 90 * MiB;
  advance(2_000);
  assert.equal(allowance(osm), 0);
  assert.equal(allowance(rhino), 96 * MiB);
  // Simulate Cesium completing the queued unload; eviction stays in effect.
  osm.totalMemoryUsageInBytes = 0;
  advance(2_000);
  assert.equal(cache.snapshot().warm, '');
});

test('only the latest hidden group stays warm across three selections', () => {
  const { cache } = setup();
  const models = [tile(10), tile(10), tile(10)];
  cache.select('a');
  ['a', 'b', 'c'].forEach((id, index) => cache.register(id, [models[index]]));
  cache.select('b');
  cache.select('c');
  assert.equal(allowance(models[0]), 0);
  assert.equal(allowance(models[1]), 10 * MiB);
  assert.equal(cache.snapshot().warm, 'b');
});

test('late registration honors the current selection and immediately applies limits', () => {
  const { cache } = setup();
  cache.select('rhino');
  const rhino = tile();
  const osm = tile();
  cache.register('osm', [osm]);
  cache.register('rhino', [rhino]);
  assert.equal(osm.show, false);
  assert.equal(allowance(osm), 0);
  assert.equal(rhino.show, true);
  assert.equal(allowance(rhino), 96 * MiB);
});

test('loaded active buildings receive more allowance as observed demand changes', () => {
  const { cache, advance } = setup();
  const models = [tile(), tile()];
  cache.select('rhino');
  cache.register('rhino', models);
  models[0].totalMemoryUsageInBytes = 20 * MiB;
  advance(2_000);
  assert.ok(allowance(models[0]) > allowance(models[1]));
  assert.ok(models.reduce((sum, model) => sum + allowance(model), 0) <= 96 * MiB);
});

test('disabled comparison mode switches visibility without modifying Cesium defaults', () => {
  const { cache, advance } = setup({ enabled: false });
  const osm = tile(20);
  cache.register('osm', [osm]);
  cache.select('osm');
  assert.equal(osm.show, true);
  cache.select('');
  advance(60_000);
  assert.equal(osm.show, false);
  assert.equal(allowance(osm), 1024 * MiB);
  assert.equal(osm.trims, 0);
});
