import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    starlight({
      title: 'NUS Digital Twin',
      lastUpdated: true,
      disable404Route: true,
      pagefind: false,
      components: {
        SiteTitle: './src/components/docs/SiteTitle.astro',
        Head: './src/components/docs/Head.astro',
        Sidebar: './src/components/docs/Sidebar.astro',
        Pagination: './src/components/docs/Pagination.astro',
      },
      customCss: ['@fontsource-variable/inter', '@fontsource-variable/figtree', './src/styles/docs.css'],
      sidebar: [
        {
          slug: 'user-guide',
        },
        {
          slug: 'user-guide/getting-started',
        },
        {
          label: 'Basic Features',
          autogenerate: { directory: 'user-guide/basic-features' },
        },
        {
          label: 'Building Data',
          autogenerate: { directory: 'user-guide/building-data' },
        },
        {
          label: 'Building Models',
          autogenerate: { directory: 'user-guide/building-models' },
        },
        {
          label: 'Points Of Interest',
          autogenerate: { directory: 'user-guide/points-of-interest' },
        },
        {
          label: 'Controls',
          autogenerate: { directory: 'user-guide/controls' },
        },
        {
          slug: 'tutorials',
        },
        {
          label: 'Videos',
          autogenerate: { directory: 'tutorials/videos' },
        },
        {
          slug: 'api-reference',
        },
        {
          label: 'Endpoints',
          autogenerate: { directory: 'api-reference/endpoints' },
        },
        {
          slug: 'dev-guide',
        },
        {
          slug: 'dev-guide/getting-started',
        },
        {
          label: 'Design',
          autogenerate: { directory: 'dev-guide/design' },
        },
        {
          label: 'Deployment',
          autogenerate: { directory: 'dev-guide/deployment' },
        },
      ],
    }),
  ],
  site: 'https://www.nus-digital-twin.com',
  output: 'static',
  adapter: vercel(),
});
