import type { MenuPages } from '../../types';

const LEFT_MENU_PAGES: MenuPages[] = [
  'osm',
  'about-nus-campus',
  'citations',
  'street-centerlines',
  'building-footprints',
  'green-spaces',
  'rhino-urban',
  'rhino-building',
  'ubem',
  'bim',
  'building-info',
  'points-of-interest',
  'point-info',
  'help',
  'settings',
];

const RIGHT_MENU_PAGES: MenuPages[] = ['buildings', 'energy', 'thermal-comfort', 'wind', 'solar', 'distance'];

const BOTTOM_MENU_PAGES: MenuPages[] = [
  'about-nus-campus',
  'citations',
  'building-info',
  'points-of-interest',
  'point-info',
  'street-centerlines',
  'building-footprints',
  'green-spaces',
  'osm',
  'rhino-urban',
  'rhino-building',
  'ubem',
  'bim',
  'buildings',
  'energy',
  'thermal-comfort',
  'wind',
  'solar',
  'distance',
  'help',
  'settings',
  'search',
  'controls',
  'layers',
  'menu',
];

export const MENU_PAGES: { LEFT: MenuPages[]; RIGHT: MenuPages[]; BOTTOM: MenuPages[] } = {
  LEFT: LEFT_MENU_PAGES,
  RIGHT: RIGHT_MENU_PAGES,
  BOTTOM: BOTTOM_MENU_PAGES,
};
