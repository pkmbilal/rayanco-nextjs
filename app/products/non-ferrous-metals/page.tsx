import Image from "next/image";
import {
  GlobeIcon,
  ScaleIcon,
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
import { nonFerrousGroups, nonFerrousMetals } from "@/content/catalog";
import { absoluteUrl } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

const PATH = "/products/non-ferrous-metals";

export const metadata = pageMetadata({
  title: "Non-Ferrous Metal Scrap Buyer in Saudi Arabia",
  description:
    "Rayanco buys and sells non-ferrous metals in Saudi Arabia: copper, aluminium and zorba, brass, bronze, lead, zinc, tin, stainless, alloy and tool steel.",
  path: PATH,
});

const facts: Fact[] = [
  { value: "1995", label: "Trading since" },
  { value: String(nonFerrousMetals.length), label: "Non-ferrous metals traded" },
  { value: "20+", label: "Steel producers supplied" },
  { value: "Bulk", label: "and container, local & international" },
];

// TODO(owner): confirm the buying process wording (grading method, payment terms, collection areas).
const steps: IconCard[] = [
  {
    icon: WhatsAppIcon,
    title: "Send the details",
    text: "Share the metal, grade, approximate quantity and a few photos on WhatsApp or by phone.",
  },
  {
    icon: SortIcon,
    title: "Grading & sorting",
    text: "We identify the grade and check the material so the price reflects what you actually have.",
  },
  { icon: ScaleIcon, title: "Offer", text: "You get a clear offer based on the grade and current market prices." },
  {
    icon: TruckIcon,
    title: "Weighing & collection",
    text: "Material is weighed accurately and collected, from single lots up to full containers.",
  },
];

const benefits: IconCard[] = [
  {
    icon: ScaleIcon,
    title: "Any quantity",
    text: "We buy non-ferrous scrap in any quantity, from single lots to full containers.",
  },
  {
    icon: GlobeIcon,
    title: "Local & international trade",
    text: "Trade ties with suppliers in the UK, USA, Canada, Denmark, Russia, Dubai, Africa and India.",
  },
  {
    icon: SortIcon,
    title: "Accurate weighing & segregation",
    text: "Material is weighed accurately and segregated by metal and grade before it is recycled.",
  },
];

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Non-ferrous metals bought and sold by Rayanco",
  url: absoluteUrl(PATH),
  numberOfItems: nonFerrousMetals.length,
  itemListElement: nonFerrousMetals.map((m, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: m.name,
    description: m.description,
    image: absoluteUrl(m.image),
  })),
};

export default function NonFerrousPage() {
  return (
    <>
      <JsonLd data={itemListJsonLd} />

      <PageHero
        title="Non-Ferrous Metals"
        accent="Non-Ferrous"
        eyebrow="Products"
        crumbs={[
          { name: "Products", href: "/products" },
          { name: "Non-Ferrous Metals", href: PATH },
        ]}
      >
        <p>
          We have a large inventory of non-ferrous metals and buy non-ferrous scrap in any quantity, from single lots to
          containers.
        </p>
        <p className="mt-3 flex items-center gap-1.5 text-[0.8rem] font-medium text-white/75">
          <ShieldCheckIcon className="size-4 shrink-0 text-accent-400" />
          Since 1995 · ISO 9001 &amp; 14001 · ISRI member
        </p>
      </PageHero>

      {/* Intro */}
      <Container className="pt-12 sm:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div>
            <Heading eyebrow="Non-ferrous trading">Copper, aluminium, brass and more, in any quantity</Heading>
            <p className="mt-6 text-lg leading-relaxed text-steel-900">
              Rayanco buys and sells non-ferrous metal in bulk and in containers, locally and internationally, and has
              done so since 1995. From copper cable and aluminium zorba to brass turnings and stainless offcuts, we
              grade it, price it and take it away.
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-steel-700">
              Recovered metal is segregated by grade at our yard and supplied to more than 20 steel-producing companies
              and to buyers abroad, so you get a fair price for what you have.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[460px] lg:mx-0 lg:justify-self-end">
            <span
              aria-hidden="true"
              className="absolute -end-3 -top-3 hidden h-2/3 w-2/3 rounded-lg bg-accent-500/15 lg:block"
            />
            <div className="relative overflow-hidden rounded-lg bg-steel-950 shadow-panel">
              {/* TODO(owner): replace with a real photo of Rayanco's non-ferrous stock (1200px+ wide). */}
              <Image
                src="/assets/images/site/cat-non-ferrous.webp"
                alt="Sorted copper, aluminium and brass scrap"
                width={460}
                height={284}
                sizes="(min-width: 480px) 460px, 100vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Key figures */}
      <FactsBand facts={facts} />

      {/* Metals, grouped */}
      <div className="mt-12">
        {nonFerrousGroups.map((g, i) => (
          <section
            key={g.key}
            id={g.key}
            aria-labelledby={`${g.key}-title`}
            className={`py-10 sm:py-14 ${i % 2 === 0 ? "bg-steel-50" : ""}`}
          >
            <Container>
              <Heading
                eyebrow={`${g.items.length} metals`}
                subtitle={g.intro}
                className="mb-6 sm:mb-8"
              >
                <span id={`${g.key}-title`}>{g.title}</span>
              </Heading>
              <PhotoCardGrid items={g.items} columns={4} quote />
            </Container>
          </section>
        ))}
      </div>

      {/* How we buy */}
      <Container className="pt-12">
        <Heading
          eyebrow="How we buy"
          subtitle="Four simple steps from your first message to collection."
          className="mb-6"
        >
          Selling non-ferrous scrap to Rayanco
        </Heading>
        <ProcessSteps steps={steps} />
      </Container>

      {/* Benefits */}
      <Container className="pt-12">
        <Heading eyebrow="Why Rayanco" className="mb-6">
          What you get
        </Heading>
        <BenefitList items={benefits} />
      </Container>

      <CertificationsBand />

      <CtaBand
        title="Have non-ferrous scrap to"
        accent="sell?"
        text="Send us the metal, grade and quantity, and we will quote you quickly."
        whatsappText="Hi Rayanco, I'd like a quote for non-ferrous metal."
      />
    </>
  );
}
