"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { ArrowIcon, SearchIcon } from "@/components/icons";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { getDictionary } from "@/lib/i18n";
import { toQueryString, type ListingFilters as Filters } from "@/lib/listings/filters";
import { LISTING_CONDITIONS } from "@/lib/supabase/models";

const FORM_ID = "listing-filters";

type Props = {
  /** Path the form submits to (index or a category page). */
  basePath: string;
  filters: Filters;
  /** Sidebar category links. */
  categories: { slug: string; name_en: string }[];
  /** Slug of the category page we're on, if any. */
  currentCategory?: string;
  locations: string[];
  /** The results column. */
  children: ReactNode;
};

const fieldClass =
  "block h-10 w-full rounded-full border-[1.5px] border-steel-100 bg-steel-50 px-4 text-sm text-steel-900 placeholder:text-steel-400 focus:border-accent-500 focus:outline-none";

const chipBase =
  "inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border-[1.5px] border-steel-100 bg-steel-50 px-3.5 text-xs font-semibold text-steel-900 transition-colors hover:border-accent-500 peer-focus-visible:outline-2 peer-focus-visible:outline-accent-500";

const chipChecked = {
  green:
    "peer-checked:border-accent-500 peer-checked:bg-accent-500 peer-checked:text-white peer-checked:shadow-[0_4px_12px_rgb(31_157_85/0.3)]",
  ink: "peer-checked:border-steel-900 peer-checked:bg-steel-900 peer-checked:text-white peer-checked:shadow-[0_4px_12px_rgb(11_34_54/0.25)]",
};

function Panel({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-steel-100 bg-white p-4 shadow-panel">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-ui text-[0.8rem] font-semibold">
          <span aria-hidden="true" className="h-3.5 w-1 rounded-sm bg-accent-500" />
          {title}
        </h3>
        {action}
      </div>
      {children}
    </div>
  );
}

/** Radio styled as a pill; changing it submits the form. */
function RadioChip({
  name,
  value,
  checked,
  label,
  tone,
  onChange,
}: {
  name: string;
  value: string;
  checked: boolean;
  label: string;
  tone: keyof typeof chipChecked;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label>
      <input
        type="radio"
        form={FORM_ID}
        name={name}
        value={value}
        defaultChecked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span className={`${chipBase} ${chipChecked[tone]}`}>{label}</span>
    </label>
  );
}

/**
 * Marketplace layout: floating search card, filter sidebar and the results column.
 * Works without JS as a plain GET form (sidebar inputs join it via the `form` attribute);
 * with JS it drops empty fields so URLs stay clean.
 */
export function ListingFilters({ basePath, filters, categories, currentCategory, locations, children }: Props) {
  const t = getDictionary().listings;
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    for (const [key, value] of data.entries()) {
      const v = String(value).trim();
      if (v) params.set(key, v);
    }
    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
    setOpen(false);
  }

  const autoSubmit = (e: ChangeEvent<HTMLInputElement>) => e.currentTarget.form?.requestSubmit();

  const active = Object.values(filters).some((v) => v != null);
  // Category links keep the other filters but reset paging.
  const keepQs = toQueryString({ ...filters, category: undefined, page: undefined });

  return (
    <>
      {/* Floating search card over the hero. */}
      <form
        id={FORM_ID}
        action={basePath}
        method="get"
        role="search"
        onSubmit={onSubmit}
        className="relative z-10 -mt-8 flex flex-col gap-2.5 rounded-2xl border border-steel-100 bg-white p-3 shadow-float sm:flex-row sm:items-center sm:p-3.5"
      >
        <label className="flex h-11 flex-1 items-center gap-2.5 rounded-full border-[1.5px] border-steel-100 bg-steel-50 px-4 focus-within:border-accent-500">
          <SearchIcon className="size-4 shrink-0 text-steel-500" />
          <span className="sr-only">{t.search}</span>
          <input
            name="q"
            type="search"
            defaultValue={filters.q ?? ""}
            placeholder={t.searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-sm text-steel-900 outline-none placeholder:text-steel-400"
          />
        </label>
        <div className="flex gap-2.5">
          <Button type="submit" variant="primary" className="flex-1 px-6 sm:flex-none">
            {t.apply}
          </Button>
          {active ? (
            <Link href={basePath} className={buttonClasses({ variant: "secondary", className: "text-steel-900" })}>
              {t.reset}
            </Link>
          ) : null}
          <button
            type="button"
            className={buttonClasses({ variant: "outline", className: "lg:hidden" })}
            aria-expanded={open}
            aria-controls="listing-sidebar"
            onClick={() => setOpen((o) => !o)}
          >
            {t.filters}
            <span aria-hidden="true">{open ? "−" : "+"}</span>
          </button>
        </div>
      </form>

      <div className="grid gap-6 pb-10 pt-7 lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside id="listing-sidebar" className={`${open ? "flex" : "hidden"} flex-col gap-4 lg:flex`}>
          <Panel
            title={t.category}
            action={
              currentCategory ? (
                <Link href={`/used-equipment${keepQs}`} className="text-[0.7rem] font-semibold text-accent-600">
                  {t.clear}
                </Link>
              ) : undefined
            }
          >
            <nav aria-label={t.browseCategories}>
              <ul className="flex flex-wrap gap-2">
                <li>
                  <Chip href={`/used-equipment${keepQs}`} active={!currentCategory}>
                    {t.allCategories}
                  </Chip>
                </li>
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Chip href={`/used-equipment/${c.slug}${keepQs}`} active={c.slug === currentCategory}>
                      {c.name_en}
                    </Chip>
                  </li>
                ))}
              </ul>
            </nav>
          </Panel>

          <Panel title={t.condition}>
            <div className="flex flex-wrap gap-2">
              <RadioChip name="condition" value="" checked={!filters.condition} label={t.anyCondition} tone="ink" onChange={autoSubmit} />
              {LISTING_CONDITIONS.map((c) => (
                <RadioChip
                  key={c}
                  name="condition"
                  value={c}
                  checked={filters.condition === c}
                  label={t.conditions[c]}
                  tone="ink"
                  onChange={autoSubmit}
                />
              ))}
            </div>
          </Panel>

          {locations.length > 0 ? (
            <Panel title={t.location}>
              <div className="flex flex-wrap gap-2">
                <RadioChip name="location" value="" checked={!filters.location} label={t.anyLocation} tone="green" onChange={autoSubmit} />
                {locations.map((l) => (
                  <RadioChip
                    key={l}
                    name="location"
                    value={l}
                    checked={filters.location?.toLowerCase() === l.toLowerCase()}
                    label={l}
                    tone="green"
                    onChange={autoSubmit}
                  />
                ))}
              </div>
            </Panel>
          ) : null}

          <Panel title={t.priceAndYear}>
            <div className="grid grid-cols-2 gap-2">
              <label className="text-[0.7rem] font-semibold text-steel-500">
                {t.minPrice}
                <input form={FORM_ID} name="minPrice" type="number" inputMode="numeric" min={0} defaultValue={filters.minPrice ?? ""} className={`${fieldClass} mt-1`} />
              </label>
              <label className="text-[0.7rem] font-semibold text-steel-500">
                {t.maxPrice}
                <input form={FORM_ID} name="maxPrice" type="number" inputMode="numeric" min={0} defaultValue={filters.maxPrice ?? ""} className={`${fieldClass} mt-1`} />
              </label>
              <label className="text-[0.7rem] font-semibold text-steel-500">
                {t.minYear}
                <input form={FORM_ID} name="minYear" type="number" inputMode="numeric" min={1900} max={2100} defaultValue={filters.minYear ?? ""} className={`${fieldClass} mt-1`} />
              </label>
              <label className="text-[0.7rem] font-semibold text-steel-500">
                {t.maxYear}
                <input form={FORM_ID} name="maxYear" type="number" inputMode="numeric" min={1900} max={2100} defaultValue={filters.maxYear ?? ""} className={`${fieldClass} mt-1`} />
              </label>
            </div>
            <Button type="submit" form={FORM_ID} variant="dark" size="sm" className="mt-3 w-full">
              {t.apply}
            </Button>
          </Panel>

          <div className="hidden rounded-lg bg-steel-800 p-4 text-white lg:block">
            <p className="font-display text-[1.05rem] font-bold leading-snug">{t.cantFindTitle}</p>
            <p className="mb-3.5 mt-2 text-xs leading-relaxed text-white/85">{t.cantFindText}</p>
            <Link href="/contact" className={buttonClasses({ variant: "primary", size: "sm" })}>
              {t.getQuote}
              <ArrowIcon className="size-3.5" />
            </Link>
          </div>
        </aside>

        <div>{children}</div>
      </div>
    </>
  );
}
