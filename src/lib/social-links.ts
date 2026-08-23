import type { SocialLink } from "./portfolio";

export function isEmailLink({ url }: SocialLink): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(url);
}

export function getSocialHref(link: SocialLink): string {
  return isEmailLink(link) ? `mailto:${link.url}` : `https://${link.url}`;
}
