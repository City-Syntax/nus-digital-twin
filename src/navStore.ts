import { atom, map } from 'nanostores';

export const activePage = atom('');
export const isLeftPanel = atom(false);

interface BuildingPropertiesProps {
  name: string;
}

export const buildingProperties = map<BuildingPropertiesProps>({ name: '' });
