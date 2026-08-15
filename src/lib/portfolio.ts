import rawContent from "../../content.json";
import type { CollectionEntry } from "astro:content";
import { features } from "./features";

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PortfolioSection {
  id: string;
  type: string;
  [field: string]: unknown;
}

export interface SectionRendererProps {
  section: PortfolioSection;
  socialItems?: SocialLink[];
  posts?: CollectionEntry<"blog">[];
}

interface PortfolioContent {
  title: string;
  name: string;
  githubProfile: string;
  socialLinks: SocialLink[];
  sections: PortfolioSection[];
}

export const portfolio: PortfolioContent = rawContent;
export const sections = portfolio.sections.filter(
  ({ type }) => type !== "blog" || features.blog,
);
export const sectionIds = sections.map(({ id }) => id);
