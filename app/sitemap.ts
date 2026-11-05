import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/jsonld";

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

/**
 * Category and listing URLs. Filled in step 5 together with those pages, so the sitemap
 * never lists a URL that 404s. Use createPublicClient() + "use cache" + cacheTag("sitemap").
 */
async function dynamicEntries(): Promise<MetadataRoute.Sitemap> {
  return [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const statics: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: absoluteUrl(r.path),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
  return [...statics, ...(await dynamicEntries())];
}
