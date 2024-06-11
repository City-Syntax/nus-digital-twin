export type Models = 'bim' | 'osm';

export type GISLayers = 'building-footprints' | 'street-centerlines' | 'water-bodies';

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
  | 'rhino-building'
  | 'rhino-urban'
  | 'ubem'
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
  | 'menu';

export type BuildingInfoCategories =
  | 'general'
  | 'partitions'
  | 'fenestration'
  | 'hvac'
  | 'density-and-power'
  | 'schedules'
  | 'others';

export type MapLayers = 'satellite' | 'dark' | 'street';
