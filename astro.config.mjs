import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import vercel from '@astrojs/vercel/serverless';
import figtreeWoff2 from '@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2?url';
import interWoff2 from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    starlight({
      title: 'NUS Digital Twin',
      lastUpdated: true,
      disable404Route: true,
      components: {
        SiteTitle: './src/components/docs/SiteTitle.astro',
      },
      customCss: ['@fontsource-variable/inter', '@fontsource-variable/figtree', './src/styles/docs.css'],
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'preload',
            as: 'font',
            type: 'font/woff2',
            href: figtreeWoff2,
            crossOrigin: 'anonymous',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'preload',
            as: 'font',
            type: 'font/woff2',
            href: interWoff2,
            crossOrigin: 'anonymous',
          },
        },
      ],
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
      ],
    }),
  ],
  site: 'https://www.nus-digital-twin.com',
  output: 'static',
  adapter: vercel(),
});
