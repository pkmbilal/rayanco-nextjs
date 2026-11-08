import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import {
  ArrowIcon,
  BeamIcon,
  CalendarIcon,
  CoilIcon,
  FactoryIcon,
  GearIcon,
  GlobeIcon,
  IngotIcon,
  RecycleIcon,
  ShieldCheckIcon,
  ShredderIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { ListingGrid } from "@/components/listings/ListingGrid";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { CertificationsBand } from "@/components/sections/CertificationsBand";
import { CtaBand } from "@/components/sections/CtaBand";
import { LogoGrid } from "@/components/sections/LogoGrid";
import { HERO_IMAGE } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { materialGroups, type MaterialGroupKey } from "@/content/catalog";
import { getDictionary } from "@/lib/i18n";
import { organizationJsonLd } from "@/lib/jsonld";
import { getLatestListings } from "@/lib/listings/queries";
import { pageMetadata } from "@/lib/seo";
import { clients, whatsappUrl } from "@/lib/site";

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

const services: { icon: ComponentType<SVGProps<SVGSVGElement>>; title: string; text: string }[] = [
  {
    icon: BeamIcon,
    title: "Buying & selling of ferrous metals",
    text: "We buy and sell all kinds of ferrous scrap materials, from raw materials to finished products: HMS, shredded scrap, beams, pipes, plates and rail.",
  },
  {
    icon: IngotIcon,
    title: "Buying & selling of non-ferrous metals",
    text: "We buy and sell non-ferrous products such as zorba and all types of aluminium scrap, plus copper, brass, nickel and zinc.",
  },
  {
    icon: RecycleIcon,
    title: "Buying & selling of plastic scrap",
    text: "We also buy and sell selected plastic scrap products. Contact us with the material and quantity for a quote.",
  },
  {
    icon: ShredderIcon,
    title: "Metal scrap shredding",
    text: "We offer metal scrap shredding services at very affordable shredding charges.",
  },
];

const materialIcons: Record<MaterialGroupKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  "non-ferrous": IngotIcon,
  "ferrous-scrap": ShredderIcon,
  stainless: CoilIcon,
  structural: BeamIcon,
  equipment: GearIcon,
};

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
      <Container className="pt-6">
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {paths.map((p, i) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-lg bg-steel-950 text-white shadow-panel ring-1 ring-white/10 outline-none focus-visible:ring-2 focus-visible:ring-accent-400 motion-safe:transition motion-safe:duration-300 hover:-translate-y-0.5 hover:ring-accent-400/30 sm:aspect-[4/3] lg:aspect-[6/5]"
              >
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="-z-20 object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-steel-950 via-steel-950/55 to-steel-950/5 motion-safe:transition-opacity motion-safe:duration-300 group-hover:opacity-90"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent-400 via-accent-400/40 to-transparent opacity-70 motion-safe:transition-opacity group-hover:opacity-100 rtl:bg-gradient-to-l"
                />
                <span className="absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-sm bg-steel-950/50 px-2 py-1 font-ui text-[0.65rem] font-semibold tabular-nums tracking-[0.18em] text-white/80 ring-1 ring-white/10 backdrop-blur-sm sm:start-4 sm:top-4">
                  <span aria-hidden="true" className="size-1.5 bg-accent-500" />
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex items-end justify-between gap-2 p-3 sm:p-5">
                  <div className="min-w-0">
                    <h2 className="font-display text-[0.95rem] font-semibold leading-tight sm:text-[1.15rem]">{p.title}</h2>
                    <p className="mt-1 line-clamp-2 text-[0.72rem] leading-snug text-white/75 sm:text-[0.82rem]">
                      {p.text}
                    </p>
                    <span
                      aria-hidden="true"
                      className="mt-3 block h-0.5 w-8 rounded-full bg-accent-500 motion-safe:transition-[width] motion-safe:duration-300 group-hover:w-14"
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute end-3 top-3 inline-flex size-7 shrink-0 items-center sm:static justify-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-sm motion-safe:transition-colors group-hover:bg-accent-500 group-hover:ring-accent-400 sm:size-9"
                  >
                    <ArrowIcon className="size-3 motion-safe:transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 sm:size-3.5" />
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
          <div className="mb-6 flex items-end justify-between gap-4">
            <Heading eyebrow="In stock" subtitle="Used equipment currently available from our yards.">
              Latest Stock
            </Heading>
            <Link
              href="/used-equipment"
              className={buttonClasses({ variant: "outline", size: "sm", className: "mb-1 shrink-0" })}
            >
              View all
              <ArrowIcon className="size-3.5" />
            </Link>
          </div>
          <ListingGrid items={latest} />
        </Container>
      ) : null}

      {/* Who we are */}
      <AboutIntro />

      {/* What we do */}
      <Container className="pt-12">
        <Heading eyebrow="What we do" subtitle="Buying and selling scrap, locally and internationally." className="mb-6">
          Our Services
        </Heading>
        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, text }, i) => (
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
        </ul>
      </Container>

      {/* What we buy & sell */}
      <Container className="pt-12">
        <section
          aria-labelledby="materials-heading"
          className="relative isolate overflow-hidden rounded-xl bg-steel-950 text-white shadow-panel ring-1 ring-white/10"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgb(31_157_85/0.16),transparent_55%)] rtl:bg-[radial-gradient(ellipse_at_top_left,rgb(31_157_85/0.16),transparent_55%)]"
          />
          <div className="flex flex-col gap-6 border-b border-white/10 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between lg:p-10">
            <div>
              <p className="mb-2 font-ui text-xs font-semibold uppercase tracking-[0.18em] text-accent-400">Materials</p>
              <h2
                id="materials-heading"
                className="font-display text-[1.7rem] font-bold leading-[1.1] tracking-[-0.02em] text-balance sm:text-[2.15rem]"
              >
                What We Buy &amp; Sell
              </h2>
              <span aria-hidden="true" className="mt-3 block h-1 w-12 rounded-full bg-accent-500" />
              <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-white/70">
                All used and unused ferrous and non-ferrous metals, surplus materials, heavy equipment and selected plastic
                scrap, in bulk and by container.
              </p>
            </div>
            <div className="shrink-0 rounded-lg bg-white/5 p-4 ring-1 ring-white/10 lg:max-w-xs">
              <p className="text-sm font-semibold">Don&apos;t see your material?</p>
              <p className="mt-0.5 text-xs text-white/60">Send us a photo and the quantity for a quote.</p>
              <ButtonLink
                href={whatsappUrl("Hi Rayanco, I have material to sell. Here is a photo:")}
                external
                size="sm"
                variant="primary"
                className="mt-3 w-full"
              >
                <WhatsAppIcon className="size-4" />
                Send a photo on WhatsApp
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-6">
            {materialGroups.map(({ key, title, href, items }) => {
              const Icon = materialIcons[key];
              // Desktop: three groups on row 1, then structural (wide) + equipment. Tablet: structural goes last, full width.
              const wide = key === "structural";
              const span = wide ? "lg:col-span-4" : "lg:col-span-2";
              return (
                <div
                  key={key}
                  className={`bg-steel-950 p-6 sm:p-7 ${span} ${wide ? "sm:order-last sm:col-span-2 lg:order-none" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-accent-400/40">
                      <Icon className="size-5 text-accent-400" />
                    </span>
                    <h3 className="min-w-0 flex-1 font-display text-base font-semibold leading-tight">
                      <Link href={href} className="hover:text-accent-400">
                        {title}
                      </Link>
                    </h3>
                    <span className="font-ui text-xs font-semibold tabular-nums tracking-wider text-white/40">
                      {String(items.length).padStart(2, "0")}
                    </span>
                  </div>
                  <ul
                    className={`mt-5 grid grid-cols-2 gap-x-6 text-sm text-white/80 ${
                      wide ? "lg:grid-cols-3" : "sm:grid-cols-1"
                    }`}
                  >
                    {items.map((m) => (
                      <li key={m} className="flex items-start gap-2.5 border-t border-white/[0.07] py-2">
                        <span aria-hidden="true" className="mt-[0.45rem] size-1.5 shrink-0 bg-accent-500" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 border-t border-white/10 px-6 py-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
            <p className="text-white/60">Plus selected plastic scrap and metal scrap shredding.</p>
            <Link href="/products" className="inline-flex items-center gap-1.5 font-bold text-accent-400 hover:underline">
              See our full product line
              <ArrowIcon className="size-3.5" />
            </Link>
          </div>
        </section>
      </Container>

      <CtaBand
        text="Have scrap or equipment to sell? Contact our team and we will make you an offer or list it for you."
        whatsappText="Hi Rayanco, I have scrap / equipment to sell."
      />

      {/* Clients */}
      <Container>
        <Heading eyebrow="Trusted by" subtitle="Some of our esteemed clients." className="mb-6">
          Our Clients
        </Heading>
        <LogoGrid logos={clients} width={250} height={100} altSuffix=" logo" />
      </Container>

      {/* Certifications */}
      <CertificationsBand />
    </>
  );
}
