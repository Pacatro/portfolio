// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL,
  output: "server",
  integrations: [tailwind()],
  adapter: vercel(),
  env: {
    schema: {
      GITHUB_TOKEN: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      FEATURE_BLOG: envField.boolean({
        context: "server",
        access: "public",
        default: false,
      }),
    },
  },
});
