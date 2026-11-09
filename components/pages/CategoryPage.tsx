import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MarketplaceResults, ResultsSkeleton } from "@/components/listings/MarketplaceResults";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { CATALOG_IMAGE_SIZE, equipmentTypes, localizeItems } from "@/content/catalog";
import { marketplaceCopy } from "@/content/pages/marketplace";
import { localePath, pick, type Locale } from "@/lib/i18n";
import { categoryName, categoryPath } from "@/lib/listings/format";
import { getCategories, getCategoryBySlug } from "@/lib/listings/queries";
import { pageMetadata } from "@/lib/seo";
import type { Category } from "@/lib/supabase/models";

export async function categoryStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ category: c.slug }));
}

function categoryCopy(locale: Locale, c: Category) {
  const fallback = localizeItems(locale, equipmentTypes.filter((e) => e.slug === c.slug))[0];
  const t = marketplaceCopy[locale].category;
  const name = categoryName(locale, c);
  // TODO(owner): write seo_title / seo_description / description_en (and _ar) per category in the admin.
  // The DB seo_* fields are English only, so Arabic pages always use the generated pattern.
  const seoTitle = locale === "en" ? c.seo_title : null;
  const seoDescription = locale === "en" ? c.seo_description : null;
  return {
    name,
    title: seoTitle || t.metaTitle(name),
    description: seoDescription || t.metaDescription(name),
    intro: pick(locale, c.description_en, c.description_ar) || fallback?.description || null,
    image: fallback?.image ?? null,
  };
}

export async function categoryMetadata(locale: Locale, slug: string): Promise<Metadata> {
  const c = await getCategoryBySlug(slug);
  if (!c) return {};
  const copy = categoryCopy(locale, c);
  return pageMetadata({
    locale,
    title: copy.title,
    description: copy.description,
    path: categoryPath(c.slug),
    image: copy.image
      ? { url: copy.image, width: CATALOG_IMAGE_SIZE, height: CATALOG_IMAGE_SIZE, alt: copy.name }
      : undefined,
  });
}

export async function CategoryPage({
  locale,
  slug,
  searchParams,
}: {
  locale: Locale;
  slug: string;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const c = await getCategoryBySlug(slug);
  if (!c) notFound();
  const copy = categoryCopy(locale, c);
  const t = marketplaceCopy[locale];
  const name = copy.name;
  const path = categoryPath(c.slug);

  return (
    <>
      <PageHero
        locale={locale}
        title={t.category.title(name)}
        accent={name}
        eyebrow={t.category.eyebrow}
        crumbs={[
          { name: t.index.crumb, href: "/used-equipment" },
          { name, href: path },
        ]}
        overlap
      >
        {copy.intro ? <p>{copy.intro}</p> : null}
        <p className="mt-2 text-sm text-white/80">{t.category.text(name)}</p>
      </PageHero>

      <Container>
        <Suspense fallback={<ResultsSkeleton />}>
          <MarketplaceResults
            locale={locale}
            searchParams={searchParams}
            basePath={localePath(locale, path)}
            category={c.slug}
            heading={name}
          />
        </Suspense>
      </Container>

      <CtaBand
        locale={locale}
        title={t.category.ctaTitle(name)}
        text={t.category.ctaText}
        whatsappText={t.category.ctaWhatsapp(name)}
      />
    </>
  );
}
