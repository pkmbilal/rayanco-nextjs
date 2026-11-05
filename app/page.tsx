import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";
import { CtaBand } from "@/components/sections/CtaBand";
import { LogoGrid } from "@/components/sections/LogoGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { materials } from "@/content/catalog";
import { getDictionary } from "@/lib/i18n";
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

const paths = [
  { href: "/products/non-ferrous-metals", title: "Non-Ferrous Metals", text: "Copper, aluminium, brass, bronze, lead, zinc and more." },
  { href: "/products/metal-scrap-surplus", title: "Metal Scrap & Surplus", text: "Beams, coils, MS and seamless pipe, plate and carbon steel." },
  { href: "/used-equipment", title: "Used Equipment", text: "Cranes, generators, excavators, loaders and more, for sale." },
  { href: "/services/demolition", title: "Demolition", text: "Dismantling and scrapping of non-functional plants." },
];

export default function Home() {
  const t = getDictionary();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-steel-900 text-white">
        <Image
          src="/assets/images/Hero_bg.webp"
          alt=""
          fill
          preload
          sizes="100vw"
          className="-z-10 object-cover opacity-30"
        />
        <Container className="py-20 sm:py-32">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-500">Since 1995 · Jubail &amp; Dammam</p>
          <h1 className="max-w-3xl font-display text-4xl font-semibold uppercase leading-tight sm:text-6xl">
            Scrap Buyer in Jubail, Saudi Arabia
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-steel-200">
            Rayanco is the largest scrap buyer in Jubail, Saudi Arabia, trading ferrous and non-ferrous metal in bulk and
            containers, locally and internationally, since 1995.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={whatsappUrl("Hi, I'd like to sell scrap to Rayanco.")} external size="lg" variant="whatsapp">
              <WhatsAppIcon className="size-5" />
              {t.cta.sellScrap}
            </ButtonLink>
            <ButtonLink href="/used-equipment" size="lg" variant="secondary" className="text-white">
              {t.cta.browseEquipment}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Heading eyebrow="Who we are">The largest scrap buyer in Jubail</Heading>
          <div className="space-y-4 text-lg text-steel-700">
            <p>
              Rayanco is the largest scrap buyer in Jubail, Saudi Arabia. We are involved in the bulk and container trade of
              ferrous and non-ferrous metal, local as well as international, since 1995.
            </p>
            <p>
              We have enduring trade ties with reputed suppliers across the UK, USA, Canada, Denmark, Russia, Dubai, several
              African countries and India, and we supply more than 20 steel-producing companies.
            </p>
            <p>We are also active in the dismantling and scrapping of non-functional plants.</p>
            <Link href="/about" className="inline-block font-semibold text-accent-600 hover:underline">
              More about Rayanco →
            </Link>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <Heading eyebrow="What we do" className="mb-10">
          Buying and selling scrap
        </Heading>
        <ul className="grid gap-6 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.title} className="rounded-lg border-s-4 border-accent-500 bg-white p-6 shadow-sm">
              <h3 className="font-display text-xl font-semibold uppercase">{s.title}</h3>
              <p className="mt-2 text-steel-600">{s.text}</p>
            </li>
          ))}
        </ul>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {paths.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="block h-full rounded-lg bg-steel-900 p-5 text-white transition-colors hover:bg-steel-800"
              >
                <span className="font-display text-lg font-semibold uppercase">{p.title} →</span>
                <span className="mt-1 block text-sm text-steel-300">{p.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <Heading eyebrow="Main activities" className="mb-4">
          Used &amp; unused metals we buy and sell
        </Heading>
        <p className="mb-8 max-w-3xl text-steel-600">
          We buy and sell all used and unused ferrous and non-ferrous metals, surplus materials and heavy equipment,
          including:
        </p>
        <ul className="flex flex-wrap gap-2">
          {materials.map((m) => (
            <li key={m} className="rounded-full border border-steel-200 bg-steel-50 px-3 py-1 text-sm text-steel-800">
              {m}
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link href="/products" className="font-semibold text-accent-600 hover:underline">
            See our full product line →
          </Link>
        </p>
      </Section>

      <Section tone="dark">
        <div className="max-w-3xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-500">News</p>
          <h2 className="font-display text-3xl font-semibold uppercase sm:text-4xl">
            Building Saudi Arabia&apos;s first EAF steel billet plant
          </h2>
          <p className="mt-4 text-steel-300">
            Rayanco is building Saudi Arabia&apos;s first electric arc furnace (EAF) steel billet plant in Dammam, turning
            recycled scrap into new steel billets in the Kingdom.
          </p>
          {/* TODO(owner): add timeline, capacity and a photo for the EAF plant announcement. */}
        </div>
      </Section>

      <Section>
        <Heading eyebrow="Certifications" className="mb-8">
          Certified quality and compliance
        </Heading>
        <LogoGrid logos={certifications} width={250} height={150} altSuffix=" certification" />
      </Section>

      <Section tone="muted">
        <Heading eyebrow="Clients" className="mb-8">
          Some of our esteemed clients
        </Heading>
        <LogoGrid logos={clients} width={250} height={100} altSuffix=" logo" />
      </Section>

      <CtaBand />
    </>
  );
}
