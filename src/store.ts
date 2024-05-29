import { atom } from 'nanostores';

export const activeMenu = atom('');
export const searchQuery = atom('');

export const mapLayer = atom('');

export const buildingDataLayer = atom('osm');
export const buildingColorSetting = atom('');

export const buildingId = atom('');
export const isSelectColorByDistance = atom(false);
export const colorByDistancePosition = atom({
  latitude: 1.29563,
  longitude: 103.77515,
});
