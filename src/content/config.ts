import { defineCollection, z } from 'astro:content';

const buildingSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
});

const buildingsCollection = defineCollection({
  type: 'data',
  schema: z.array(buildingSchema),
});

export const collections = {
  buildings: buildingsCollection,
};

export type BuildingPropertiesProps = z.infer<typeof buildingSchema>;
