import type { BuildingPropertiesProps } from '../../../content/config';

export type Categories =
  | 'general'
  | 'partitions'
  | 'fenestration'
  | 'hvac'
  | 'density-and-power'
  | 'schedules'
  | 'others';

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
  thermostatSetPoint: 'Thermostate Set-point',
  coreOutsideAirFlowrate: 'Core Outside Air Flowrate',
  perimeterOutsideAirFlowrate: 'Perimeter Outsie Air Flowrate',
  coreOccupantDensity: 'Core Occupant Density',
  perimeterOccupantDensity: 'Perimeter Occupant Density',
  coreEquipmentPower: 'Core Equipment Power',
  perimeterEquipmentPower: 'Perimeter Equipment Power',
  coreLightingPower: 'Core Lighting Power',
  perimeterLightingPower: 'Perimeter Lighting Power',
  occupancySchedule: 'Occupancy Schedule',
  equipmentUsage: 'Equipment Usage',
  lightingUsage: 'Lighting Usage',
  coreOutsideAirSchedule: 'Core Outside Air Schedule',
  perimeterOutsideAirSchedule: 'Perimeter Outside Air Schedule',
  exhaustAirRecovery: 'Exhaust Air Recovery',
  economizerCycle: 'Economizer Cycle',
};

export const categoryMappings: { [key in Categories]: string } = {
  general: 'General',
  partitions: 'Structural, Enclosure and Internal Partitions',
  fenestration: 'Fenestration',
  hvac: 'Heating, Ventilation and Air-conditioning',
  'density-and-power': 'Density and Power',
  schedules: 'Schedules',
  others: 'Others',
};

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
  hvac: ['thermostatSetPoint', 'coreOutsideAirFlowrate', 'perimeterOutsideAirFlowrate'],
  'density-and-power': [
    'coreOccupantDensity',
    'perimeterOccupantDensity',
    'coreEquipmentPower',
    'perimeterEquipmentPower',
    'coreLightingPower',
    'perimeterLightingPower',
  ],
  schedules: [
    'occupancySchedule',
    'equipmentUsage',
    'lightingUsage',
    'coreOutsideAirSchedule',
    'perimeterOutsideAirSchedule',
  ],
  others: ['exhaustAirRecovery', 'economizerCycle'],
};