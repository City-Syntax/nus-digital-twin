import { defineCollection, z } from 'astro:content';

const buildingSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  postal: z.string().optional(),
  floorToFloorHeight: z.string().optional(),
  perimeterZoneDepth: z.string().optional(),
  wallConstruction: z.string().optional(),
  roofConstruction: z.string().optional(),
  externalWallType: z.string().optional(),
  internalWalls: z.string().optional(),
  fenestrationType: z.string().optional(),
  fenestrationShading: z.string().optional(),
  northWindowToWallRatio: z.string().optional(),
  southWindowToWallRatio: z.string().optional(),
  eastWindowToWallRatio: z.string().optional(),
  westWindowToWallRatio: z.string().optional(),
  windowFrameConductance: z.string().optional(),
  glazingType: z.string().optional(),
  windowLeakage: z.string().optional(),
  naturalVentilation: z.string().optional(),
  daylightResponse: z.string().optional(),
  thermostatSetPoint: z.string().optional(),
  coreOutsideAirFlowrate: z.string().optional(),
  perimeterOutsideAirFlowrate: z.string().optional(),
  coreOccupantDensity: z.string().optional(),
  perimeterOccupantDensity: z.string().optional(),
  coreEquipmentPower: z.string().optional(),
  perimeterEquipmentPower: z.string().optional(),
  coreLightingPower: z.string().optional(),
  perimeterLightingPower: z.string().optional(),
  occupancySchedule: z.string().optional(),
  equipmentUsage: z.string().optional(),
  lightingUsage: z.string().optional(),
  coreOutsideAirSchedule: z.string().optional(),
  perimeterOutsideAirSchedule: z.string().optional(),
  exhaustAirRecovery: z.string().optional(),
  economizerCycle: z.string().optional(),
});

const buildingsCollection = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.array(
      z.union([
        buildingSchema,
        z.object({
          imageSrc: image(),
        }),
      ]),
    ),
});

export const collections = {
  buildings: buildingsCollection,
};

export type BuildingPropertiesProps = z.infer<typeof buildingSchema>;
