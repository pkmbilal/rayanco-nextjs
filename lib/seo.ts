import type { Metadata } from "next";
import { isIndexable, publicEnv } from "@/lib/env";
import { localePath, ogLocale, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export const defaultOgImage = { url: "/assets/images/Hero_bg.webp", width: 2560, height: 1709, alt: "Rayanco scrap yard" };

type PageMetaInput = {
  locale: Locale;
  /** Title without the "| Rayanco" suffix (the root layout template adds it). */
  title: string;
  description: string;
  /** Locale-free path of this page, e.g. "/about". The Arabic URL is derived from it. */
  path: string;
  /** Use when the title must not get the template suffix (e.g. the homepage). */
  absoluteTitle?: boolean;
  image?: { url: string; width: number; height: number; alt?: string };
};

/** hreflang alternates for a locale-free path: en, ar and x-default (English). */
export function languageAlternates(path: string): Record<string, string> {
  return { en: path, ar: localePath("ar", path), "x-default": path };
}

/** Per-page metadata: unique title + description, self-canonical, hreflang, Open Graph. */
export function pageMetadata({ locale, title, description, path, absoluteTitle, image }: PageMetaInput): Metadata {
  const ogTitle = absoluteTitle ? title : `${title} | Rayanco`;
  const url = localePath(locale, path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    // Next.js replaces (not merges) the parent openGraph object, so repeat the site-wide fields here.
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocale(locale),
      alternateLocale: ogLocale(locale === "ar" ? "en" : "ar"),
      title: ogTitle,
      description,
      url,
      images: [image ?? defaultOgImage],
    },
  };
}

/** Site-wide metadata for a locale's root layout. */
export function rootMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(publicEnv.NEXT_PUBLIC_SITE_URL),
    title: {
      template: "%s | Rayanco",
      default:
        locale === "ar"
          ? "مشتري الخردة في الجبيل، المملكة العربية السعودية | Rayanco"
          : "Scrap Buyer in Jubail, Saudi Arabia | Rayanco",
    },
    applicationName: site.name,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocale(locale),
      images: [{ url: "/assets/images/Hero_bg.webp", width: 2560, height: 1709 }],
    },
    robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  };
}
