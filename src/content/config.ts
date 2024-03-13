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
});

const buildingsCollection = defineCollection({
  type: 'data',
  schema: z.array(buildingSchema),
});

export const collections = {
  buildings: buildingsCollection,
};

export type BuildingPropertiesProps = z.infer<typeof buildingSchema>;
