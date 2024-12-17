import { defineCollection, reference, z, type ImageFunction } from 'astro:content';
import type { ImageProps } from './types';
import { glob } from 'astro/loaders';

const buildingMetadataSchema = z.object({
  elementId: z.string(),
  buildingDataCredits: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
});

const buildingEnergySchema = z.object({
  energyUse: reference('energy').optional(),
  energyUseIntensity: reference('energy').optional(),
  idfDownload: z.string().optional(),
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
  floorToFloorHeight: z
    .array(
      z.object({
        label: z.string(),
        value: z.number(),
      }),
    )
    .or(z.number())
    .optional(),
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
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/buildings' }),
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
  equipment: z.number(),
  fans: z.number().optional(),
  pumps: z.number().optional(),
  humid: z.number().optional(),
  heatReject: z.number().optional(),
  lighting: z.number(),
  hotWater: z.number().optional(),
  heating: z.number(),
  cooling: z.number(),
});

const energyCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/energy' }),
  schema: () => z.array(energyUseSchema),
});

const pointsSchema = (image: ImageFunction) =>
  z.object({
    id: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    img: z.object({ src: image(), author: z.string().optional() }).optional(),
    thermalImg: z.object({ src: image(), author: z.string().optional() }).optional(),
    redHSV: z.number().optional(),
    yellowHSV: z.number().optional(),
    greenHSV: z.number().optional(),
    cyanHSV: z.number().optional(),
    blueHSV: z.number().optional(),
    magentaHSV: z.number().optional(),
    redMean: z.number().optional(),
    greenMean: z.number().optional(),
    blueMean: z.number().optional(),
    redStdDev: z.number().optional(),
    greenStdDev: z.number().optional(),
    blueStdDev: z.number().optional(),
    skySegmentationPercent: z.number().optional(),
    pavementSegmentationPercent: z.number().optional(),
    waterSegmentationPercent: z.number().optional(),
    vegetationSegmentationPercent: z.number().optional(),
    buildingSegmentationPercent: z.number().optional(),
    otherSegmentationPercent: z.number().optional(),
    concreteSurface: z.boolean().optional(),
    grassSurface: z.boolean().optional(),
    asphaltSurface: z.boolean().optional(),
    woodSurface: z.boolean().optional(),
    brickSurface: z.boolean().optional(),
    gravelSurface: z.boolean().optional(),
    tilesSurface: z.boolean().optional(),
    rubber: z.boolean().optional(),
    buildingShade: z.boolean().optional(),
    treeShade: z.boolean().optional(),
    shadeProvision: z.boolean().optional(),
    restSpotOutdoorFurniture: z.boolean().optional(),
    waterFeature: z.boolean().optional(),
    thermalRatio: z.number().optional(),
  });

const pointsOfInterestCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/points-of-interest' }),
  schema: ({ image }) => z.array(pointsSchema(image)),
});

export const collections = {
  buildings: buildingsCollection,
  energy: energyCollection,
  'points-of-interest': pointsOfInterestCollection,
};

export type PointsOfInterestProps = z.infer<ReturnType<typeof pointsSchema>>;

export type BuildingPropertiesProps = z.infer<typeof buildingSchema> & {
  images: ImageProps[];
};

export type EnergyProperties = z.infer<typeof energyUseSchema>;
