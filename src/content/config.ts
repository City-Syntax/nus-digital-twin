import { defineCollection, z } from 'astro:content';

const buildingSchema = z.object({
  name: z.string(),
});

const buildingsCollection = defineCollection({
  type: 'data',
  schema: z.array(buildingSchema),
});

export const collections = {
  buildings: buildingsCollection,
};

export type BuildingPropertiesProps = z.infer<typeof buildingSchema>;
