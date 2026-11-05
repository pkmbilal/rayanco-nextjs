import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import { toQueryString, type ListingFilters } from "@/lib/listings/filters";

type Props = { basePath: string; filters: ListingFilters; page: number; pageCount: number };

export function Pagination({ basePath, filters, page, pageCount }: Props) {
  if (pageCount <= 1) return null;
  const t = getDictionary().listings;
  const href = (p: number) => `${basePath}${toQueryString({ ...filters, page: p > 1 ? p : undefined })}`;
  const linkClass = "rounded-md border border-steel-200 px-4 py-2 font-semibold hover:border-accent-500 hover:text-accent-600";

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-between gap-4">
      {page > 1 ? (
        <Link href={href(page - 1)} rel="prev" className={linkClass}>
          ← {t.previous}
        </Link>
      ) : (
        <span />
      )}
      <span className="text-sm text-steel-500">{t.page(page, pageCount)}</span>
      {page < pageCount ? (
        <Link href={href(page + 1)} rel="next" className={linkClass}>
          {t.next} →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
