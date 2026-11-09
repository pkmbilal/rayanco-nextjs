import { categoryNameAr } from "@/content/catalog.ar";
import { cityName, getDictionary, numberFormat, pick, type Locale } from "@/lib/i18n";

/** Locale-free listing path; wrap with `localePath()` for links. */
export function listingPath(categorySlug: string, slug: string): string {
  return `/used-equipment/${categorySlug}/${slug}`;
}

/** Locale-free category path; wrap with `localePath()` for links. */
export function categoryPath(categorySlug: string): string {
  return `/used-equipment/${categorySlug}`;
}

/** "SAR 125,000" / "125,000 ر.س" or "Price on request". */
export function formatPrice(locale: Locale, l: { price_sar: number | null; price_on_request: boolean }): string {
  const t = getDictionary(locale).listings;
  if (l.price_on_request || l.price_sar == null) return t.priceOnRequest;
  const n = numberFormat(locale).format(l.price_sar);
  return locale === "ar" ? `${n} ${t.sar}` : `${t.sar} ${n}`;
}

export function formatNumber(locale: Locale, n: number): string {
  return numberFormat(locale).format(n);
}

/** Listing title in a locale (Arabic falls back to English). */
export function listingTitle(locale: Locale, l: { title_en: string; title_ar?: string | null }): string {
  return pick(locale, l.title_en, l.title_ar);
}

/** Category name in a locale: DB `name_ar`, then the catalogue translation, then English. */
export function categoryName(locale: Locale, c: { slug: string; name_en: string; name_ar?: string | null }): string {
  if (locale !== "ar") return c.name_en;
  return c.name_ar || categoryNameAr(c.slug) || c.name_en;
}

/** Listing location for display ("Jubail" → "الجبيل" in Arabic). */
export function listingLocation(locale: Locale, location: string): string {
  return cityName(locale, location);
}

/** §9 title pattern, without the "| Rayanco" suffix (the layout template adds it). */
export function listingMetaTitle(
  locale: Locale,
  l: { title_en: string; title_ar?: string | null; location: string | null; year: number | null },
): string {
  const title = listingTitle(locale, l);
  if (locale === "ar") {
    // TODO(owner): native review of the Arabic listing title pattern.
    const where = l.location ? ` في ${cityName(locale, l.location)}` : " في المملكة العربية السعودية";
    return `${title} مستعمل للبيع${where}${l.year ? ` — ${l.year}` : ""}`;
  }
  const where = l.location ? ` in ${l.location}` : " in Saudi Arabia";
  return `Used ${title} for Sale${where}${l.year ? ` — ${l.year}` : ""}`;
}

/** Prefilled WhatsApp text from §7. */
export function listingWhatsappText(
  locale: Locale,
  l: { title_en: string; title_ar?: string | null; ref_code: string },
  url: string,
): string {
  return getDictionary(locale).listings.whatsappInterest(listingTitle(locale, l), l.ref_code, url);
}
