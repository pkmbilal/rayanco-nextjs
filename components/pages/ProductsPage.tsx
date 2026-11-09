import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { CategoryCards, type CategoryCard } from "@/components/sections/CategoryCards";
import { CertificationsBand } from "@/components/sections/CertificationsBand";
import { CtaBand } from "@/components/sections/CtaBand";
import { GroupNav } from "@/components/sections/GroupNav";
import { PageHero } from "@/components/sections/PageHero";
import { PhotoCardGrid } from "@/components/sections/PhotoCardGrid";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import {
  equipmentTypes,
  localizeGroup,
  metalScrapSurplus,
  nonFerrousMetals,
  productGroups,
  products,
} from "@/content/catalog";
import { productsCopy, productsSharedCopy } from "@/content/pages/products";
import { localePath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function productsMetadata(locale: Locale) {
  const c = productsCopy[locale].meta;
  return pageMetadata({ locale, title: c.title, description: c.description, path: "/products" });
}

const cardDefs = [
  { href: "/products/non-ferrous-metals", count: nonFerrousMetals.length, image: "/assets/images/site/cat-non-ferrous.webp", imageWidth: 460 },
  { href: "/products/metal-scrap-surplus", count: metalScrapSurplus.length, image: "/assets/images/site/cat-metal-scrap.webp", imageWidth: 466 },
  { href: "/used-equipment", count: equipmentTypes.length, image: "/assets/images/site/cat-equipment.webp", imageWidth: 462 },
] as const;

/** Dividers for a 2-col (mobile) / 4-col (sm+) figures row. */
const FIGURE_EDGE = ["ps-0 sm:ps-0", "border-s", "ps-0 sm:ps-5 sm:border-s", "border-s"] as const;

export function ProductsPage({ locale }: { locale: Locale }) {
  const c = productsCopy[locale];
  const shared = productsSharedCopy[locale];
  const groups = productGroups.map((g) => localizeGroup(locale, g));
  const categories: CategoryCard[] = cardDefs.map((d, i) => ({
    href: localePath(locale, d.href),
    title: c.cards[i].title,
    text: c.cards[i].text,
    meta: c.cards[i].meta(d.count),
    image: d.image,
    imageWidth: d.imageWidth,
    imageHeight: 284,
  }));
  const figures = [
    { value: "1995", label: shared.tradingSince },
    { value: String(products.length), label: c.productLines },
    { value: "20+", label: shared.steelProducers },
    { value: shared.bulk, label: c.bulkLabel },
  ];

  return (
    <>
      <PageHero
        locale={locale}
        title={c.hero.title}
        eyebrow={c.hero.eyebrow}
        overlap
        crumbs={[{ name: shared.productsCrumb, href: "/products" }]}
      >
        <p>{c.hero.text}</p>
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
          label={c.groupNav}
          links={groups.map((g) => ({ href: `#${g.key}`, title: g.title, count: g.items.length }))}
        />

        {groups.map((g, i) => (
          <section
            key={g.key}
            id={g.key}
            aria-labelledby={`${g.key}-title`}
            className={`scroll-mt-32 py-10 sm:scroll-mt-36 sm:py-14 ${i % 2 === 1 ? "bg-steel-50" : ""}`}
          >
            <Container>
              <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
                <Heading eyebrow={c.groupEyebrow(g.items.length)} subtitle={g.intro}>
                  <span id={`${g.key}-title`}>{g.title}</span>
                </Heading>
                {g.href ? (
                  <Link
                    href={localePath(locale, g.href)}
                    className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-accent-600 hover:underline"
                  >
                    {c.viewAll}
                    <ArrowIcon className="size-3.5" />
                  </Link>
                ) : null}
              </div>
              <PhotoCardGrid locale={locale} items={g.items} columns={4} quote />
            </Container>
          </section>
        ))}
      </div>

      <CertificationsBand locale={locale} className="pt-4 pb-10 sm:pb-12" />

      <CtaBand locale={locale} flushTop title={c.cta.title} text={c.cta.text} />
    </>
  );
}
