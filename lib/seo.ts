import type { Metadata } from "next";
import { site } from "@/lib/site";

export const defaultOgImage = { url: "/assets/images/Hero_bg.webp", width: 2560, height: 1709, alt: "Rayanco scrap yard" };

type PageMetaInput = {
  /** Title without the "| Rayanco" suffix (the root layout template adds it). */
  title: string;
  description: string;
  /** Path of this page, e.g. "/about". Used for the canonical and og:url. */
  path: string;
  /** Use when the title must not get the template suffix (e.g. the homepage). */
  absoluteTitle?: boolean;
  image?: { url: string; width: number; height: number; alt?: string };
};

/** Per-page metadata: unique title + description, self-canonical, Open Graph. */
export function pageMetadata({ title, description, path, absoluteTitle, image }: PageMetaInput): Metadata {
  const ogTitle = absoluteTitle ? title : `${title} | Rayanco`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    // Next.js replaces (not merges) the parent openGraph object, so repeat the site-wide fields here.
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_SA",
      title: ogTitle,
      description,
      url: path,
      images: [image ?? defaultOgImage],
    },
  };
}
