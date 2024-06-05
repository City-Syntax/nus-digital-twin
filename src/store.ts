import { atom } from 'nanostores';
import type { MenuPages } from './components/menu/menuTypes';

export const activePage = atom<MenuPages>('');

export const activeMapLayer = atom('');

export const activeModel = atom<'' | 'osm' | 'bim'>('osm');
export const buildingColorSetting = atom<'' | 'distance'>('');

export const buildingId = atom('');
export const isSelectColorByDistance = atom(false);
export const colorByDistancePosition = atom({
  latitude: 1.29563,
  longitude: 103.77515,
});
