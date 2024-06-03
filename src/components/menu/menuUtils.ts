export type MenuPages =
  | 'osm'
  | 'about'
  | 'help'
  | 'settings'
  | 'street-centerlines'
  | 'building-footprints'
  | 'green-spaces'
  | 'water-bodies'
  | 'osm'
  | 'rhino'
  | 'bim'
  | 'buildings'
  | 'energy'
  | 'thermal-comfort'
  | 'wind'
  | 'solar'
  | 'distance'
  | 'building-info'
  | 'search'
  | 'controls'
  | 'layers'
  | 'menu'
  | '';

const LEFT_MENU_PAGES: MenuPages[] = [
  'osm',
  'about',
  'street-centerlines',
  'building-footprints',
  'green-spaces',
  'water-bodies',
  'rhino',
  'bim',
  'building-info',
  'help',
  'settings',
];

const RIGHT_MENU_PAGES: MenuPages[] = ['buildings', 'energy', 'thermal-comfort', 'wind', 'solar', 'distance'];

const BOTTOM_MENU_PAGES: MenuPages[] = [
  'about',
  'building-info',
  'street-centerlines',
  'building-footprints',
  'green-spaces',
  'water-bodies',
  'osm',
  'rhino',
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
