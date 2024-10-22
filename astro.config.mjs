// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel/serverless';

import auth from 'auth-astro';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), auth(), 
    react(
      {
        include: ['**/react/**/*'],
      }
    )],
  output: 'server',
  adapter: vercel()
});