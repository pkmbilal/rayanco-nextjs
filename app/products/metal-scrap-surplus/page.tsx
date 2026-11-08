import Image from "next/image";
import {
  FactoryIcon,
  RecycleIcon,
  SearchIcon,
  ShieldCheckIcon,
  TruckIcon,
  WhatsAppIcon,
  ScaleIcon,
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
import { metalScrapGroups, metalScrapSurplus } from "@/content/catalog";
import { absoluteUrl } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

const PATH = "/products/metal-scrap-surplus";

export const metadata = pageMetadata({
  title: "Metal Scrap & Surplus Materials in Saudi Arabia",
  description:
    "Surplus steel from Rayanco in Jubail and Dammam: beams, carbon steel, coils, MS pipes, seamless pipe and plate, from project and plant surplus.",
  path: PATH,
});

const facts: Fact[] = [
  { value: "1995", label: "Trading since" },
  { value: String(metalScrapSurplus.length), label: "Surplus product lines" },
  { value: "20+", label: "Steel producers supplied" },
  { value: "Bulk", label: "and container, local & international" },
];

// TODO(owner): confirm the process wording (inspection, mill certificates, delivery areas, payment terms).
const steps: IconCard[] = [
  {
    icon: WhatsAppIcon,
    title: "Send your requirement",
    text: "Tell us the material, size or grade and quantity you need on WhatsApp or by phone.",
  },
  {
    icon: SearchIcon,
    title: "Stock & specs",
    text: "We check what we have in stock and send you photos, dimensions and available quantities.",
  },
  { icon: ScaleIcon, title: "Quote", text: "You get a clear price for the lot, for resale use or as scrap." },
  {
    icon: TruckIcon,
    title: "Inspection & dispatch",
    text: "Inspect the material at our yard, then we weigh, load and dispatch it to you.",
  },
];

const benefits: IconCard[] = [
  {
    icon: FactoryIcon,
    title: "Project & plant surplus",
    text: "Steel from projects, plants and fabrication yards, often unused, at well below the price of new stock.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Ready stock, no lead time",
    text: "Material is already in Saudi Arabia, so you can inspect it and take it away without waiting on a mill.",
  },
  {
    icon: RecycleIcon,
    title: "We buy surplus too",
    text: "Have leftover beams, pipe or plate after a project? We buy surplus and scrap steel in any quantity.",
  },
];

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Metal scrap and surplus materials from Rayanco",
  url: absoluteUrl(PATH),
  numberOfItems: metalScrapSurplus.length,
  itemListElement: metalScrapSurplus.map((m, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: m.name,
    description: m.description,
    image: absoluteUrl(m.image),
  })),
};

export default function MetalScrapSurplusPage() {
  return (
    <>
      <JsonLd data={itemListJsonLd} />

      <PageHero
        title="Metal Scrap & Surplus Materials"
        accent="Surplus Materials"
        eyebrow="Products"
        crumbs={[
          { name: "Products", href: "/products" },
          { name: "Metal Scrap & Surplus", href: PATH },
        ]}
      >
        <p>
          We have a large inventory of surplus materials from projects, plants and fabrication yards, available for resale
          or as scrap.
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
            <Heading eyebrow="Surplus steel">Beams, pipe, plate and coil, ready to inspect</Heading>
            <p className="mt-6 text-lg leading-relaxed text-steel-900">
              When projects finish and plants are dismantled, good steel is left over. Rayanco buys that surplus and
              keeps it in stock in the Eastern Province, so you can buy structural sections, pipe, plate and coil
              without the cost or lead time of new material.
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-steel-700">
              What can&apos;t be reused is graded and supplied as scrap to more than 20 steel-producing companies, in bulk
              and in containers, locally and internationally.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[460px] lg:mx-0 lg:justify-self-end">
            <span
              aria-hidden="true"
              className="absolute -end-3 -top-3 hidden h-2/3 w-2/3 rounded-lg bg-accent-500/15 lg:block"
            />
            <div className="relative overflow-hidden rounded-lg bg-steel-950 shadow-panel">
              {/* TODO(owner): replace with a real photo of Rayanco's surplus steel yard (1200px+ wide). */}
              <Image
                src="/assets/images/site/cat-metal-scrap.webp"
                alt="Surplus steel beams and pipe in a scrap yard"
                width={466}
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

      {/* Materials, grouped */}
      <div className="mt-12">
        {metalScrapGroups.map((g, i) => (
          <section
            key={g.key}
            id={g.key}
            aria-labelledby={`${g.key}-title`}
            className={`py-10 sm:py-14 ${i % 2 === 0 ? "bg-steel-50" : ""}`}
          >
            <Container>
              <Heading eyebrow={`${g.items.length} product lines`} subtitle={g.intro} className="mb-6 sm:mb-8">
                <span id={`${g.key}-title`}>{g.title}</span>
              </Heading>
              <PhotoCardGrid items={g.items} columns={4} quote />
            </Container>
          </section>
        ))}
      </div>

      {/* How it works */}
      <Container className="pt-12">
        <Heading
          eyebrow="How it works"
          subtitle="Four simple steps from your first message to dispatch."
          className="mb-6"
        >
          Buying surplus steel from Rayanco
        </Heading>
        <ProcessSteps steps={steps} />
      </Container>

      {/* Benefits */}
      <Container className="pt-12">
        <Heading eyebrow="Why surplus" className="mb-6">
          What you get
        </Heading>
        <BenefitList items={benefits} />
      </Container>

      <CertificationsBand />

      <CtaBand
        title="Need steel, pipe or plate from"
        accent="surplus?"
        text="Send us the size, grade and quantity you need, and we will check our stock and quote you quickly."
        whatsappText="Hi Rayanco, I'm interested in your surplus steel materials."
      />
    </>
  );
}
