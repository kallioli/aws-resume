// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Where the site is published.
 *
 * - GitHub Pages project site: SITE=https://<user>.github.io  BASE_PATH=/aws-resume
 * - Custom domain or user site:  SITE=https://cv.example.com   BASE_PATH=/  (or empty)
 *
 * The deploy workflow sets both automatically from `actions/configure-pages`,
 * so you only need to edit the defaults below for local builds or other hosts.
 */
const site = process.env.SITE || 'https://kallioli.github.io';
const base = process.env.BASE_PATH || '/aws-resume';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: {
    // Inline small stylesheets to avoid a render-blocking request.
    inlineStylesheets: 'auto',
  },
  devToolbar: { enabled: false },
});
