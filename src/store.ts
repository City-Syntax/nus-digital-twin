import { atom } from 'nanostores';
import type { GISLayers, MapLayers, MenuPages, Models } from './types';

export const activePage = atom<MenuPages | ''>('');
export const activeMapLayer = atom<MapLayers>('street');
export const activeGISLayer = atom<GISLayers | ''>('');

export const activeModel = atom<Models | ''>('osm');
export const buildingColorSetting = atom<'' | 'distance'>('');

export const buildingId = atom('');
export const isSelectColorByDistance = atom(false);
export const colorByDistancePosition = atom({
  latitude: 1.29563,
  longitude: 103.77515,
});
