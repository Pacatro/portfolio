import { FEATURE_BLOG } from "astro:env/server";

export const features = {
  blog: FEATURE_BLOG,
} as const;
