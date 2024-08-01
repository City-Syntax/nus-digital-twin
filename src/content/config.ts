import { defineCollection, z } from 'astro:content';
import type { ImageProps } from '../types';

const buildingMetadataSchema = z.object({
  elementId: z.string(),
  latitude: z.number(),
  longitude: z.number(),
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
      buildingSchema.merge(buildingMetadataSchema).merge(
        z.object({
          images: z.array(z.object({ src: image(), author: z.string().optional() })).optional(),
        }),
      ),
    ),
});

export const collections = {
  buildings: buildingsCollection,
};

export type BuildingPropertiesProps = z.infer<typeof buildingSchema> & {
  images: ImageProps[];
};
