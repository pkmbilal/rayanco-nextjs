import { getDictionary } from "@/lib/i18n";

export function listingPath(categorySlug: string, slug: string): string {
  return `/used-equipment/${categorySlug}/${slug}`;
}

export function categoryPath(categorySlug: string): string {
  return `/used-equipment/${categorySlug}`;
}

const sarFormat = new Intl.NumberFormat("en-SA", { maximumFractionDigits: 0 });

/** "SAR 125,000" or "Price on request". */
export function formatPrice(l: { price_sar: number | null; price_on_request: boolean }): string {
  const t = getDictionary().listings;
  if (l.price_on_request || l.price_sar == null) return t.priceOnRequest;
  return `${t.sar} ${sarFormat.format(l.price_sar)}`;
}

export function formatNumber(n: number): string {
  return sarFormat.format(n);
}

/** §9 title pattern, without the "| Rayanco" suffix (the layout template adds it). */
export function listingMetaTitle(l: { title_en: string; location: string | null; year: number | null }): string {
  const where = l.location ? ` in ${l.location}` : " in Saudi Arabia";
  return `Used ${l.title_en} for Sale${where}${l.year ? ` — ${l.year}` : ""}`;
}

/** Prefilled WhatsApp text from §7. */
export function listingWhatsappText(l: { title_en: string; ref_code: string }, url: string): string {
  return `Hi, I'm interested in ${l.title_en} (Ref ${l.ref_code}) ${url}`;
}
