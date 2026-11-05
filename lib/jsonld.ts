import { site } from "@/lib/site";

export type JsonLdObject = Record<string, unknown>;

/** Absolute canonical (www) URL for a site path. */
export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

const orgId = absoluteUrl("/#organization");

/** Organization + LocalBusiness for the home page (NAP must match the footer). */
export function organizationJsonLd(): JsonLdObject {
  const address = {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postOfficeBoxNumber: site.address.poBox.replace(/^P\.O\. Box\s*/i, ""),
    addressLocality: site.address.city,
    postalCode: site.address.postalCode,
    addressCountry: site.address.countryCode,
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: site.name,
        url: absoluteUrl("/"),
        logo: absoluteUrl(site.logo.src),
        email: site.email,
        foundingDate: String(site.foundingYear),
        address,
        contactPoint: site.phones.map((p) => ({
          "@type": "ContactPoint",
          telephone: p.tel,
          contactType: "sales",
          areaServed: "SA",
          availableLanguage: ["en", "ar"],
        })),
      },
      {
        "@type": "LocalBusiness",
        "@id": absoluteUrl("/#localbusiness"),
        name: site.name,
        description: "Scrap buyer in Jubail, Saudi Arabia: buying and selling ferrous and non-ferrous scrap metal since 1995.",
        url: absoluteUrl("/"),
        image: absoluteUrl("/assets/images/Hero_bg.webp"),
        logo: absoluteUrl(site.logo.src),
        email: site.email,
        telephone: site.phones[0].tel,
        address,
        areaServed: { "@type": "Country", name: "Saudi Arabia" },
        parentOrganization: { "@id": orgId },
        // TODO(owner): opening hours and map coordinates.
      },
    ],
  };
}

/** BreadcrumbList from a trail that already includes Home. */
export function breadcrumbJsonLd(trail: { name: string; href: string }[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  };
}

export type ProductJsonLdInput = {
  title: string;
  path: string;
  refCode: string;
  description?: string | null;
  images: string[];
  make?: string | null;
  model?: string | null;
  year?: number | null;
  condition?: "working" | "needs_repair" | "for_scrap" | null;
  priceSar?: number | null;
  status: "available" | "reserved" | "sold";
};

/** Product + Offer for a listing page (used from step 5). */
export function productJsonLd(p: ProductJsonLdInput): JsonLdObject {
  const url = absoluteUrl(p.path);
  const availability =
    p.status === "sold" ? "https://schema.org/SoldOut" : "https://schema.org/InStock";
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.title,
    sku: p.refCode,
    url,
    image: p.images,
    ...(p.description ? { description: p.description } : {}),
    ...(p.make ? { brand: { "@type": "Brand", name: p.make } } : {}),
    ...(p.model ? { model: p.model } : {}),
    ...(p.year ? { productionDate: String(p.year) } : {}),
    itemCondition:
      p.condition === "for_scrap" || p.condition === "needs_repair"
        ? "https://schema.org/DamagedCondition"
        : "https://schema.org/UsedCondition",
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "SAR",
      ...(p.priceSar != null ? { price: p.priceSar } : {}),
      availability,
      seller: { "@id": orgId },
    },
  };
}
