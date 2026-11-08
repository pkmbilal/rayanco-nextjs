import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import {
  GearIcon,
  MapPinIcon,
  RecycleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  SortIcon,
  TruckIcon,
} from "@/components/icons";
import { CertificationsBand } from "@/components/sections/CertificationsBand";
import { CtaBand } from "@/components/sections/CtaBand";
import { LogoGrid } from "@/components/sections/LogoGrid";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import type { CatalogItem } from "@/content/catalog";
import { absoluteUrl } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { clients } from "@/lib/site";

const PATH = "/services/demolition";

export const metadata = pageMetadata({
  title: "Plant Dismantling & Demolition Scrap Services in Saudi Arabia",
  description:
    "Rayanco dismantles and scraps non-functional plants and structures across Saudi Arabia, then buys and recycles the recovered steel and non-ferrous metal.",
  path: PATH,
});

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

// TODO(owner): confirm scope (safety certifications, equipment fleet, past projects) to strengthen this page.
const steps: { icon: IconType; title: string; text: string }[] = [
  {
    icon: MapPinIcon,
    title: "Site survey",
    text: "We inspect the plant or structure and estimate the recoverable metal and equipment.",
  },
  { icon: ScaleIcon, title: "Offer", text: "You get a clear offer for the scrap value, the dismantling work, or both." },
  {
    icon: GearIcon,
    title: "Dismantling",
    text: "Our team dismantles and cuts the structure, segregating ferrous and non-ferrous metal.",
  },
  {
    icon: TruckIcon,
    title: "Removal & recycling",
    text: "Material is weighed, transported to our yard and recycled. The site is left clear.",
  },
];

const P = "/assets/images/Products";
const scope: CatalogItem[] = [
  {
    name: "Process plants & industrial units",
    image: `${P}/Panel_Boards.webp`,
    description: "Non-functional process plants, including panels, switchgear and plant equipment.",
  },
  {
    name: "Steel structures & warehouses",
    image: `${P}/Iron_Beems.webp`,
    description: "Steel structures, sheds and warehouses, cut down and sorted by grade.",
  },
  {
    name: "Tanks, pipelines & pipe racks",
    image: `${P}/Big_Pipes.webp`,
    description: "Storage tanks, pipelines and pipe racks, dismantled and removed.",
  },
  {
    name: "Heavy machinery & generators",
    image: `${P}/Generators.webp`,
    description: "Heavy machinery, transformers and generators, recovered for resale or scrap.",
  },
  {
    name: "Scaffolding",
    image: `${P}/Adjustable_Base_Jack.webp`,
    description: "Old scaffolding, base jacks and clamps, collected in bulk.",
  },
  {
    name: "Site camps & porta cabins",
    image: `${P}/Office_Portable_Cabins.webp`,
    description: "Site camps and used porta cabins, removed and cleared.",
  },
];

const facts = [
  { value: "1995", label: "Trading since" },
  { value: "~500,000 t", label: "Scrap processed per year" },
  { value: "20+", label: "Steel producers supplied" },
  { value: "ISO", label: "9001 & 14001 certified" },
];

const benefits: { icon: IconType; title: string; text: string }[] = [
  {
    icon: ScaleIcon,
    title: "Scrap value offsets the cost",
    text: "We buy the recovered metal directly, so its value is set against the cost of the dismantling work.",
  },
  {
    icon: SortIcon,
    title: "Full segregation & recycling",
    text: "Ferrous and non-ferrous metal is segregated, weighed accurately and recycled through our yard.",
  },
  {
    icon: RecycleIcon,
    title: "Site left clear",
    text: "Material is transported away and the site is left clear once the work is done.",
  },
];

const glow =
  "absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgb(31_157_85/0.16),transparent_55%)] rtl:bg-[radial-gradient(ellipse_at_top_left,rgb(31_157_85/0.16),transparent_55%)]";

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Plant dismantling & demolition scrap services",
  serviceType: "Industrial dismantling and demolition",
  description:
    "Dismantling and scrapping of non-functional plants and structures across Saudi Arabia, with the recovered metal bought and recycled by Rayanco.",
  url: absoluteUrl(PATH),
  provider: { "@id": absoluteUrl("/#organization") },
  areaServed: { "@type": "Country", name: "Saudi Arabia" },
};

export default function DemolitionPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd} />

      <PageHero
        title="Dismantling & Demolition"
        accent="Demolition"
        eyebrow="Services"
        crumbs={[{ name: "Demolition", href: PATH }]}
      >
        <p>
          We are active in the dismantling and scrapping of non-functional plants across Saudi Arabia, and we buy the
          recovered metal directly, so the scrap value offsets the cost of the work.
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
            <Heading eyebrow="Turnkey dismantling">One partner, from survey to scrap</Heading>
            <p className="mt-6 text-lg leading-relaxed text-steel-900">
              When a plant or structure reaches the end of its life, Rayanco takes it down and takes it away. We dismantle
              non-functional plants and buy the recovered steel and non-ferrous metal ourselves, so you deal with one
              company instead of a contractor and a scrap buyer.
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-steel-700">
              Recovered material comes back to our yard, where it is weighed accurately and segregated before it is
              recycled and supplied to steel producers. Our branches across the Kingdom mean we can reach sites in the
              Eastern Province and beyond.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[460px] lg:mx-0 lg:justify-self-end">
            <span
              aria-hidden="true"
              className="absolute -end-3 -top-3 hidden h-2/3 w-2/3 rounded-lg bg-accent-500/15 lg:block"
            />
            <div className="relative overflow-hidden rounded-lg bg-steel-950 shadow-panel">
              {/* TODO(owner): replace with a real Rayanco demolition project photo (1200px+ wide). */}
              <Image
                src="/assets/images/site/demolition-intro.webp"
                alt="Excavators and heavy machinery on a demolition site"
                width={448}
                height={206}
                sizes="(min-width: 480px) 460px, 100vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Key figures */}
      <Container className="pt-12">
        <dl className="relative isolate grid grid-cols-2 gap-y-6 overflow-hidden rounded-xl bg-steel-950 px-2 py-7 text-white shadow-panel ring-1 ring-white/10 sm:py-9 lg:grid-cols-4">
          <div aria-hidden="true" className={glow} />
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={`flex flex-col-reverse px-3.5 sm:px-7 ${i % 2 === 1 ? "border-s border-white/10" : ""} ${
                i === 2 ? "lg:border-s lg:border-white/10" : ""
              }`}
            >
              <dt className="mt-2 text-xs leading-snug text-white/65 sm:text-sm">{f.label}</dt>
              <dd className="whitespace-nowrap font-display text-[1.45rem] font-bold leading-none tracking-tight tabular-nums sm:text-4xl lg:text-[2.6rem]">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      {/* How it works */}
      <Container className="pt-12">
        <Heading
          eyebrow="How it works"
          subtitle="A simple, four-step process from first visit to a clear site."
          className="mb-6"
        >
          From survey to clear site
        </Heading>
        <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className="group relative isolate flex h-full flex-col overflow-hidden rounded-lg bg-gradient-to-br from-steel-900 to-steel-950 p-6 text-white shadow-panel ring-1 ring-white/10 motion-safe:transition motion-safe:duration-300 hover:-translate-y-0.5 hover:ring-accent-400/30"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent-400 via-accent-400/40 to-transparent opacity-60 motion-safe:transition-opacity group-hover:opacity-100 rtl:bg-gradient-to-l"
              />
              <span
                aria-hidden="true"
                className="absolute end-5 top-4 font-display text-5xl font-bold leading-none text-white/10 motion-safe:transition-colors group-hover:text-white/15"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex size-11 items-center justify-center rounded-full bg-white/5 ring-1 ring-accent-400/40">
                <Icon className="size-5 text-accent-400" />
              </span>
              <h3 className="mt-6 font-display text-[1.05rem] font-semibold leading-snug">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{text}</p>
            </li>
          ))}
        </ol>
      </Container>

      {/* What we dismantle */}
      <section aria-labelledby="scope-title" className="mt-12 bg-steel-50 py-10 sm:py-14">
        <Container>
          <Heading
            eyebrow="Scope"
            subtitle="From complete process plants to site camps, we dismantle and recover the metal."
            className="mb-6 sm:mb-8"
          >
            <span id="scope-title">What we dismantle</span>
          </Heading>
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {scope.map((item, i) => (
              <li
                key={item.image}
                className="group relative isolate flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-xl bg-steel-950 shadow-panel ring-1 ring-steel-900/10 motion-safe:transition motion-safe:duration-300 hover:-translate-y-1 hover:shadow-float"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  className="-z-20 object-cover motion-safe:transition-transform motion-safe:duration-700 group-hover:scale-110"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-steel-950 from-5% via-steel-950/55 via-45% to-transparent"
                />
                <span
                  aria-hidden="true"
                  className="absolute start-4 top-4 inline-flex h-7 items-center rounded-full bg-steel-950/55 px-2.5 font-display text-xs font-bold tabular-nums text-white ring-1 ring-white/20 backdrop-blur-sm"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="p-5 sm:p-6">
                  <span
                    aria-hidden="true"
                    className="mb-3 block h-1 w-8 rounded-full bg-accent-400 motion-safe:transition-all motion-safe:duration-300 group-hover:w-14"
                  />
                  <h3 className="font-display text-lg font-semibold leading-snug text-white">{item.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/75">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Benefits */}
      <Container className="pt-12">
        <Heading eyebrow="Why Rayanco" className="mb-6">
          What you get
        </Heading>
        <ul className="grid gap-3 sm:gap-4 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 rounded-lg bg-white p-5 ring-1 ring-steel-200 sm:p-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-500/10 ring-1 ring-accent-500/30">
                <Icon className="size-5 text-accent-600" />
              </span>
              <div>
                <h3 className="font-display text-[1.05rem] font-semibold leading-snug text-steel-950">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-steel-600">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>

      {/* Clients */}
      <Container className="pt-12">
        <Heading eyebrow="Trusted by" subtitle="Some of the industry leaders we work with." className="mb-6">
          Our clients
        </Heading>
        <LogoGrid logos={clients} width={250} height={100} altSuffix=" logo" />
      </Container>

      <CertificationsBand />

      <CtaBand
        title="Have a plant to"
        accent="dismantle?"
        text="Send us the location and a few photos, and we will arrange a site visit."
        whatsappText="Hi Rayanco, I have a plant / structure to dismantle."
      />
    </>
  );
}
