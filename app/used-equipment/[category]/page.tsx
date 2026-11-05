import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MarketplaceResults, ResultsSkeleton } from "@/components/listings/MarketplaceResults";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { CATALOG_IMAGE_SIZE, equipmentTypes } from "@/content/catalog";
import { categoryPath } from "@/lib/listings/format";
import { getCategories, getCategoryBySlug } from "@/lib/listings/queries";
import { pageMetadata } from "@/lib/seo";
import type { Category } from "@/lib/supabase/models";

// Unknown categories block on render (complete HTML + real 404), see the listing page.
export const instant = false;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ category: c.slug }));
}

function categoryCopy(c: Category) {
  const fallback = equipmentTypes.find((e) => e.slug === c.slug);
  // TODO(owner): write seo_title / seo_description / description_en per category in the admin.
  return {
    title: c.seo_title || `Used ${c.name_en} for Sale in Saudi Arabia`,
    description:
      c.seo_description ||
      `Used ${c.name_en.toLowerCase()} for sale from Rayanco in Dammam and Jubail, Saudi Arabia. Inspected machines, honest condition reports. Enquire on WhatsApp or phone.`,
    intro: c.description_en || fallback?.description || null,
    image: fallback?.image ?? null,
  };
}

export async function generateMetadata({ params }: PageProps<"/used-equipment/[category]">): Promise<Metadata> {
  const { category } = await params;
  const c = await getCategoryBySlug(category);
  if (!c) return {};
  const copy = categoryCopy(c);
  return pageMetadata({
    title: copy.title,
    description: copy.description,
    path: categoryPath(c.slug),
    image: copy.image
      ? { url: copy.image, width: CATALOG_IMAGE_SIZE, height: CATALOG_IMAGE_SIZE, alt: c.name_en }
      : undefined,
  });
}

export default async function CategoryPage({ params, searchParams }: PageProps<"/used-equipment/[category]">) {
  const { category } = await params;
  const c = await getCategoryBySlug(category);
  if (!c) notFound();
  const copy = categoryCopy(c);
  const path = categoryPath(c.slug);

  return (
    <>
      <PageHero
        title={`Used ${c.name_en} for Sale`}
        eyebrow="Used equipment"
        crumbs={[
          { name: "Used Equipment", href: "/used-equipment" },
          { name: c.name_en, href: path },
        ]}
      >
        {copy.intro ? <p>{copy.intro}</p> : null}
        <p className="mt-3 text-base">
          Rayanco buys and resells used {c.name_en.toLowerCase()} across Saudi Arabia from our yards in Dammam and
          Jubail. Contact us on WhatsApp or phone for photos, inspection and the best price.
        </p>
      </PageHero>

      <Section className="!pt-8 sm:!pt-10">
        <Suspense fallback={<ResultsSkeleton />}>
          <MarketplaceResults searchParams={searchParams} basePath={path} category={c.slug} />
        </Suspense>
      </Section>

      <CtaBand
        title={`Need a specific ${c.name_en.toLowerCase().replace(/s$/, "")}?`}
        text="Tell us the capacity, year and location you need. Stock changes weekly and not every machine is listed online."
        whatsappText={`Hi, I'm looking for used ${c.name_en.toLowerCase()}: `}
      />
    </>
  );
}
