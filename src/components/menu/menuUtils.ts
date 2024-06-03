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

export const LEFT_MENU: MenuPages[] = [
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

export const RIGHT_MENU: MenuPages[] = ['buildings', 'energy', 'thermal-comfort', 'wind', 'solar', 'distance'];

export const BOTTOM_MENU: MenuPages[] = [
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
