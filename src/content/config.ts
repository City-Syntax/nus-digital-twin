import { defineCollection, reference, z } from 'astro:content';
import type { ImageProps } from '../types';

const buildingMetadataSchema = z.object({
  elementId: z.string(),
  buildingDataCredits: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
});

const buildingEnergySchema = z.object({
  energyUse: reference('energy').optional(),
  energyUseIntensity: reference('energy').optional(),
});

const buildingSchema = z.object({
  name: z.string(),
  downloads: z
    .array(
      z.object({
        type: z.string(),
        credits: z.string().optional(),
        files: z.array(
          z.object({
            filetype: z.string(),
            url: z.string(),
          }),
        ),
      }),
    )
    .optional(),
  address: z.string(),
  postal: z.string(),
  floorToFloorHeight: z.number().optional(),
  perimeterZoneDepth: z.number().optional(),
  wallConstruction: z.number().optional(),
  roofConstruction: z.number().optional(),
  externalWallType: z.string().optional(),
  internalWalls: z.string().optional(),
  fenestrationType: z.string().optional(),
  fenestrationShading: z.string().optional(),
  northWindowToWallRatio: z.number().optional(),
  southWindowToWallRatio: z.number().optional(),
  eastWindowToWallRatio: z.number().optional(),
  westWindowToWallRatio: z.number().optional(),
  windowFrameConductance: z.number().optional(),
  glazingType: z.string().optional(),
  windowLeakage: z.number().optional(),
  naturalVentilation: z.string().optional(),
  daylightResponse: z.string().optional(),
  thermostatSetPoint: z.number().optional(),
  coreOutsideAirFlowrate: z.number().optional(),
  perimeterOutsideAirFlowrate: z.number().optional(),
  coreOccupantDensity: z.number().optional(),
  perimeterOccupantDensity: z.number().optional(),
  coreEquipmentPower: z.number().optional(),
  perimeterEquipmentPower: z.number().optional(),
  coreLightingPower: z.number().optional(),
  perimeterLightingPower: z.number().optional(),
  occupancySchedule: z.number().optional(),
  equipmentUsage: z.number().optional(),
  lightingUsage: z.number().optional(),
  coreOutsideAirSchedule: z.string().optional(),
  perimeterOutsideAirSchedule: z.string().optional(),
  exhaustAirRecovery: z.string().optional(),
  economizerCycle: z.string().optional(),
});

const buildingsCollection = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.array(
      buildingSchema
        .merge(buildingMetadataSchema)
        .merge(buildingEnergySchema)
        .merge(
          z.object({
            images: z.array(z.object({ src: image(), author: z.string().optional() })).optional(),
          }),
        ),
    ),
});

const energyUseSchema = z.object({
  month: z.string(),
  equipment: z.number().optional(),
  fans: z.number().optional(),
  pumps: z.number().optional(),
  humid: z.number().optional(),
  heatReject: z.number().optional(),
  lighting: z.number().optional(),
  hotWater: z.number().optional(),
  heating: z.number().optional(),
  cooling: z.number().optional(),
});

const energyCollection = defineCollection({
  type: 'data',
  schema: () => z.array(energyUseSchema),
});

export const collections = {
  buildings: buildingsCollection,
  energy: energyCollection,
};

export type BuildingPropertiesProps = z.infer<typeof buildingSchema> & {
  images: ImageProps[];
};
