import { Heading } from "@/components/ui/Heading";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { categoryName, listingLocation } from "@/lib/listings/format";
import { isIndexable } from "@/lib/env";
import { hasActiveFilters, parseFilters } from "@/lib/listings/filters";
import { getCategories, getPublicLocations, searchListings } from "@/lib/listings/queries";
import { ListingFilters } from "./ListingFilters";
import { ListingGrid } from "./ListingGrid";
import { Pagination } from "./Pagination";

type Props = {
  locale: Locale;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  /** Locale-prefixed path the filters submit to. */
  basePath: string;
  /** Fixed category (category pages). */
  category?: string;
  /** Results heading, e.g. the category name. */
  heading?: string;
};

/**
 * Search card + filter sidebar + results. Reads searchParams, so it must be rendered inside <Suspense>.
 * Filtered / paginated URLs get a noindex robots meta (React hoists it into <head>);
 * Google applies the most restrictive robots directive on the page.
 */
export async function MarketplaceResults({ locale, searchParams, basePath, category, heading }: Props) {
  const t = getDictionary(locale).listings;
  const parsed = parseFilters(await searchParams);
  const filters = category ? { ...parsed, category } : parsed;
  const filtered = hasActiveFilters(filters, category ? ["category"] : []);

  const [{ items, total, page, pageCount }, categories, locations] = await Promise.all([
    searchListings(filters),
    getCategories(),
    getPublicLocations(),
  ]);

  // Strip the fixed category so it never ends up in this page's own query strings.
  const urlFilters = category ? { ...filters, category: undefined } : filters;

  return (
    <>
      {filtered ? <meta name="robots" content={`noindex, ${isIndexable ? "follow" : "nofollow"}`} /> : null}
      <ListingFilters
        locale={locale}
        rootPath={localePath(locale, "/used-equipment")}
        contactPath={localePath(locale, "/contact")}
        key={JSON.stringify(urlFilters)}
        basePath={basePath}
        filters={urlFilters}
        categories={categories.map((c) => ({ slug: c.slug, name: categoryName(locale, c) }))}
        currentCategory={category}
        locations={locations.map((l) => ({ value: l, label: listingLocation(locale, l) }))}
      >
        <Heading subtitle={<span aria-live="polite">{t.results(total)}</span>} className="mb-4">
          {heading ?? t.allStock}
        </Heading>
        <ListingGrid locale={locale} items={items} priorityCount={page === 1 ? 2 : 0} columns={3} />
        <Pagination locale={locale} basePath={basePath} filters={urlFilters} page={page} pageCount={pageCount} />
      </ListingFilters>
    </>
  );
}

export function ResultsSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse">
      <div className="relative z-10 -mt-8 h-16 rounded-2xl bg-white shadow-float" />
      <div className="grid gap-6 pt-7 lg:grid-cols-[250px_minmax(0,1fr)]">
        <div className="hidden h-80 rounded-xl bg-steel-100 lg:block" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="aspect-[4/5] rounded-md bg-steel-100" />
          ))}
        </div>
      </div>
    </div>
  );
}
