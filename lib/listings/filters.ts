import { z } from "zod";
import { LISTING_CONDITIONS } from "@/lib/supabase/models";

export const PAGE_SIZE = 24;

const optionalInt = (min: number, max: number) =>
  z
    .string()
    .trim()
    .regex(/^\d+$/)
    .transform(Number)
    .pipe(z.number().int().min(min).max(max))
    .optional()
    .catch(undefined);

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((s) => s || undefined)
    .optional()
    .catch(undefined);

/** Query-string filters for the marketplace. Invalid values are dropped, never thrown. */
const filtersSchema = z.object({
  q: optionalText(100),
  category: z
    .string()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    .optional()
    .catch(undefined),
  location: optionalText(100),
  condition: z.enum(LISTING_CONDITIONS).optional().catch(undefined),
  minPrice: optionalInt(0, 1_000_000_000),
  maxPrice: optionalInt(0, 1_000_000_000),
  minYear: optionalInt(1900, 2100),
  maxYear: optionalInt(1900, 2100),
  page: optionalInt(1, 10_000),
});

export type ListingFilters = z.infer<typeof filtersSchema>;
export const FILTER_KEYS = Object.keys(filtersSchema.shape) as (keyof ListingFilters)[];

type RawParams = Record<string, string | string[] | undefined>;

export function parseFilters(raw: RawParams): ListingFilters {
  const flat: Record<string, string> = {};
  for (const key of FILTER_KEYS) {
    const v = raw[key];
    const s = Array.isArray(v) ? v[0] : v;
    if (s != null && s !== "") flat[key] = s;
  }
  return filtersSchema.parse(flat);
}

/** True when any filter, search or page param is set (those URLs are noindex). */
export function hasActiveFilters(f: ListingFilters, ignore: (keyof ListingFilters)[] = []): boolean {
  return FILTER_KEYS.some((k) => !ignore.includes(k) && f[k] != null);
}

export function toQueryString(f: Partial<ListingFilters>): string {
  const params = new URLSearchParams();
  for (const key of FILTER_KEYS) {
    const v = f[key];
    if (v != null && v !== "") params.set(key, String(v));
  }
  const s = params.toString();
  return s ? `?${s}` : "";
}

/**
 * Makes a user term safe for a PostgREST `ilike` inside an `or=(...)` filter:
 * wildcard and filter-syntax characters are replaced with spaces (not escaped), so
 * nothing the user types can change the filter's structure.
 */
export function sanitizeSearchTerm(term: string): string {
  return term
    .replace(/[\\%_*,()."':]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
