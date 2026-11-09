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
import { PhotoCardGrid } from "@/components/sections/PhotoCardGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import type { CatalogItem } from "@/content/catalog";
import { absoluteUrl } from "@/lib/jsonld";
import { demolitionCopy } from "@/content/pages/services";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { clients } from "@/lib/site";

const PATH = "/services/demolition";

export function demolitionMetadata(locale: Locale) {
  const c = demolitionCopy[locale].meta;
  return pageMetadata({ locale, title: c.title, description: c.description, path: PATH });
}

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

// TODO(owner): confirm scope (safety certifications, equipment fleet, past projects) to strengthen this page.
const stepIcons: IconType[] = [MapPinIcon, ScaleIcon, GearIcon, TruckIcon];

const P = "/assets/images/Products";
const scopeImages = [
  `${P}/Panel_Boards.webp`,
  `${P}/Iron_Beems.webp`,
  `${P}/Big_Pipes.webp`,
  `${P}/Generators.webp`,
  `${P}/Adjustable_Base_Jack.webp`,
  `${P}/Office_Portable_Cabins.webp`,
];

const benefitIcons: IconType[] = [ScaleIcon, SortIcon, RecycleIcon];

const glow =
  "absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgb(31_157_85/0.16),transparent_55%)] rtl:bg-[radial-gradient(ellipse_at_top_left,rgb(31_157_85/0.16),transparent_55%)]";

export function DemolitionPage({ locale }: { locale: Locale }) {
  const c = demolitionCopy[locale];
  const t = getDictionary(locale);
  const scope: CatalogItem[] = c.scope.items.map((item, i) => ({ ...item, image: scopeImages[i] }));
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.jsonLd.name,
    serviceType: c.jsonLd.serviceType,
    description: c.jsonLd.description,
    inLanguage: locale,
    url: absoluteUrl(localePath(locale, PATH)),
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: { "@type": "Country", name: c.jsonLd.country },
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />

      <PageHero
        locale={locale}
        title={c.hero.title}
        accent={c.hero.accent}
        eyebrow={c.hero.eyebrow}
        crumbs={[{ name: c.hero.crumb, href: PATH }]}
      >
        <p>{c.hero.text}</p>
        <p className="mt-3 flex items-center gap-1.5 text-[0.8rem] font-medium text-white/75">
          <ShieldCheckIcon className="size-4 shrink-0 text-accent-400" />
          {c.hero.since}
        </p>
      </PageHero>

      {/* Intro */}
      <Container className="pt-12 sm:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div>
            <Heading eyebrow={c.intro.eyebrow}>{c.intro.title}</Heading>
            <p className="mt-6 text-lg leading-relaxed text-steel-900">
              {c.intro.lead}
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-steel-700">
              {c.intro.body}
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
                alt={c.intro.imageAlt}
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
          {c.facts.map((f, i) => (
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
        <Heading eyebrow={c.how.eyebrow} subtitle={c.how.subtitle} className="mb-6">
          {c.how.title}
        </Heading>
        <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {c.how.steps.map(({ title, text }, i) => {
            const Icon = stepIcons[i];
            return (
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
            );
          })}
        </ol>
      </Container>

      {/* What we dismantle */}
      <section aria-labelledby="scope-title" className="mt-12 bg-steel-50 py-10 sm:py-14">
        <Container>
          <Heading eyebrow={c.scope.eyebrow} subtitle={c.scope.subtitle} className="mb-6 sm:mb-8">
            <span id="scope-title">{c.scope.title}</span>
          </Heading>
          <PhotoCardGrid locale={locale} items={scope} numbered />
        </Container>
      </section>

      {/* Benefits */}
      <Container className="pt-12">
        <Heading eyebrow={c.benefitsEyebrow} className="mb-6">
          {c.benefitsTitle}
        </Heading>
        <ul className="grid gap-3 sm:gap-4 md:grid-cols-3">
          {c.benefits.map(({ title, text }, i) => {
            const Icon = benefitIcons[i];
            return (
            <li key={title} className="flex gap-4 rounded-lg bg-white p-5 ring-1 ring-steel-200 sm:p-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-500/10 ring-1 ring-accent-500/30">
                <Icon className="size-5 text-accent-600" />
              </span>
              <div>
                <h3 className="font-display text-[1.05rem] font-semibold leading-snug text-steel-950">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-steel-600">{text}</p>
              </div>
            </li>
            );
          })}
        </ul>
      </Container>

      {/* Clients */}
      <Container className="pt-12">
        <Heading eyebrow={c.clients.eyebrow} subtitle={c.clients.subtitle} className="mb-6">
          {c.clients.title}
        </Heading>
        <LogoGrid logos={clients} width={250} height={100} altSuffix={t.clients.altSuffix} />
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
