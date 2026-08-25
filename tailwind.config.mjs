/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        panel: "rgb(var(--color-panel) / <alpha-value>)",
        "panel-hover": "rgb(var(--color-panel-hover) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        strong: "rgb(var(--color-strong) / <alpha-value>)",
        faint: "rgb(var(--color-text-faint) / <alpha-value>)",
        quiet: "rgb(var(--color-text-quiet) / <alpha-value>)",
        muted: "rgb(var(--color-text-muted) / <alpha-value>)",
        secondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
        tag: "rgb(var(--color-text-tag) / <alpha-value>)",
        primary: "rgb(var(--color-text-primary) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-hover": "rgb(var(--color-accent-hover) / <alpha-value>)",
        link: "rgb(var(--color-link) / <alpha-value>)",
        "link-hover": "rgb(var(--color-link-hover) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        code: "rgb(var(--color-code) / <alpha-value>)",
      },
      fontFamily: {
        mononoki: ['"Mononoki Nerd Font"', "monospace"],
        mononokiBoldItalic: ['"Mononoki Nerd Font Bold Italic"', "monospace"],
      },
    },
  },
  plugins: [],
};
