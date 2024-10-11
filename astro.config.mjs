// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://p4k0.dev',
    i18n: {
        defaultLocale: 'en',
        locales: ['es', 'en'],
        routing: {
            prefixDefaultLocale: false,
        }
    }
});
