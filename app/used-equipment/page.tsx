import Link from "next/link";
import { Suspense } from "react";
import { MarketplaceResults, ResultsSkeleton } from "@/components/listings/MarketplaceResults";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { getDictionary } from "@/lib/i18n";
import { categoryPath } from "@/lib/listings/format";
import { getCategories } from "@/lib/listings/queries";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Used Heavy Equipment for Sale in Saudi Arabia",
  description:
    "Used cranes, generators, excavators, wheel loaders, compressors and more for sale from Rayanco in Dammam and Jubail, Saudi Arabia. Contact us on WhatsApp or phone.",
  path: "/used-equipment",
});

export default async function UsedEquipmentPage({ searchParams }: PageProps<"/used-equipment">) {
  const t = getDictionary().listings;
  const categories = await getCategories();

  return (
    <>
      <PageHero
        title="Used Equipment for Sale"
        eyebrow="Equipment resale"
        crumbs={[{ name: "Used Equipment", href: "/used-equipment" }]}
      >
        <p>
          We buy and resell used heavy equipment and machinery across Saudi Arabia. Every machine below is inspected by
          our team in Dammam and Jubail. Contact us on WhatsApp or phone to arrange a viewing and agree a price.
        </p>
      </PageHero>

      <Section className="!pt-8 sm:!pt-10">
        <nav aria-label={t.browseCategories} className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-steel-500">{t.browseCategories}</h2>
          <ul className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={categoryPath(c.slug)}
                  className="inline-block rounded-full border border-steel-200 px-3 py-1.5 text-sm font-medium text-steel-700 hover:border-accent-500 hover:text-accent-600"
                >
                  {c.name_en}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Suspense fallback={<ResultsSkeleton />}>
          <MarketplaceResults searchParams={searchParams} basePath="/used-equipment" />
        </Suspense>
      </Section>

      <CtaBand
        title="Looking for a specific machine?"
        text="Send us the type, capacity and year you need on WhatsApp and we will check our current stock."
        whatsappText="Hi, I'm looking for used equipment: "
      />
    </>
  );
}
