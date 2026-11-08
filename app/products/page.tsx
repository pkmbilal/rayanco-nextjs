import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { CategoryCards, type CategoryCard } from "@/components/sections/CategoryCards";
import { CertificationsBand } from "@/components/sections/CertificationsBand";
import { CtaBand } from "@/components/sections/CtaBand";
import { GroupNav } from "@/components/sections/GroupNav";
import { ItemGrid } from "@/components/sections/ItemGrid";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { equipmentTypes, metalScrapSurplus, nonFerrousMetals, productGroups, products } from "@/content/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Scrap Metal Products & Surplus Materials in Saudi Arabia",
  description:
    "Rayanco's product line: aluminium, copper, brass, nickel and ferrous scrap, pipes, beams, plates, rebars, cables, generators, containers and porta cabins in Jubail and Dammam.",
  path: "/products",
});

const categories: CategoryCard[] = [
  {
    href: "/products/non-ferrous-metals",
    title: "Non-Ferrous Metals",
    text: "Copper, aluminium, brass, bronze, zinc and more.",
    meta: `${nonFerrousMetals.length} metals`,
    image: "/assets/images/site/cat-non-ferrous.webp",
    imageWidth: 460,
    imageHeight: 284,
  },
  {
    href: "/products/metal-scrap-surplus",
    title: "Metal Scrap & Surplus",
    text: "Beams, coils, plate and seamless pipe from project surplus.",
    meta: `${metalScrapSurplus.length} materials`,
    image: "/assets/images/site/cat-metal-scrap.webp",
    imageWidth: 466,
    imageHeight: 284,
  },
  {
    href: "/used-equipment",
    title: "Used Equipment",
    text: "Cranes, excavators, generators and heavy plant for sale.",
    meta: `${equipmentTypes.length} categories`,
    image: "/assets/images/site/cat-equipment.webp",
    imageWidth: 462,
    imageHeight: 284,
  },
];

const figures = [
  { value: "1995", label: "Trading since" },
  { value: String(products.length), label: "Product lines" },
  { value: "20+", label: "Steel producers supplied" },
  { value: "Bulk", label: "and container, local and international" },
] as const;

/** Dividers for a 2-col (mobile) / 4-col (sm+) figures row. */
const FIGURE_EDGE = ["ps-0 sm:ps-0", "border-s", "ps-0 sm:ps-5 sm:border-s", "border-s"] as const;

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Products"
        eyebrow="Our product line"
        overlap
        crumbs={[{ name: "Products", href: "/products" }]}
      >
        <p>
          Our product line consists of the following scrap, surplus and used materials. We buy and sell in bulk and in
          containers, locally and internationally.
        </p>
      </PageHero>

      <CategoryCards cards={categories} />

      <Container className="pt-10 sm:pt-12">
        <dl className="grid grid-cols-2 gap-y-5 border-y border-steel-200 py-5 sm:grid-cols-4">
          {figures.map(({ value, label }, i) => (
            <div
              key={label}
              className={`flex flex-col-reverse border-steel-200 px-3 sm:px-5 ${FIGURE_EDGE[i]}`}
            >
              <dt className="mt-1 text-xs leading-snug text-steel-600">{label}</dt>
              <dd className="font-display text-[1.6rem] font-bold leading-none tracking-tight text-steel-950 tabular-nums sm:text-3xl">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      <div className="mt-10 sm:mt-12">
        <GroupNav
          label="Product groups"
          links={productGroups.map((g) => ({ href: `#${g.key}`, title: g.title, count: g.items.length }))}
        />

        {productGroups.map((g, i) => (
          <section
            key={g.key}
            id={g.key}
            aria-labelledby={`${g.key}-title`}
            className={`scroll-mt-32 py-10 sm:scroll-mt-36 sm:py-14 ${i % 2 === 1 ? "bg-steel-50" : ""}`}
          >
            <Container>
              <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
                <Heading eyebrow={`${g.items.length} materials`} subtitle={g.intro}>
                  <span id={`${g.key}-title`}>{g.title}</span>
                </Heading>
                {g.href ? (
                  <Link
                    href={g.href}
                    className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-accent-600 hover:underline"
                  >
                    View all
                    <ArrowIcon className="size-3.5" />
                  </Link>
                ) : null}
              </div>
              <ItemGrid items={g.items} />
            </Container>
          </section>
        ))}
      </div>

      <CertificationsBand className="pt-4 pb-10 sm:pb-12" />

      <CtaBand flushTop title="Need a price?" text="Send us the material, grade and quantity and we will quote you quickly." />
    </>
  );
}
