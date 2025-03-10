import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import vercel from '@astrojs/vercel';
import rehypeExternalLinks from 'rehype-external-links';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    starlight({
      title: 'NUS Digital Twin',
      routeMiddleware: './src/routeData.ts',
      lastUpdated: true,
      disable404Route: true,
      components: {
        SiteTitle: './src/components/docs/SiteTitle.astro',
        Head: './src/components/docs/Head.astro',
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
          label: 'Buildings',
          autogenerate: { directory: 'dev-guide/buildings' },
        },
        {
          label: 'Points of Interest',
          autogenerate: { directory: 'dev-guide/points-of-interest' },
        },
        {
          label: 'Controls',
          autogenerate: { directory: 'dev-guide/controls' },
        },
        {
          label: 'Environment Variables',
          autogenerate: { directory: 'dev-guide/environment-variables' },
        },
        {
          label: 'API',
          autogenerate: { directory: 'dev-guide/api' },
        },
        {
          label: 'Tutorials',
          autogenerate: { directory: 'dev-guide/tutorials' },
        },
        {
          label: 'Documentation',
          autogenerate: { directory: 'dev-guide/documentation' },
        },
        {
          label: 'Deployment',
          autogenerate: { directory: 'dev-guide/deployment' },
        },
      ],
    }),
    sitemap(),
  ],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          properties: {
            class: 'external',
          },
          target: '_blank',
        },
      ],
    ],
  },
  site: 'https://www.nus-digital-twin.com',
  output: 'static',
  adapter: vercel(),
});
