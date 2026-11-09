import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/i18n";

export const HERO_IMAGE = { src: "/assets/images/site/hero.webp", width: 968, height: 668 } as const;

type PageHeroProps = {
  locale: Locale;
  title: string;
  /** Part of the title to colour green (must appear in `title`). */
  accent?: string;
  /** Small pill above the H1. */
  eyebrow?: string;
  /** Breadcrumb trail after Home (locale-free hrefs); the last item is this page. */
  crumbs: Crumb[];
  /** Extra bottom padding so a floating card can overlap the hero. */
  overlap?: boolean;
  /** Extra meta row rendered under the H1 (e.g. location · ref). */
  meta?: ReactNode;
  /** Preload the background image (off when another image is the page's LCP, e.g. a listing photo). */
  preloadImage?: boolean;
  children?: ReactNode;
};

export function AccentTitle({ title, accent }: { title: string; accent?: string }) {
  const i = accent ? title.lastIndexOf(accent) : -1;
  if (!accent || i < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, i)}
      <span className="text-accent-400">{accent}</span>
      {title.slice(i + accent.length)}
    </>
  );
}

/** Inner-page header: dark image band with breadcrumbs, the page's single H1 and an intro. */
export function PageHero({
  locale,
  title,
  accent,
  eyebrow,
  crumbs,
  overlap = false,
  meta,
  preloadImage = true,
  children,
}: PageHeroProps) {
  return (
    <div className="relative isolate overflow-hidden bg-steel-950 text-white">
      <Image
        src={HERO_IMAGE.src}
        alt=""
        fill
        preload={preloadImage}
        sizes="100vw"
        className="-z-20 object-cover object-[center_60%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(13_30_40/0.94)_0%,rgb(13_30_40/0.8)_50%,rgb(13_30_40/0.55)_100%)] rtl:bg-[linear-gradient(270deg,rgb(13_30_40/0.94)_0%,rgb(13_30_40/0.8)_50%,rgb(13_30_40/0.55)_100%)]"
      />
      <Container className={`pt-6 sm:pt-8 ${overlap ? "pb-14 sm:pb-16" : "pb-10 sm:pb-12"}`}>
        <Breadcrumbs locale={locale} items={crumbs} tone="dark" className="mb-4" />
        {eyebrow ? (
          <p className="mb-3 inline-flex h-6 items-center rounded-full border border-accent-400/50 bg-accent-400/15 px-3 text-[0.65rem] font-bold uppercase tracking-wider text-accent-400">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-[2.15rem]">
          <AccentTitle title={title} accent={accent} />
        </h1>
        {meta ? <div className="mt-2.5 text-[0.8rem] text-white/85">{meta}</div> : null}
        {children ? <div className="mt-3 max-w-2xl text-[0.95rem] text-white/90">{children}</div> : null}
      </Container>
    </div>
  );
}
