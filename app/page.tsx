import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { ArrowIcon, CalendarIcon, FactoryIcon, GlobeIcon, ShieldCheckIcon, WhatsAppIcon } from "@/components/icons";
import { ListingGrid } from "@/components/listings/ListingGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { LogoGrid } from "@/components/sections/LogoGrid";
import { HERO_IMAGE } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { materials } from "@/content/catalog";
import { getDictionary } from "@/lib/i18n";
import { organizationJsonLd } from "@/lib/jsonld";
import { getLatestListings } from "@/lib/listings/queries";
import { pageMetadata } from "@/lib/seo";
import { certifications, clients, whatsappUrl } from "@/lib/site";

// Ranking content preserved from the legacy homepage (CLAUDE.md §6). Do not remove the title, H1 or core text.
export const metadata = pageMetadata({
  title: "Scrap Buyer in Jubail, Saudi Arabia | Rayanco",
  absoluteTitle: true,
  description:
    "Rayanco is the largest scrap buyer in Jubail, Saudi Arabia, buying and selling scrap since 1995: ferrous and non-ferrous metals, surplus materials and used equipment.",
  path: "/",
});

// TODO(owner): the hero, category and CTA photos are design-stage images; replace with real Rayanco yard photos.
const paths = [
  {
    href: "/products/non-ferrous-metals",
    title: "Non-Ferrous Metals",
    text: "Copper, aluminium, brass, zinc",
    image: "/assets/images/site/cat-non-ferrous.webp",
    alt: "Copper wire scrap",
  },
  {
    href: "/products/metal-scrap-surplus",
    title: "Metal Scrap & Surplus",
    text: "Beams, pipes, plates, HMS",
    image: "/assets/images/site/cat-metal-scrap.webp",
    alt: "Stacked steel beams",
  },
  {
    href: "/used-equipment",
    title: "Used Equipment",
    text: "Cranes, generators, loaders",
    image: "/assets/images/site/cat-equipment.webp",
    alt: "Used industrial equipment",
  },
  {
    href: "/services/demolition",
    title: "Demolition & Dismantling",
    text: "Non-functional plants",
    image: "/assets/images/site/cat-demolition.webp",
    alt: "Heavy machinery on a demolition site",
  },
] as const;

const stats: { icon: ComponentType<SVGProps<SVGSVGElement>>; label: string }[] = [
  { icon: CalendarIcon, label: "Trading since 1995" },
  { icon: FactoryIcon, label: "20+ steel producers supplied" },
  { icon: GlobeIcon, label: "Local & international" },
  { icon: ShieldCheckIcon, label: "ISO 9001 & 14001" },
];

const services = [
  {
    title: "Buying & selling of ferrous metals",
    text: "We buy and sell all kinds of ferrous scrap materials, from raw materials to finished products: HMS, shredded scrap, beams, pipes, plates and rail.",
  },
  {
    title: "Buying & selling of non-ferrous metals",
    text: "We buy and sell non-ferrous products such as zorba and all types of aluminium scrap, plus copper, brass, nickel and zinc.",
  },
  {
    title: "Buying & selling of plastic scrap",
    text: "We also buy and sell selected plastic scrap products. Contact us with the material and quantity for a quote.",
  },
  {
    title: "Metal scrap shredding",
    text: "We offer metal scrap shredding services at very affordable shredding charges.",
  },
];

export default async function Home() {
  const t = getDictionary();
  const latest = await getLatestListings(4);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-steel-950 text-white">
        <Image
          src={HERO_IMAGE.src}
          alt=""
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover object-[center_55%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(13_30_40/0.9)_0%,rgb(13_30_40/0.72)_45%,rgb(13_30_40/0.4)_100%)] rtl:bg-[linear-gradient(270deg,rgb(13_30_40/0.9)_0%,rgb(13_30_40/0.72)_45%,rgb(13_30_40/0.4)_100%)]"
        />
        <Container className="py-14 sm:py-20 lg:py-24">
          <h1 className="max-w-xl font-display text-[2.1rem] font-bold leading-[1.13] tracking-tight sm:text-[2.6rem] lg:text-5xl">
            Scrap Buyer in <span className="text-accent-400">Jubail, Saudi Arabia</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-snug sm:text-lg">
            Bulk and container trade of ferrous and non-ferrous metal, local as well as international, since 1995.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={whatsappUrl("Hi, I'd like to sell scrap to Rayanco.")} external size="lg" variant="primary">
              <WhatsAppIcon className="size-5" />
              {t.cta.sellScrap}
              <ArrowIcon className="size-4" />
            </ButtonLink>
            <ButtonLink href="/used-equipment" size="lg" variant="secondary" className="text-white">
              {t.cta.browseEquipment}
              <ArrowIcon className="size-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Product line paths */}
      <Container className="pt-4">
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {paths.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="group relative block overflow-hidden rounded-md bg-steel-950 text-white shadow-[0_2px_6px_rgb(0_0_0/0.18)]"
              >
                <Image
                  src={p.image}
                  alt={p.alt}
                  width={466}
                  height={284}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="aspect-[466/284] h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex items-center justify-between gap-2 px-3 py-3 sm:px-4">
                  <div className="min-w-0">
                    <h2 className="font-display text-sm font-semibold leading-tight sm:text-[0.95rem]">{p.title}</h2>
                    <p className="mt-0.5 truncate text-[0.7rem] text-white/80 sm:text-xs">{p.text}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="hidden size-7 shrink-0 items-center justify-center rounded-full border-[1.5px] border-white transition-colors group-hover:border-accent-400 group-hover:text-accent-400 sm:inline-flex"
                  >
                    <ArrowIcon className="size-3.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      {/* Stat band */}
      <Container className="pt-5">
        <ul className="grid grid-cols-2 gap-y-3 rounded-lg bg-band px-3 py-4 shadow-[0_1px_3px_rgb(0_0_0/0.06)] lg:grid-cols-4 lg:py-3">
          {stats.map(({ icon: Icon, label }, i) => (
            <li
              key={label}
              className={`flex items-center justify-center gap-2.5 px-2 text-xs font-medium sm:text-[0.8rem] ${
                i > 0 ? "lg:border-s lg:border-steel-300" : ""
              }`}
            >
              <Icon className="size-7 shrink-0 text-accent-500 sm:size-8" />
              {label}
            </li>
          ))}
        </ul>
      </Container>

      {/* Latest stock */}
      {latest.length > 0 ? (
        <Container className="pt-10">
          <div className="mb-4 flex items-start justify-between gap-4">
            <Heading subtitle="Used equipment currently available from our yards.">Latest Stock</Heading>
            <Link
              href="/used-equipment"
              className={buttonClasses({ variant: "outline", size: "sm", className: "mt-1 shrink-0" })}
            >
              View all
              <ArrowIcon className="size-3.5" />
            </Link>
          </div>
          <ListingGrid items={latest} />
        </Container>
      ) : null}

      {/* Who we are */}
      <Container className="pt-12">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-14">
          <Heading eyebrow="Who we are" className="self-start">
            The largest scrap buyer in Jubail
          </Heading>
          <div className="space-y-3 text-[0.95rem] leading-relaxed text-steel-700">
            <p>
              Rayanco is the largest scrap buyer in Jubail, Saudi Arabia. We are involved in the bulk and container trade of
              ferrous and non-ferrous metal, local as well as international, since 1995.
            </p>
            <p>
              We have enduring trade ties with reputed suppliers across the UK, USA, Canada, Denmark, Russia, Dubai, several
              African countries and India, and we supply more than 20 steel-producing companies.
            </p>
            <p>We are also active in the dismantling and scrapping of non-functional plants.</p>
            <Link href="/about" className="inline-flex items-center gap-1.5 font-bold text-accent-600 hover:underline">
              More about Rayanco
              <ArrowIcon className="size-3.5" />
            </Link>
          </div>
        </div>
      </Container>

      {/* What we do */}
      <Container className="pt-12">
        <Heading eyebrow="What we do" subtitle="Buying and selling scrap, locally and internationally." className="mb-5">
          Our Services
        </Heading>
        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {services.map((s) => (
            <li key={s.title} className="rounded-lg border border-steel-100 bg-white p-5 shadow-panel">
              <h3 className="font-display text-[1.05rem] font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-steel-600">{s.text}</p>
            </li>
          ))}
        </ul>
      </Container>

      {/* What we buy & sell */}
      <Container className="pt-12">
        <Heading
          subtitle="All used and unused ferrous and non-ferrous metals, surplus materials, heavy equipment and selected plastic scrap."
          className="mb-4"
        >
          What We Buy &amp; Sell
        </Heading>
        <ul className="flex flex-wrap gap-2">
          {materials.map((m) => (
            <li key={m}>
              <Chip className="bg-white">{m}</Chip>
            </li>
          ))}
        </ul>
        <p className="mt-5">
          <Link href="/products" className="inline-flex items-center gap-1.5 text-sm font-bold text-accent-600 hover:underline">
            See our full product line
            <ArrowIcon className="size-3.5" />
          </Link>
        </p>
      </Container>

      {/* News */}
      <Container className="pt-12">
        <div className="rounded-lg border-s-4 border-accent-500 bg-steel-50 p-6 sm:p-8">
          <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-accent-600">News</p>
          <h2 className="font-display text-xl font-bold sm:text-2xl">
            Building Saudi Arabia&apos;s first EAF steel billet plant
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-steel-700">
            Rayanco is building Saudi Arabia&apos;s first electric arc furnace (EAF) steel billet plant in Dammam, turning
            recycled scrap into new steel billets in the Kingdom.
          </p>
          {/* TODO(owner): add timeline, capacity and a photo for the EAF plant announcement. */}
        </div>
      </Container>

      <CtaBand
        text="Have scrap or equipment to sell? Contact our team and we will make you an offer or list it for you."
        whatsappText="Hi Rayanco, I have scrap / equipment to sell."
      />

      {/* Clients */}
      <Container>
        <Heading subtitle="Some of our esteemed clients." className="mb-4 [&_h2]:text-[1.4rem]">
          Our Clients
        </Heading>
        <LogoGrid logos={clients} width={250} height={100} altSuffix=" logo" />
      </Container>

      {/* Certifications */}
      <Container className="py-10">
        <div className="flex flex-col gap-4 rounded-lg bg-band px-6 py-5 sm:flex-row sm:items-center sm:gap-8">
          <div className="shrink-0">
            <h2 className="font-display text-lg font-bold">Certifications</h2>
            <p className="mt-0.5 text-xs text-steel-700">Awarded and accredited by</p>
          </div>
          <div className="flex-1">
            <LogoGrid logos={certifications} width={250} height={150} altSuffix=" certification" cols={5} tiles={false} />
          </div>
        </div>
      </Container>
    </>
  );
}
