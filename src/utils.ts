import type { MapLayers } from './types';

const ALL_MAP_LAYERS: MapLayers[] = ['satellite', 'dark', 'street'];

export function isMapLayer(value: string): value is MapLayers {
  return ALL_MAP_LAYERS.includes(value as MapLayers);
}
