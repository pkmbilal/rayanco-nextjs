import { getDictionary, type Locale } from "@/lib/i18n";
import { categoryName, formatNumber, listingLocation } from "@/lib/listings/format";
import type { ListingDetail } from "@/lib/listings/queries";

/**
 * Specs as real HTML (indexable): a description list laid out as key/value tiles.
 * Empty rows are skipped. Price is shown in its own panel above.
 */
export function SpecTable({ locale, listing }: { locale: Locale; listing: ListingDetail }) {
  const t = getDictionary(locale).listings;
  const s = t.spec;
  const rows: [string, string | null][] = [
    [s.make, listing.make],
    [s.model, listing.model],
    [s.year, listing.year ? String(listing.year) : null],
    [s.condition, listing.condition ? t.conditions[listing.condition] : null],
    [s.hoursOrKm, listing.hours_or_km != null ? formatNumber(locale, listing.hours_or_km) : null],
    [s.capacity, listing.capacity],
    [s.quantity, String(listing.quantity)],
    [s.location, listing.location ? `${listingLocation(locale, listing.location)}, ${t.country}` : null],
    [s.category, categoryName(locale, listing.category)],
    [s.ref, listing.ref_code],
  ];

  return (
    <dl aria-label={t.specs} className="grid grid-cols-2 gap-2">
      {rows
        .filter(([, v]) => v)
        .map(([k, v]) => (
          <div key={k} className="rounded-[10px] border border-steel-100 bg-white px-3.5 py-2.5">
            <dt className="text-[0.68rem] font-semibold text-steel-500">{k}</dt>
            <dd className="mt-0.5 text-[0.85rem] font-bold text-steel-900">{v}</dd>
          </div>
        ))}
    </dl>
  );
}
