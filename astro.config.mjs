// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.com',
  trailingSlash: 'ignore',
  compressHTML: true,
  build: {
    // how-it-works.html rather than how-it-works/index.html, so Cloudflare serves
    // section addresses without a trailing-slash redirect.
    format: 'file',
    inlineStylesheets: 'auto',
    assets: '_assets',
  },
  devToolbar: { enabled: false },
});
