import type { ComponentType, SVGProps } from "react";
import {
  ArrowIcon,
  FactoryIcon,
  GearIcon,
  IngotIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  RecycleIcon,
  ShieldCheckIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { CertificationsBand } from "@/components/sections/CertificationsBand";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { absoluteUrl } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { fullAddress, site, whatsappUrl } from "@/lib/site";
import Link from "next/link";

const PATH = "/contact";

export const metadata = pageMetadata({
  title: "Contact Us – Scrap Buyer in Dammam & Jubail",
  description:
    "Contact Rayanco in Dammam, Saudi Arabia: call +966 50 974 7741, WhatsApp us or email sales@rayanco.com to sell scrap or buy metals and used equipment.",
  path: PATH,
});

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

// TODO(owner): confirm the exact Google Maps pin for the office.
const mapQuery = "Al-Hammam Commercial Centre, King Fahad Road, Dammam, Saudi Arabia";
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;

const quick: { icon: IconType; label: string; value: string; hint: string; href: string; external?: boolean; ltr?: boolean }[] = [
  {
    icon: PhoneIcon,
    label: "Call sales",
    value: site.phones[0].display,
    hint: "Tap to call",
    href: `tel:${site.phones[0].tel}`,
    ltr: true,
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "Send photos & details",
    hint: "Chat now",
    href: whatsappUrl("Hi Rayanco, I have an enquiry."),
    external: true,
  },
  {
    icon: MailIcon,
    label: "Email",
    value: site.email,
    hint: "Write to us",
    href: `mailto:${site.email}`,
  },
];

const topics: { icon: IconType; title: string; text: string; href: string }[] = [
  {
    icon: RecycleIcon,
    title: "Sell your scrap or equipment",
    text: "Send photos and the location, and we will make you an offer.",
    href: "/sell-your-equipment",
  },
  {
    icon: IngotIcon,
    title: "Buy metals & materials",
    text: "Ferrous and non-ferrous metal, stainless steel and surplus materials.",
    href: "/products",
  },
  {
    icon: GearIcon,
    title: "Used equipment",
    text: "Cranes, generators, excavators and more, available to buy.",
    href: "/used-equipment",
  },
  {
    icon: FactoryIcon,
    title: "Plant dismantling",
    text: "Dismantling and scrapping of non-functional plants and structures.",
    href: "/services/demolition",
  },
];

const glow =
  "absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgb(31_157_85/0.18),transparent_55%)] rtl:bg-[radial-gradient(ellipse_at_top_left,rgb(31_157_85/0.18),transparent_55%)]";

const hairline =
  "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent-400 via-accent-400/40 to-transparent rtl:bg-gradient-to-l";

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Rayanco",
  url: absoluteUrl(PATH),
  about: { "@id": absoluteUrl("/#organization") },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactJsonLd} />

      <PageHero title="Contact Us" accent="Us" eyebrow="Get in touch" overlap crumbs={[{ name: "Contact", href: PATH }]}>
        <p>Selling scrap or buying metal and equipment? Call, WhatsApp or send us a message.</p>
        <p className="mt-3 flex items-center gap-1.5 text-[0.8rem] font-medium text-white/75">
          <ShieldCheckIcon className="size-4 shrink-0 text-accent-400" />
          Since 1995 · ISO 9001 &amp; 14001 · ISRI member
        </p>
      </PageHero>

      {/* Quick contact */}
      <Container className="relative -mt-8">
        <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {quick.map(({ icon: Icon, label, value, hint, href, external, ltr }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group relative isolate flex h-full items-center gap-4 overflow-hidden rounded-lg bg-gradient-to-br from-steel-900 to-steel-950 p-5 text-white shadow-float ring-1 ring-white/10 motion-safe:transition motion-safe:duration-300 hover:-translate-y-0.5 hover:ring-accent-400/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
              >
                <span aria-hidden="true" className={`${hairline} opacity-60 group-hover:opacity-100`} />
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-accent-400/40 motion-safe:transition-colors group-hover:bg-accent-400/15">
                  <Icon className="size-5 text-accent-400" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-white/60">{label}</span>
                  <span
                    dir={ltr ? "ltr" : undefined}
                    className="mt-0.5 block truncate font-display text-[1.05rem] font-semibold leading-snug"
                  >
                    {value}
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-accent-400">
                    {hint}
                    <ArrowIcon className="size-3.5 motion-safe:transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>

      {/* Office + form */}
      <Container className="pt-12 sm:pt-14">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-6">
          <section
            aria-labelledby="office-title"
            className="relative isolate flex flex-col overflow-hidden rounded-xl bg-steel-950 p-6 text-white shadow-panel ring-1 ring-white/10 sm:p-8"
          >
            <div aria-hidden="true" className={glow} />
            <p className="font-ui text-xs font-semibold uppercase tracking-[0.18em] text-accent-400">Head office</p>
            <h2 id="office-title" className="mt-2 font-display text-[1.6rem] font-bold leading-tight tracking-tight">
              Rayanco, Dammam
            </h2>
            <span aria-hidden="true" className="mt-3 block h-1 w-12 rounded-full bg-accent-400" />

            <address className="mt-6 space-y-5 not-italic">
              <div className="flex gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/15">
                  <MapPinIcon className="size-[1.1rem] text-accent-400" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/55">Address</p>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-white/90">{fullAddress()}</p>
                </div>
              </div>
              <div className="flex gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/15">
                  <PhoneIcon className="size-[1.1rem] text-accent-400" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/55">Phone</p>
                  <ul className="mt-1 space-y-0.5">
                    {site.phones.map((p) => (
                      <li key={p.tel}>
                        <a
                          href={`tel:${p.tel}`}
                          dir="ltr"
                          className="text-[0.95rem] font-semibold text-white hover:text-accent-400"
                        >
                          {p.display}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/15">
                  <MailIcon className="size-[1.1rem] text-accent-400" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/55">Email</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1 inline-block text-[0.95rem] font-semibold text-white hover:text-accent-400"
                  >
                    {site.email}
                  </a>
                </div>
              </div>
              {/* TODO(owner): confirm office hours, then add an "Office hours" row here. */}
            </address>

            <div className="mt-auto pt-8">
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <ButtonLink href={whatsappUrl("Hi Rayanco, I have an enquiry.")} external variant="whatsapp">
                  <WhatsAppIcon className="size-5" />
                  WhatsApp us
                </ButtonLink>
                <ButtonLink href={mapsUrl} external variant="secondary" className="text-white">
                  <MapPinIcon className="size-5" />
                  Open in Google Maps
                </ButtonLink>
              </div>
              <p className="mt-5 border-t border-white/10 pt-4 text-sm text-white/65">
                Serving Dammam, Jubail and sites across Saudi Arabia.
              </p>
            </div>
          </section>

          <section
            aria-labelledby="form-title"
            className="relative overflow-hidden rounded-xl bg-white p-6 shadow-panel ring-1 ring-steel-200 sm:p-8"
          >
            <span aria-hidden="true" className={hairline} />
            <Heading eyebrow="Message us" subtitle="Fill in the form and our sales team will get back to you." className="mb-6">
              <span id="form-title">Send us a message</span>
            </Heading>
            {/* TODO(owner): confirm a typical response time to show here (e.g. "within one working day"). */}
            <EnquiryForm kind="contact" />
          </section>
        </div>
      </Container>

      {/* Map */}
      <Container className="pt-12">
        <Heading eyebrow="Find us" subtitle="Al-Hammam Commercial Centre, King Fahad Road, Dammam." className="mb-6">
          Our location
        </Heading>
        <div className="relative overflow-hidden rounded-xl bg-steel-100 shadow-panel ring-1 ring-steel-200">
          <iframe
            src={mapEmbedUrl}
            title="Map showing the Rayanco office in Dammam"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block aspect-[4/3] w-full border-0 sm:aspect-[16/7] lg:aspect-[3/1]"
          />
        </div>
      </Container>

      {/* Routing */}
      <section aria-labelledby="help-title" className="mt-12 bg-steel-50 py-10 sm:py-14">
        <Container>
          <Heading eyebrow="How can we help?" subtitle="Jump straight to what you need." className="mb-6 sm:mb-8">
            <span id="help-title">What are you looking for?</span>
          </Heading>
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {topics.map(({ icon: Icon, title, text, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-lg bg-white p-5 ring-1 ring-steel-200 motion-safe:transition motion-safe:duration-300 hover:-translate-y-0.5 hover:shadow-panel hover:ring-accent-500/40 sm:p-6"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-accent-500/10 ring-1 ring-accent-500/30">
                    <Icon className="size-5 text-accent-600" />
                  </span>
                  <h3 className="mt-4 font-display text-[1.05rem] font-semibold leading-snug text-steel-950">{title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-steel-600">{text}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-accent-600">
                    Learn more
                    <ArrowIcon className="size-4 motion-safe:transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CertificationsBand />
    </>
  );
}
