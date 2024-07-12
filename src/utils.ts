import type { MapLayers, NavType } from './types';

const ALL_MAP_LAYERS: MapLayers[] = ['satellite', 'dark', 'street'];

export function isMapLayer(value: string): value is MapLayers {
  return ALL_MAP_LAYERS.includes(value as MapLayers);
}

const ALL_NAV_TYPE: NavType[] = ['mouse', 'touch'];
export function isNavType(value: string): value is NavType {
  return ALL_NAV_TYPE.includes(value as NavType);
}
