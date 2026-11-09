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
import { contactCopy } from "@/content/pages/services";
import { localePath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { fullAddress, site, whatsappUrl } from "@/lib/site";
import Link from "next/link";

const PATH = "/contact";

export function contactMetadata(locale: Locale) {
  const c = contactCopy[locale].meta;
  return pageMetadata({ locale, title: c.title, description: c.description, path: PATH });
}

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

// TODO(owner): confirm the exact Google Maps pin for the office.
const mapQuery = "Al-Hammam Commercial Centre, King Fahad Road, Dammam, Saudi Arabia";
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;

const topicDefs: { icon: IconType; href: string }[] = [
  { icon: RecycleIcon, href: "/sell-your-equipment" },
  { icon: IngotIcon, href: "/products" },
  { icon: GearIcon, href: "/used-equipment" },
  { icon: FactoryIcon, href: "/services/demolition" },
];

const glow =
  "absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgb(31_157_85/0.18),transparent_55%)] rtl:bg-[radial-gradient(ellipse_at_top_left,rgb(31_157_85/0.18),transparent_55%)]";

const hairline =
  "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent-400 via-accent-400/40 to-transparent rtl:bg-gradient-to-l";

export function ContactPage({ locale }: { locale: Locale }) {
  const c = contactCopy[locale];
  const waHref = whatsappUrl(c.whatsappText);
  const quick: { icon: IconType; label: string; value: string; hint: string; href: string; external?: boolean; ltr?: boolean }[] = [
    {
      icon: PhoneIcon,
      label: c.quick.callLabel,
      value: site.phones[0].display,
      hint: c.quick.callHint,
      href: `tel:${site.phones[0].tel}`,
      ltr: true,
    },
    {
      icon: WhatsAppIcon,
      label: c.quick.whatsappLabel,
      value: c.quick.whatsappValue,
      hint: c.quick.whatsappHint,
      href: waHref,
      external: true,
    },
    {
      icon: MailIcon,
      label: c.quick.emailLabel,
      value: site.email,
      hint: c.quick.emailHint,
      href: `mailto:${site.email}`,
    },
  ];
  const topics = topicDefs.map((d, i) => ({ ...d, ...c.help.topics[i], href: localePath(locale, d.href) }));
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: c.jsonLdName,
    inLanguage: locale,
    url: absoluteUrl(localePath(locale, PATH)),
    about: { "@id": absoluteUrl("/#organization") },
  };

  return (
    <>
      <JsonLd data={contactJsonLd} />

      <PageHero
        locale={locale}
        title={c.hero.title}
        accent={c.hero.accent}
        eyebrow={c.hero.eyebrow}
        overlap
        crumbs={[{ name: c.hero.crumb, href: PATH }]}
      >
        <p>{c.hero.text}</p>
        <p className="mt-3 flex items-center gap-1.5 text-[0.8rem] font-medium text-white/75">
          <ShieldCheckIcon className="size-4 shrink-0 text-accent-400" />
          {c.hero.since}
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
            <p className="font-ui text-xs font-semibold uppercase tracking-[0.18em] text-accent-400">{c.office.eyebrow}</p>
            <h2 id="office-title" className="mt-2 font-display text-[1.6rem] font-bold leading-tight tracking-tight">
              {c.office.title}
            </h2>
            <span aria-hidden="true" className="mt-3 block h-1 w-12 rounded-full bg-accent-400" />

            <address className="mt-6 space-y-5 not-italic">
              <div className="flex gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/15">
                  <MapPinIcon className="size-[1.1rem] text-accent-400" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/55">{c.office.address}</p>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-white/90">{fullAddress(locale)}</p>
                </div>
              </div>
              <div className="flex gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/15">
                  <PhoneIcon className="size-[1.1rem] text-accent-400" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/55">{c.office.phone}</p>
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
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/55">{c.office.email}</p>
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
                <ButtonLink href={waHref} external variant="whatsapp">
                  <WhatsAppIcon className="size-5" />
                  {c.office.whatsapp}
                </ButtonLink>
                <ButtonLink href={mapsUrl} external variant="secondary" className="text-white">
                  <MapPinIcon className="size-5" />
                  {c.office.maps}
                </ButtonLink>
              </div>
              <p className="mt-5 border-t border-white/10 pt-4 text-sm text-white/65">
                {c.office.serving}
              </p>
            </div>
          </section>

          <section
            aria-labelledby="form-title"
            className="relative overflow-hidden rounded-xl bg-white p-6 shadow-panel ring-1 ring-steel-200 sm:p-8"
          >
            <span aria-hidden="true" className={hairline} />
            <Heading eyebrow={c.form.eyebrow} subtitle={c.form.subtitle} className="mb-6">
              <span id="form-title">{c.form.title}</span>
            </Heading>
            {/* TODO(owner): confirm a typical response time to show here (e.g. "within one working day"). */}
            <EnquiryForm locale={locale} kind="contact" />
          </section>
        </div>
      </Container>

      {/* Map */}
      <Container className="pt-12">
        <Heading eyebrow={c.map.eyebrow} subtitle={c.map.subtitle} className="mb-6">
          {c.map.title}
        </Heading>
        <div className="relative overflow-hidden rounded-xl bg-steel-100 shadow-panel ring-1 ring-steel-200">
          <iframe
            src={mapEmbedUrl}
            title={c.map.iframeTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block aspect-[4/3] w-full border-0 sm:aspect-[16/7] lg:aspect-[3/1]"
          />
        </div>
      </Container>

      {/* Routing */}
      <section aria-labelledby="help-title" className="mt-12 bg-steel-50 py-10 sm:py-14">
        <Container>
          <Heading eyebrow={c.help.eyebrow} subtitle={c.help.subtitle} className="mb-6 sm:mb-8">
            <span id="help-title">{c.help.title}</span>
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
                    {c.help.learnMore}
                    <ArrowIcon className="size-4 motion-safe:transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CertificationsBand locale={locale} />
    </>
  );
}
