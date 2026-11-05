import type { MetadataRoute } from "next";
import { isIndexable } from "@/lib/env";
import { absoluteUrl } from "@/lib/jsonld";

/** Staging (NEXT_PUBLIC_INDEXABLE !== "true") blocks everything; production blocks /admin and /api. */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
