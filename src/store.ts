import { atom, map } from 'nanostores';

export const activeMenu = atom('');
export const searchQuery = atom('');

interface BuildingPropertiesProps {
  name: string;
}

export const buildingProperties = map<BuildingPropertiesProps>({ name: '' });

export const buildingDataLayer = atom('osm');
