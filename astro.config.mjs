import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    starlight({
      title: 'NUS Digital Twin',
      lastUpdated: true,
      components: {
        SiteTitle: './src/components/docs/SiteTitle.astro',
      },
      sidebar: [
        {
          slug: 'user-guide',
        },
        {
          slug: 'user-guide/getting-started',
        },
        {
          label: 'Basic Controls',
          autogenerate: { directory: 'user-guide/basic-controls' },
        },
      ],
    }),
  ],
  site: 'https://www.nus-digital-twin.com',
  output: 'static',
  adapter: vercel(),
});
