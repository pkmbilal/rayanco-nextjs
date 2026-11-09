import { Suspense } from "react";
import { MarketplaceResults, ResultsSkeleton } from "@/components/listings/MarketplaceResults";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { marketplaceCopy } from "@/content/pages/marketplace";
import { localePath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const PATH = "/used-equipment";

export function usedEquipmentMetadata(locale: Locale) {
  const c = marketplaceCopy[locale].index.meta;
  return pageMetadata({ locale, title: c.title, description: c.description, path: PATH });
}

export function UsedEquipmentPage({
  locale,
  searchParams,
}: {
  locale: Locale;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const c = marketplaceCopy[locale].index;
  return (
    <>
      <PageHero locale={locale} title={c.title} accent={c.accent} crumbs={[{ name: c.crumb, href: PATH }]} overlap>
        <p>{c.text}</p>
      </PageHero>

      <Container>
        <Suspense fallback={<ResultsSkeleton />}>
          <MarketplaceResults locale={locale} searchParams={searchParams} basePath={localePath(locale, PATH)} />
        </Suspense>
      </Container>

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
