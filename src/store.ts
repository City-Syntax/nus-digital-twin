import { atom, map } from 'nanostores';
import type { BuildingPropertiesProps } from './content/config';

export const activeMenu = atom('');
export const searchQuery = atom('');

export const buildingProperties = map<BuildingPropertiesProps>({ name: '' });

export const buildingDataLayer = atom('osm');
