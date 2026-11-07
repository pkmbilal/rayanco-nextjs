import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { createPublicClient } from "@/lib/supabase/server";
import { PUBLIC_STATUSES, type Category, type ListingCondition } from "@/lib/supabase/models";
import { PAGE_SIZE, sanitizeSearchTerm, type ListingFilters } from "./filters";

/**
 * Public, cached reads for the marketplace. Every query runs as anon (RLS applies) and
 * selects an explicit column list: never `*`, never `listing_private`.
 *
 * Cache tags (the admin in build step 6 must revalidate these after any listing change):
 *   "listings"          every listing query
 *   "listing:{slug}"    a single listing page
 *   "categories"        category list / lookups
 *   "sitemap"           app/sitemap.ts
 */

export const CACHE_TAGS = {
  listings: "listings",
  categories: "categories",
  sitemap: "sitemap",
  listing: (slug: string) => `listing:${slug}`,
} as const;

export type PublicStatus = (typeof PUBLIC_STATUSES)[number];

const LISTING_COLUMNS =
  "id, ref_code, slug, title_en, make, model, year, condition, hours_or_km, capacity, location, quantity, price_sar, price_on_request, negotiable, description_en, status, published_at, sold_at, updated_at";

const CARD_COLUMNS = "id, ref_code, slug, title_en, make, model, year, condition, location, price_sar, price_on_request, status";

const IMAGE_COLUMNS = "r2_key, thumb_key, width, height, alt_text, sort_order";

export type PublicImage = {
  r2_key: string;
  thumb_key: string | null;
  width: number | null;
  height: number | null;
  alt_text: string | null;
  sort_order: number;
};

export type CategoryRef = Pick<Category, "slug" | "name_en">;

export type ListingCardData = {
  id: string;
  ref_code: string;
  slug: string;
  title_en: string;
  make: string | null;
  model: string | null;
  year: number | null;
  condition: ListingCondition | null;
  location: string | null;
  price_sar: number | null;
  price_on_request: boolean;
  status: PublicStatus;
  category: CategoryRef;
  cover: PublicImage | null;
};

export type ListingDetail = Omit<ListingCardData, "cover"> & {
  hours_or_km: number | null;
  capacity: string | null;
  quantity: number;
  negotiable: boolean;
  description_en: string | null;
  published_at: string | null;
  sold_at: string | null;
  updated_at: string;
  category_id: string;
  images: PublicImage[];
};

type CardRow = Omit<ListingCardData, "category" | "cover"> & {
  categories: CategoryRef;
  listing_images: PublicImage[];
};

function toCard(row: CardRow): ListingCardData {
  const { categories, listing_images, ...rest } = row;
  return { ...rest, category: categories, cover: listing_images[0] ?? null };
}

function fail(where: string, error: { code?: string; message: string }): never {
  throw new Error(`${where}: ${error.code ?? ""} ${error.message}`);
}

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.categories);

  const { data, error } = await createPublicClient()
    .from("categories")
    .select("id, slug, name_en, name_ar, description_en, description_ar, seo_title, seo_description, sort")
    .order("sort");
  if (error) fail("getCategories", error);
  return data;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function searchListings(
  filters: ListingFilters,
): Promise<{ items: ListingCardData[]; total: number; page: number; pageCount: number }> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.listings);

  const page = filters.page ?? 1;
  const from = (page - 1) * PAGE_SIZE;

  let query = createPublicClient()
    .from("listings")
    .select(`${CARD_COLUMNS}, categories!inner(slug, name_en), listing_images(${IMAGE_COLUMNS})`, { count: "exact" })
    .in("status", PUBLIC_STATUSES)
    .order("sort_order", { referencedTable: "listing_images" })
    .limit(1, { referencedTable: "listing_images" })
    // Enum order is draft < pending < available < reserved < sold, so this puts available first.
    .order("status")
    .order("published_at", { ascending: false, nullsFirst: false })
    .range(from, from + PAGE_SIZE - 1);

  if (filters.category) query = query.eq("categories.slug", filters.category);
  if (filters.condition) query = query.eq("condition", filters.condition);
  if (filters.location) {
    const loc = sanitizeSearchTerm(filters.location);
    if (loc) query = query.ilike("location", loc);
  }
  if (filters.minPrice != null) query = query.gte("price_sar", filters.minPrice);
  if (filters.maxPrice != null) query = query.lte("price_sar", filters.maxPrice);
  if (filters.minYear != null) query = query.gte("year", filters.minYear);
  if (filters.maxYear != null) query = query.lte("year", filters.maxYear);
  if (filters.q) {
    const term = sanitizeSearchTerm(filters.q);
    if (term) {
      const p = `%${term}%`;
      query = query.or(`title_en.ilike.${p},make.ilike.${p},model.ilike.${p},ref_code.ilike.${p}`);
    }
  }

  const { data, error, count } = await query;
  // Asking for a page past the end returns 416 (PGRST103); treat it as empty.
  if (error && error.code !== "PGRST103") fail("searchListings", error);
  const total = count ?? 0;
  return {
    items: ((data ?? []) as unknown as CardRow[]).map(toCard),
    total,
    page,
    pageCount: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };
}

export async function getListing(categorySlug: string, slug: string): Promise<ListingDetail | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.listings, CACHE_TAGS.listing(slug));

  const { data, error } = await createPublicClient()
    .from("listings")
    .select(`${LISTING_COLUMNS}, category_id, categories!inner(slug, name_en), listing_images(${IMAGE_COLUMNS})`)
    .eq("slug", slug)
    .eq("categories.slug", categorySlug)
    .in("status", PUBLIC_STATUSES)
    .order("sort_order", { referencedTable: "listing_images" })
    .maybeSingle();
  if (error) fail("getListing", error);
  if (!data) return null;

  const { categories, listing_images, ...rest } = data as unknown as Omit<ListingDetail, "category" | "images"> & {
    categories: CategoryRef;
    listing_images: PublicImage[];
  };
  return { ...rest, category: categories, images: listing_images };
}

export async function getSimilarListings(listing: { id: string; category: CategoryRef }, limit = 4): Promise<ListingCardData[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.listings);

  const { data, error } = await createPublicClient()
    .from("listings")
    .select(`${CARD_COLUMNS}, categories!inner(slug, name_en), listing_images(${IMAGE_COLUMNS})`)
    .eq("categories.slug", listing.category.slug)
    .neq("id", listing.id)
    .in("status", PUBLIC_STATUSES)
    .order("sort_order", { referencedTable: "listing_images" })
    .limit(1, { referencedTable: "listing_images" })
    .order("status")
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(limit);
  if (error) fail("getSimilarListings", error);
  return (data as unknown as CardRow[]).map(toCard);
}

/** Newest available/reserved listings for the home page "Latest stock" strip (sold ones excluded). */
export async function getLatestListings(limit = 4): Promise<ListingCardData[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.listings);

  const { data, error } = await createPublicClient()
    .from("listings")
    .select(`${CARD_COLUMNS}, categories!inner(slug, name_en), listing_images(${IMAGE_COLUMNS})`)
    .in("status", ["available", "reserved"])
    .order("sort_order", { referencedTable: "listing_images" })
    .limit(1, { referencedTable: "listing_images" })
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(limit);
  if (error) fail("getLatestListings", error);
  return (data as unknown as CardRow[]).map(toCard);
}

/** Distinct locations of public listings, for the filter dropdown. */
export async function getPublicLocations(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.listings);

  const { data, error } = await createPublicClient()
    .from("listings")
    .select("location")
    .in("status", PUBLIC_STATUSES)
    .not("location", "is", null);
  if (error) fail("getPublicLocations", error);
  return [...new Set(data.map((r) => r.location!.trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

/** Every public listing URL with its last change, for the sitemap and generateStaticParams. */
export async function getPublicListingPaths(): Promise<{ category: string; slug: string; updated_at: string }[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.listings, CACHE_TAGS.sitemap);

  const { data, error } = await createPublicClient()
    .from("listings")
    .select("slug, updated_at, categories!inner(slug)")
    .in("status", PUBLIC_STATUSES)
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(5000);
  if (error) fail("getPublicListingPaths", error);
  return (data as unknown as { slug: string; updated_at: string; categories: { slug: string } }[]).map((r) => ({
    category: r.categories.slug,
    slug: r.slug,
    updated_at: r.updated_at,
  }));
}
