import { atom } from 'nanostores';
import type { MenuPages } from './components/menu/menuUtils';

export const activeMenu = atom<MenuPages>('');
export const searchQuery = atom('');

export const activeMapLayer = atom('');

export const buildingDataLayer = atom('osm');
export const buildingColorSetting = atom('');

export const buildingId = atom('');
export const isSelectColorByDistance = atom(false);
export const colorByDistancePosition = atom({
  latitude: 1.29563,
  longitude: 103.77515,
});
