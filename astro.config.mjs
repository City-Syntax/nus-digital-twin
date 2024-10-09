import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: 'https://www.nus-digital-twin.com',
  output: 'hybrid',
  adapter: vercel(),
});
