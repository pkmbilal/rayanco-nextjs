import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { FactoryIcon, MapPinIcon, ScaleIcon, ShredderIcon, SortIcon, TruckIcon } from "@/components/icons";
import { CertificationsBand } from "@/components/sections/CertificationsBand";
import { CtaBand } from "@/components/sections/CtaBand";
import { LogoGrid } from "@/components/sections/LogoGrid";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { aboutCopy } from "@/content/pages/about";
import { getDictionary, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { clients } from "@/lib/site";

export function aboutMetadata(locale: Locale) {
  const c = aboutCopy[locale].meta;
  return pageMetadata({ locale, title: c.title, description: c.description, path: "/about" });
}

// Copy drawn only from the existing About and Services text; no new claims.
const stepIcons: ComponentType<SVGProps<SVGSVGElement>>[] = [TruckIcon, ScaleIcon, SortIcon, ShredderIcon, FactoryIcon];

const glow =
  "absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgb(31_157_85/0.16),transparent_55%)] rtl:bg-[radial-gradient(ellipse_at_top_left,rgb(31_157_85/0.16),transparent_55%)]";

export function AboutPage({ locale }: { locale: Locale }) {
  const c = aboutCopy[locale];
  const t = getDictionary(locale);
  return (
    <>
      <PageHero
        locale={locale}
        title={c.hero.title}
        accent={c.hero.accent}
        eyebrow={c.hero.eyebrow}
        crumbs={[{ name: c.hero.crumb, href: "/about" }]}
      >
        <p>{c.hero.text}</p>
      </PageHero>

      {/* Our story */}
      <Container className="pt-12 sm:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div>
            <Heading eyebrow={c.story.eyebrow}>{c.story.title}</Heading>
            <p className="mt-6 text-lg leading-relaxed text-steel-900">
              {c.story.lead}
            </p>
            <div className="mt-3 space-y-3 text-[0.95rem] leading-relaxed text-steel-700">
              <p>{c.story.body1}</p>
              <p>{c.story.body2(c.story.branches.join(c.story.branchSeparator))}</p>
            </div>

            <div className="mt-6">
              <p className="flex items-center gap-1.5 font-ui text-xs font-semibold uppercase tracking-[0.14em] text-steel-600">
                <MapPinIcon className="size-4 text-accent-600" />
                {c.story.branchesLabel}
              </p>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {c.story.branches.map((b) => (
                  <li
                    key={b}
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-steel-800 ring-1 ring-steel-200"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -end-3 -top-3 hidden h-2/3 w-2/3 rounded-lg bg-accent-500/15 lg:block"
            />
            <div className="relative overflow-hidden rounded-lg bg-steel-950 shadow-panel">
              {/* TODO(owner): replace with a real Rayanco yard photo. */}
              <Image
                src="/assets/images/Hero_bg.webp"
                alt={c.story.imageAlt}
                width={2560}
                height={1709}
                sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, 100vw"
                className="aspect-[16/10] h-auto w-full object-cover object-[70%_center] lg:aspect-[5/4]"
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

      {/* How we work */}
      <Container className="pt-12">
        <Heading eyebrow={c.how.eyebrow} subtitle={c.how.subtitle} className="mb-6">
          {c.how.title}
        </Heading>
        <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
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

      {/* Vision */}
      <Container className="pt-12">
        <section
          aria-labelledby="vision-heading"
          className="relative isolate overflow-hidden rounded-xl bg-steel-950 p-6 text-white shadow-panel ring-1 ring-white/10 sm:p-8 lg:p-12"
        >
          <div aria-hidden="true" className={glow} />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] lg:gap-12">
            <div>
              <p className="mb-2 font-ui text-xs font-semibold uppercase tracking-[0.18em] text-accent-400">{c.vision.eyebrow}</p>
              <h2
                id="vision-heading"
                className="font-display text-[1.7rem] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[2.15rem]"
              >
                {c.vision.title}
              </h2>
              <span aria-hidden="true" className="mt-3 block h-1 w-12 rounded-full bg-accent-500" />
            </div>
            <blockquote className="border-s-2 border-accent-500/60 ps-5 font-display text-xl font-medium leading-snug text-white/90 sm:ps-7 sm:text-2xl">
              {c.vision.text}
            </blockquote>
          </div>
        </section>
      </Container>

      {/* Clients */}
      <Container className="pt-12">
        <Heading eyebrow={c.clients.eyebrow} subtitle={c.clients.subtitle} className="mb-6">
          {c.clients.title}
        </Heading>
        <LogoGrid logos={clients} width={250} height={100} altSuffix={t.clients.altSuffix} />
      </Container>

      <CertificationsBand locale={locale} />

      <CtaBand locale={locale} />
    </>
  );
}
