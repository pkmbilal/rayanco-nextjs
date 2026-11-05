import { getDictionary } from "@/lib/i18n";
import { isIndexable } from "@/lib/env";
import { hasActiveFilters, parseFilters } from "@/lib/listings/filters";
import { getCategories, getPublicLocations, searchListings } from "@/lib/listings/queries";
import { ListingFilters } from "./ListingFilters";
import { ListingGrid } from "./ListingGrid";
import { Pagination } from "./Pagination";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  basePath: string;
  /** Fixed category (category pages). */
  category?: string;
};

/**
 * Filters + results. Reads searchParams, so it must be rendered inside <Suspense>.
 * Filtered / paginated URLs get a noindex robots meta (React hoists it into <head>);
 * Google applies the most restrictive robots directive on the page.
 */
export async function MarketplaceResults({ searchParams, basePath, category }: Props) {
  const t = getDictionary().listings;
  const parsed = parseFilters(await searchParams);
  const filters = category ? { ...parsed, category } : parsed;
  const filtered = hasActiveFilters(filters, category ? ["category"] : []);

  const [{ items, total, page, pageCount }, categories, locations] = await Promise.all([
    searchListings(filters),
    category ? Promise.resolve(undefined) : getCategories(),
    getPublicLocations(),
  ]);

  // Strip the fixed category so it never ends up in this page's own query strings.
  const urlFilters = category ? { ...filters, category: undefined } : filters;

  return (
    <>
      {filtered ? <meta name="robots" content={`noindex, ${isIndexable ? "follow" : "nofollow"}`} /> : null}
      <ListingFilters
        key={JSON.stringify(urlFilters)}
        basePath={basePath}
        filters={urlFilters}
        categories={categories?.map((c) => ({ slug: c.slug, name_en: c.name_en }))}
        locations={locations}
      />
      <p className="mb-4 mt-6 text-sm font-medium text-steel-500" aria-live="polite">
        {t.results(total)}
      </p>
      <ListingGrid items={items} priorityCount={page === 1 ? 2 : 0} />
      <Pagination basePath={basePath} filters={urlFilters} page={page} pageCount={pageCount} />
    </>
  );
}

export function ResultsSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse">
      <div className="h-14 rounded-lg bg-steel-100" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="aspect-[4/5] rounded-lg bg-steel-100" />
        ))}
      </div>
    </div>
  );
}
