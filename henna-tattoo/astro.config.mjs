import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://hennatattooalbania.com',
  compressHTML: true,
  build: {
    // Inline every stylesheet — eliminates the render-blocking <link rel="stylesheet">
    // that PageSpeed flagged (~510ms savings on mobile, ~680ms on desktop).
    // Total CSS payload is small (~25KB raw, ~7.6KB transferred); inlining is a net
    // win because it lets the browser paint as soon as the HTML arrives.
    inlineStylesheets: 'always',
    assets: '_astro',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: false,
    },
  },
});
