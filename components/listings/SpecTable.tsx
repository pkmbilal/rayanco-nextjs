import { getDictionary } from "@/lib/i18n";
import { formatNumber, formatPrice } from "@/lib/listings/format";
import type { ListingDetail } from "@/lib/listings/queries";

/** Real HTML spec table (indexable). Empty rows are skipped. */
export function SpecTable({ listing }: { listing: ListingDetail }) {
  const t = getDictionary().listings;
  const s = t.spec;
  const rows: [string, string | null][] = [
    [s.ref, listing.ref_code],
    [s.make, listing.make],
    [s.model, listing.model],
    [s.year, listing.year ? String(listing.year) : null],
    [s.condition, listing.condition ? t.conditions[listing.condition] : null],
    [s.hoursOrKm, listing.hours_or_km != null ? formatNumber(listing.hours_or_km) : null],
    [s.capacity, listing.capacity],
    [s.quantity, listing.quantity > 1 ? String(listing.quantity) : null],
    [s.location, listing.location],
    [s.price, listing.status === "sold" ? null : formatPrice(listing)],
  ];

  return (
    <table className="w-full text-start text-sm">
      <caption className="sr-only">{t.specs}</caption>
      <tbody className="divide-y divide-steel-100">
        {rows
          .filter(([, v]) => v)
          .map(([k, v]) => (
            <tr key={k}>
              <th scope="row" className="w-2/5 py-2.5 pe-4 text-start font-medium text-steel-500">
                {k}
              </th>
              <td className="py-2.5 font-semibold text-steel-900">{v}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
