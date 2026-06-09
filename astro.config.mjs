import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import vercel from '@astrojs/vercel';
import rehypeExternalLinks from 'rehype-external-links';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';

import tailwindcss from '@tailwindcss/vite';

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
          items: [{ autogenerate: { directory: 'user-guide/basic-features' } }],
        },
        {
          label: 'Building Data',
          items: [{ autogenerate: { directory: 'user-guide/building-data' } }],
        },
        {
          label: 'Building Models',
          items: [{ autogenerate: { directory: 'user-guide/building-models' } }],
        },
        {
          label: 'Points Of Interest',
          items: [{ autogenerate: { directory: 'user-guide/points-of-interest' } }],
        },
        {
          label: 'Controls',
          items: [{ autogenerate: { directory: 'user-guide/controls' } }],
        },
        {
          slug: 'tutorials',
        },
        {
          label: 'Videos',
          items: [{ autogenerate: { directory: 'tutorials/videos' } }],
        },
        {
          slug: 'api-reference',
        },
        {
          label: 'Endpoints',
          items: [{ autogenerate: { directory: 'api-reference/endpoints' } }],
        },
        {
          slug: 'dev-guide',
        },
        {
          slug: 'dev-guide/getting-started',
        },
        {
          label: 'Design',
          items: [{ autogenerate: { directory: 'dev-guide/design' } }],
        },
        {
          label: 'Buildings',
          items: [{ autogenerate: { directory: 'dev-guide/buildings' } }],
        },
        {
          label: 'Points of Interest',
          items: [{ autogenerate: { directory: 'dev-guide/points-of-interest' } }],
        },
        {
          label: 'Controls',
          items: [{ autogenerate: { directory: 'dev-guide/controls' } }],
        },
        {
          label: 'Environment Variables',
          items: [{ autogenerate: { directory: 'dev-guide/environment-variables' } }],
        },
        {
          label: 'API',
          items: [{ autogenerate: { directory: 'dev-guide/api' } }],
        },
        {
          label: 'Tutorials',
          items: [{ autogenerate: { directory: 'dev-guide/tutorials' } }],
        },
        {
          label: 'Documentation',
          items: [{ autogenerate: { directory: 'dev-guide/documentation' } }],
        },
        {
          label: 'Analytics',
          items: [{ autogenerate: { directory: 'dev-guide/analytics' } }],
        },
        {
          label: 'Deployment',
          items: [{ autogenerate: { directory: 'dev-guide/deployment' } }],
        },
      ],
    }),
    sitemap(),
  ],

  markdown: {
    processor: unified({
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
    }),
  },

  site: 'https://www.nus-digital-twin.com',
  output: 'static',
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()],
  },
});
