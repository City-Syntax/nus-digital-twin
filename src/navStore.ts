import { atom, map } from 'nanostores';

export const activePage = atom('');
export const isLeftPanel = atom(false);
export const searchQuery = atom('');

interface BuildingPropertiesProps {
  name: string;
}

export const buildingProperties = map<BuildingPropertiesProps>({ name: '' });

export const buildingDataLayer = atom('osm');