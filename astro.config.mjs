// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://lacortedilaura.it',
  trailingSlash: 'always',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
      persist: {
        path: '.wrangler/state/v3',
      },
    },
  }),

  vite: {
      plugins: [tailwindcss()],
	},
  build: {
    inlineStylesheets: 'always',
  },

  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'it',
        locales: {
          it: 'it-IT',
          en: 'en-US',
        },
      },
    }),
  ],

  i18n: {
    defaultLocale: "it",
    locales: ["it", "en"],
    routing: {
      prefixDefaultLocale: false
    }
  }
});