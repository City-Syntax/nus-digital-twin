import type { BuildingPropertiesProps } from '../../../content/config';

export type Categories = 'general' | 'partitions' | 'fenestration' | 'hvac' | 'density-and-power';

export const titleMappings: BuildingPropertiesProps = {
  address: 'Address',
  postal: 'Postal Code',
  floorToFloorHeight: 'Floor to Floor Height',
  perimeterZoneDepth: 'Perimeter Zone Depth',
  wallConstruction: 'Wall Construction',
  roofConstruction: 'Roof Construction',
  externalWallType: 'External Wall Type',
  internalWalls: 'Internal Walls / Partitions',
  fenestrationType: 'Fenestration Type',
  fenestrationShading: 'Fenestration Shading',
  northWindowToWallRatio: 'North Window to Wall Ratio',
  southWindowToWallRatio: 'South Window to Wall Ratio',
  eastWindowToWallRatio: 'East Window to Wall Ratio',
  westWindowToWallRatio: 'West Window to Wall Ratio',
  windowFrameConductance: 'Window Frame Conductance',
  glazingType: 'Glazing Type',
  windowLeakage: 'Window Leakage',
  naturalVentilation: 'Natural Ventilation',
  daylightResponse: 'Daylight Response',
};

export const infoCategories: { id: Categories; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'partitions', label: 'Structural, Enclosure and Internal Partitions' },
  { id: 'fenestration', label: 'Fenestration' },
  { id: 'hvac', label: 'Heating, Ventilation and Air-conditioning' },
  { id: 'density-and-power', label: 'Density and Power' },
];

export const sectionsToDisplay: { [key in Categories]: Array<keyof BuildingPropertiesProps> } = {
  general: ['address', 'postal'],
  partitions: [
    'floorToFloorHeight',
    'perimeterZoneDepth',
    'wallConstruction',
    'roofConstruction',
    'externalWallType',
    'internalWalls',
  ],
  fenestration: [
    'fenestrationType',
    'fenestrationShading',
    'northWindowToWallRatio',
    'southWindowToWallRatio',
    'eastWindowToWallRatio',
    'westWindowToWallRatio',
    'windowFrameConductance',
    'glazingType',
    'windowLeakage',
    'naturalVentilation',
    'daylightResponse',
  ],
  hvac: [],
  'density-and-power': [],
};
