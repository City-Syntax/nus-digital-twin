export type Models = 'bim' | 'osm' | 'rhino-urban';

export type GISLayers = 'building-footprints' | 'street-centerlines' | 'green-spaces';

export type Position = {
  latitude: number;
  longitude: number;
};

export type UserSettings = {
  moveCameraOnSearch: boolean;
  reducedMotion: boolean;
};

export type NavType = 'mouse' | 'touch';

export type MenuPages =
  | 'osm'
  | 'about'
  | 'help'
  | 'settings'
  | 'street-centerlines'
  | 'building-footprints'
  | 'green-spaces'
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

export type DownloadFileProps = {
  filetype: string;
  url: string;
};

export type DownloadProps = {
  type: string;
  credits?: string;
  files: DownloadFileProps[];
};

export type ImageProps = Array<{
  src: string;
  author?: string;
}>;
