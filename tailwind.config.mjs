/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        mononoki: ['"Mononoki Nerd Font"', "monospace"],
      },
      keyframes: {
        "border-cycle": {
          "0%, 100%": { "border-color": "#86efac" },
          "50%": { "border-color": "#22d3ee" },
        },
      },
      animation: {
        "border-cycle": "border-cycle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
