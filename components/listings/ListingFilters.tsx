"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { getDictionary } from "@/lib/i18n";
import type { ListingFilters as Filters } from "@/lib/listings/filters";
import { LISTING_CONDITIONS } from "@/lib/supabase/models";

type Props = {
  /** Path the form submits to (index or a category page). */
  basePath: string;
  filters: Filters;
  /** Category options; omit on category pages (the category is the path). */
  categories?: { slug: string; name_en: string }[];
  locations: string[];
};

const field =
  "mt-1 block w-full rounded-md border border-steel-300 bg-white px-3 py-2 text-base text-steel-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30";
const label = "block text-sm font-medium text-steel-700";

/**
 * Filter + search form. Works without JS as a plain GET form; with JS it drops empty
 * fields so URLs stay clean (`?condition=working` rather than `?q=&location=&condition=working`).
 */
export function ListingFilters({ basePath, filters, categories, locations }: Props) {
  const t = getDictionary().listings;
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    let target = basePath;
    for (const [key, value] of data.entries()) {
      const v = String(value).trim();
      if (!v) continue;
      // On the index, choosing a category goes to that category's (indexable) page.
      if (key === "category") target = `/used-equipment/${v}`;
      else params.set(key, v);
    }
    const qs = params.toString();
    router.push(qs ? `${target}?${qs}` : target);
    setOpen(false);
  }

  const active = Object.values(filters).some((v) => v != null);

  return (
    <div className="rounded-lg border border-steel-100 bg-white p-4">
      <button
        type="button"
        className="flex w-full items-center justify-between font-semibold lg:hidden"
        aria-expanded={open}
        aria-controls="listing-filters"
        onClick={() => setOpen((o) => !o)}
      >
        {t.showFilters}
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>

      <form
        id="listing-filters"
        action={basePath}
        method="get"
        role="search"
        onSubmit={onSubmit}
        className={`${open ? "mt-4 grid" : "hidden"} gap-4 sm:grid-cols-2 lg:mt-0 lg:grid lg:grid-cols-4`}
      >
        <label className={`${label} sm:col-span-2`}>
          {t.search}
          <input name="q" type="search" defaultValue={filters.q ?? ""} placeholder={t.searchPlaceholder} className={field} />
        </label>

        {categories ? (
          <label className={label}>
            {t.category}
            <select name="category" defaultValue={filters.category ?? ""} className={field}>
              <option value="">{t.allCategories}</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name_en}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <label className={label}>
          {t.location}
          <select name="location" defaultValue={filters.location ?? ""} className={field}>
            <option value="">{t.anyLocation}</option>
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>

        <label className={label}>
          {t.condition}
          <select name="condition" defaultValue={filters.condition ?? ""} className={field}>
            <option value="">{t.anyCondition}</option>
            {LISTING_CONDITIONS.map((c) => (
              <option key={c} value={c}>
                {t.conditions[c]}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className={label}>
            {t.minPrice}
            <input name="minPrice" type="number" inputMode="numeric" min={0} defaultValue={filters.minPrice ?? ""} className={field} />
          </label>
          <label className={label}>
            {t.maxPrice}
            <input name="maxPrice" type="number" inputMode="numeric" min={0} defaultValue={filters.maxPrice ?? ""} className={field} />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className={label}>
            {t.minYear}
            <input name="minYear" type="number" inputMode="numeric" min={1900} max={2100} defaultValue={filters.minYear ?? ""} className={field} />
          </label>
          <label className={label}>
            {t.maxYear}
            <input name="maxYear" type="number" inputMode="numeric" min={1900} max={2100} defaultValue={filters.maxYear ?? ""} className={field} />
          </label>
        </div>

        <div className="flex items-end gap-3 sm:col-span-2 lg:col-span-1">
          <Button type="submit" className="flex-1">
            {t.apply}
          </Button>
          {active ? (
            <Link href={basePath} className="py-2 text-sm font-semibold text-steel-600 hover:text-accent-600 hover:underline">
              {t.clear}
            </Link>
          ) : null}
        </div>
      </form>
    </div>
  );
}
