import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/i18n";
import { toQueryString, type ListingFilters } from "@/lib/listings/filters";

type Props = {
  locale: Locale;
  /** Locale-prefixed. */
  basePath: string; filters: ListingFilters; page: number; pageCount: number };

/** Page numbers to show: first, last, and a window around the current page. */
function pageList(page: number, pageCount: number): (number | "gap")[] {
  const pages = new Set([1, pageCount, page - 1, page, page + 1].filter((p) => p >= 1 && p <= pageCount));
  const sorted = [...pages].sort((a, b) => a - b);
  const out: (number | "gap")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("gap");
    out.push(p);
  });
  return out;
}

const circle = "inline-flex size-8 items-center justify-center rounded-full text-xs font-semibold";

export function Pagination({ locale, basePath, filters, page, pageCount }: Props) {
  if (pageCount <= 1) return null;
  const t = getDictionary(locale).listings;
  const href = (p: number) => `${basePath}${toQueryString({ ...filters, page: p > 1 ? p : undefined })}`;

  return (
    <nav aria-label={t.pagination} className="mt-8 flex items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={href(page - 1)} rel="prev" aria-label={t.previous} className={`${circle} border-[1.5px] border-steel-300 hover:border-accent-500`}>
          <ArrowIcon className="size-3.5 rotate-180" />
        </Link>
      ) : null}
      {pageList(page, pageCount).map((p, i) =>
        p === "gap" ? (
          <span key={`gap-${i}`} className="px-1 text-steel-400">
            …
          </span>
        ) : p === page ? (
          <span key={p} aria-current="page" className={`${circle} bg-accent-500 font-bold text-white`}>
            {p}
          </span>
        ) : (
          <Link key={p} href={href(p)} className={`${circle} border-[1.5px] border-steel-300 hover:border-accent-500`}>
            {p}
          </Link>
        ),
      )}
      {page < pageCount ? (
        <Link href={href(page + 1)} rel="next" aria-label={t.next} className={`${circle} border-[1.5px] border-steel-900 hover:border-accent-500`}>
          <ArrowIcon className="size-3.5" />
        </Link>
      ) : null}
      <span className="sr-only">{t.page(page, pageCount)}</span>
    </nav>
  );
}
