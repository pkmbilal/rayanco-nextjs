import type { MetadataRoute } from "next";
import { locales, localePath } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/jsonld";
import { categoryPath, listingPath } from "@/lib/listings/format";
import { getCategories, getPublicListingPaths } from "@/lib/listings/queries";
import { languageAlternates } from "@/lib/seo";

type Entry = MetadataRoute.Sitemap[number];

const staticRoutes: { path: string; priority: number; changeFrequency: Entry["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/products", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products/non-ferrous-metals", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products/metal-scrap-surplus", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/demolition", priority: 0.6, changeFrequency: "monthly" },
  { path: "/used-equipment", priority: 0.9, changeFrequency: "daily" },
  { path: "/sell-your-equipment", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
];

/** One entry per locale for a locale-free path, each listing the en / ar / x-default alternates. */
function localized(path: string, rest: Omit<Entry, "url" | "alternates">): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    Object.entries(languageAlternates(path)).map(([lang, p]) => [lang, absoluteUrl(p)]),
  );
  return locales.map((locale) => ({
    url: absoluteUrl(localePath(locale, path)),
    ...rest,
    alternates: { languages },
  }));
}

/** Category pages and every public listing (available, reserved and sold all stay live). */
async function dynamicEntries(): Promise<MetadataRoute.Sitemap> {
  const [categories, listings] = await Promise.all([getCategories(), getPublicListingPaths()]);

  // A category's lastModified is its newest listing change.
  const latestByCategory = new Map<string, string>();
  for (const l of listings) {
    const prev = latestByCategory.get(l.category);
    if (!prev || l.updated_at > prev) latestByCategory.set(l.category, l.updated_at);
  }

  const categoryEntries = categories.flatMap((c) => {
    const last = latestByCategory.get(c.slug);
    return localized(categoryPath(c.slug), {
      ...(last ? { lastModified: new Date(last) } : {}),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  });

  const listingEntries = listings.flatMap((l) =>
    localized(listingPath(l.category, l.slug), {
      lastModified: new Date(l.updated_at),
      changeFrequency: "weekly",
      priority: 0.6,
    }),
  );

  return [...categoryEntries, ...listingEntries];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const statics = staticRoutes.flatMap((r) =>
    localized(r.path, { changeFrequency: r.changeFrequency, priority: r.priority }),
  );
  return [...statics, ...(await dynamicEntries())];
}
