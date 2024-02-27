import { atom, map } from 'nanostores';
import type { BuildingPropertiesProps } from './content/config';

export const activeMenu = atom('');
export const searchQuery = atom('');

export const buildingProperties = map<BuildingPropertiesProps>({});

export const buildingDataLayer = atom('osm');
export const mapLayer = atom('');
export const buildingColorSetting = atom('');
