import path from 'node:path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://github.com/shoelace-style/shoelace/discussions/1412#discussioncomment-6422672
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      htmlAttrs: {
        class: 'sl-theme-dark',
      },
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.startsWith('sl-'),
    },
  },

  vite: {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: path.resolve(__dirname, 'node_modules/@shoelace-style/shoelace/dist/assets'),
            dest: path.resolve(__dirname, 'public/shoelace'),
          },
        ],
      }),
    ],
  },

  css: [
    '@shoelace-style/shoelace/dist/themes/light.css',
    '@shoelace-style/shoelace/dist/themes/dark.css',
    '~/assets/styles/main.scss',
  ],
});
