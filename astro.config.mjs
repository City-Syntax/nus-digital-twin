import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    starlight({
      title: 'NUS Digital Twin Docs',
    }),
  ],
  site: 'https://www.nus-digital-twin.com',
  output: 'static',
  adapter: vercel(),
});
