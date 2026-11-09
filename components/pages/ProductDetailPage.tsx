import Image from "next/image";
import {
  FactoryIcon,
  GlobeIcon,
  RecycleIcon,
  ScaleIcon,
  SearchIcon,
  ShieldCheckIcon,
  SortIcon,
  TruckIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { BenefitList } from "@/components/sections/BenefitList";
import { CertificationsBand } from "@/components/sections/CertificationsBand";
import { CtaBand } from "@/components/sections/CtaBand";
import { type Fact, FactsBand } from "@/components/sections/FactsBand";
import { PageHero } from "@/components/sections/PageHero";
import { PhotoCardGrid } from "@/components/sections/PhotoCardGrid";
import { type IconCard, ProcessSteps } from "@/components/sections/ProcessSteps";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import {
  type CatalogGroup,
  type CatalogItem,
  localizeGroup,
  localizeItems,
  metalScrapGroups,
  metalScrapSurplus,
  nonFerrousGroups,
  nonFerrousMetals,
} from "@/content/catalog";
import {
  metalScrapCopy,
  nonFerrousCopy,
  type ProductDetailCopy,
  productsSharedCopy,
} from "@/content/pages/products";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

type IconType = IconCard["icon"];

type Variant = {
  path: string;
  copy: Record<Locale, ProductDetailCopy>;
  items: CatalogItem[];
  groups: CatalogGroup[];
  image: { src: string; width: number; height: number };
  stepIcons: IconType[];
  benefitIcons: IconType[];
};

// TODO(owner): confirm the buying / selling process wording (grading, inspection, payment terms, delivery areas).
// TODO(owner): replace both intro photos with real Rayanco stock photos (1200px+ wide).
const variants = {
  "non-ferrous": {
    path: "/products/non-ferrous-metals",
    copy: nonFerrousCopy,
    items: nonFerrousMetals,
    groups: nonFerrousGroups,
    image: { src: "/assets/images/site/cat-non-ferrous.webp", width: 460, height: 284 },
    stepIcons: [WhatsAppIcon, SortIcon, ScaleIcon, TruckIcon],
    benefitIcons: [ScaleIcon, GlobeIcon, SortIcon],
  },
  "metal-scrap": {
    path: "/products/metal-scrap-surplus",
    copy: metalScrapCopy,
    items: metalScrapSurplus,
    groups: metalScrapGroups,
    image: { src: "/assets/images/site/cat-metal-scrap.webp", width: 466, height: 284 },
    stepIcons: [WhatsAppIcon, SearchIcon, ScaleIcon, TruckIcon],
    benefitIcons: [FactoryIcon, ShieldCheckIcon, RecycleIcon],
  },
} satisfies Record<string, Variant>;

export type ProductDetailVariant = keyof typeof variants;

export function productDetailMetadata(variant: ProductDetailVariant, locale: Locale) {
  const v = variants[variant];
  const c = v.copy[locale].meta;
  return pageMetadata({ locale, title: c.title, description: c.description, path: v.path });
}

/** /products/non-ferrous-metals and /products/metal-scrap-surplus (same layout, different content). */
export function ProductDetailPage({ variant, locale }: { variant: ProductDetailVariant; locale: Locale }) {
  const v = variants[variant];
  const c = v.copy[locale];
  const shared = productsSharedCopy[locale];
  const items = localizeItems(locale, v.items);
  const groups = v.groups.map((g) => localizeGroup(locale, g));

  const facts: Fact[] = [
    { value: "1995", label: shared.tradingSince },
    { value: String(items.length), label: c.factLabel },
    { value: "20+", label: shared.steelProducers },
    { value: shared.bulk, label: shared.bulkLabel },
  ];
  const steps: IconCard[] = c.how.steps.map((s, i) => ({ ...s, icon: v.stepIcons[i] }));
  const benefits: IconCard[] = c.benefits.map((b, i) => ({ ...b, icon: v.benefitIcons[i] }));

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: c.itemListName,
    inLanguage: locale,
    url: absoluteUrl(localePath(locale, v.path)),
    numberOfItems: items.length,
    itemListElement: items.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.name,
      description: m.description,
      image: absoluteUrl(m.image),
    })),
  };

  return (
    <>
      <JsonLd data={itemListJsonLd} />

      <PageHero
        locale={locale}
        title={c.hero.title}
        accent={c.hero.accent}
        eyebrow={shared.productsEyebrow}
        crumbs={[
          { name: shared.productsCrumb, href: "/products" },
          { name: c.hero.crumb, href: v.path },
        ]}
      >
        <p>{c.hero.text}</p>
        <p className="mt-3 flex items-center gap-1.5 text-[0.8rem] font-medium text-white/75">
          <ShieldCheckIcon className="size-4 shrink-0 text-accent-400" />
          {shared.since}
        </p>
      </PageHero>

      {/* Intro */}
      <Container className="pt-12 sm:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div>
            <Heading eyebrow={c.intro.eyebrow}>{c.intro.title}</Heading>
            <p className="mt-6 text-lg leading-relaxed text-steel-900">{c.intro.lead}</p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-steel-700">{c.intro.body}</p>
          </div>

          <div className="relative mx-auto w-full max-w-[460px] lg:mx-0 lg:justify-self-end">
            <span
              aria-hidden="true"
              className="absolute -end-3 -top-3 hidden h-2/3 w-2/3 rounded-lg bg-accent-500/15 lg:block"
            />
            <div className="relative overflow-hidden rounded-lg bg-steel-950 shadow-panel">
              <Image
                src={v.image.src}
                alt={c.intro.imageAlt}
                width={v.image.width}
                height={v.image.height}
                sizes="(min-width: 480px) 460px, 100vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Key figures */}
      <FactsBand facts={facts} />

      {/* Items, grouped */}
      <div className="mt-12">
        {groups.map((g, i) => (
          <section
            key={g.key}
            id={g.key}
            aria-labelledby={`${g.key}-title`}
            className={`py-10 sm:py-14 ${i % 2 === 0 ? "bg-steel-50" : ""}`}
          >
            <Container>
              <Heading eyebrow={c.groupEyebrow(g.items.length)} subtitle={g.intro} className="mb-6 sm:mb-8">
                <span id={`${g.key}-title`}>{g.title}</span>
              </Heading>
              <PhotoCardGrid locale={locale} items={g.items} columns={4} quote />
            </Container>
          </section>
        ))}
      </div>

      {/* How it works */}
      <Container className="pt-12">
        <Heading eyebrow={c.how.eyebrow} subtitle={c.how.subtitle} className="mb-6">
          {c.how.title}
        </Heading>
        <ProcessSteps steps={steps} />
      </Container>

      {/* Benefits */}
      <Container className="pt-12">
        <Heading eyebrow={c.benefitsEyebrow} className="mb-6">
          {shared.whatYouGet}
        </Heading>
        <BenefitList items={benefits} />
      </Container>

      <CertificationsBand locale={locale} />

      <CtaBand
        locale={locale}
        title={c.cta.title}
        accent={c.cta.accent}
        text={c.cta.text}
        whatsappText={c.cta.whatsapp}
      />
    </>
  );
}
