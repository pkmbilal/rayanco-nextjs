import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingContact } from "@/components/listings/ListingContact";
import { ListingEnquiryForm } from "@/components/listings/ListingEnquiryForm";
import { ListingGallery, type GalleryImage } from "@/components/listings/ListingGallery";
import { ListingGrid } from "@/components/listings/ListingGrid";
import { SpecTable } from "@/components/listings/SpecTable";
import { ViewTracker } from "@/components/listings/ViewTracker";
import { ArrowIcon, MapPinIcon } from "@/components/icons";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { StatusBadge } from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { marketplaceCopy } from "@/content/pages/marketplace";
import { getDictionary, localePath, pick, type Locale } from "@/lib/i18n";
import { absoluteUrl, productJsonLd } from "@/lib/jsonld";
import {
  categoryName,
  categoryPath,
  formatPrice,
  listingLocation,
  listingMetaTitle,
  listingPath,
  listingTitle,
  listingWhatsappText,
} from "@/lib/listings/format";
import { listingAlt, mediaUrl } from "@/lib/listings/media";
import { getListing, getPublicListingPaths, getSimilarListings, type ListingDetail } from "@/lib/listings/queries";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappUrl } from "@/lib/site";

// Cache Components requires at least one param per segment; unknown slugs render on demand.
const PLACEHOLDER = "__none__";

export async function listingStaticParams({ params }: { params: { category: string } }) {
  const paths = await getPublicListingPaths();
  const slugs = paths.filter((p) => p.category === params.category).map((p) => ({ slug: p.slug }));
  return slugs.length ? slugs : [{ slug: PLACEHOLDER }];
}

function description(locale: Locale, l: ListingDetail): string | null {
  return pick(locale, l.description_en, l.description_ar);
}

function metaDescription(locale: Locale, l: ListingDetail): string {
  const c = marketplaceCopy[locale].listing;
  const facts = [l.year, l.make, l.model, l.capacity].filter(Boolean).join(" ");
  const status = l.status === "sold" ? c.sold : formatPrice(locale, l) + ".";
  const text = description(locale, l)?.replace(/\s+/g, " ").trim();
  const base = c.metaDescription({
    title: listingTitle(locale, l),
    facts,
    location: l.location ? listingLocation(locale, l.location) : "",
    status,
    ref: l.ref_code,
  });
  const full = text ? `${base} ${text}` : `${base} ${c.contactFallback}`;
  return full.length > 160 ? `${full.slice(0, 157).replace(/\s+\S*$/, "")}…` : full;
}

function galleryImages(l: ListingDetail): GalleryImage[] {
  return l.images.map((img) => ({
    src: mediaUrl(img.r2_key),
    thumb: mediaUrl(img.thumb_key ?? img.r2_key),
    width: img.width ?? 1600,
    height: img.height ?? 1200,
    alt: img.alt_text || listingAlt(l),
  }));
}

async function load(category: string, slug: string) {
  if (slug === PLACEHOLDER) return null;
  return getListing(category, slug);
}

export async function listingMetadata(locale: Locale, category: string, slug: string): Promise<Metadata> {
  const l = await load(category, slug);
  if (!l) return {};
  const cover = l.images[0];
  return pageMetadata({
    locale,
    title: listingMetaTitle(locale, l),
    description: metaDescription(locale, l),
    path: listingPath(l.category.slug, l.slug),
    image: cover
      ? { url: mediaUrl(cover.r2_key), width: cover.width ?? 1600, height: cover.height ?? 1200, alt: cover.alt_text || listingAlt(l) }
      : undefined,
  });
}

export async function ListingPage({ locale, category, slug }: { locale: Locale; category: string; slug: string }) {
  const l = await load(category, slug);
  if (!l) notFound();

  const dict = getDictionary(locale);
  const t = dict.listings;
  const title = listingTitle(locale, l);
  const catName = categoryName(locale, l.category);
  const desc = description(locale, l);
  const path = listingPath(l.category.slug, l.slug);
  const url = absoluteUrl(localePath(locale, path));
  const images = galleryImages(l);
  const similar = await getSimilarListings({ id: l.id, category: l.category });
  const isSold = l.status === "sold";

  return (
    <>
      <JsonLd
        data={productJsonLd({
          locale,
          title,
          path: localePath(locale, path),
          refCode: l.ref_code,
          description: desc,
          images: images.map((i) => i.src),
          make: l.make,
          model: l.model,
          year: l.year,
          condition: l.condition,
          priceSar: l.price_on_request ? null : l.price_sar,
          status: l.status,
        })}
      />
      <ViewTracker listingId={l.id} />

      <PageHero
        locale={locale}
        title={title}
        eyebrow={catName}
        preloadImage={false}
        crumbs={[
          { name: t.usedEquipment, href: "/used-equipment" },
          { name: catName, href: categoryPath(l.category.slug) },
          { name: title, href: path },
        ]}
        meta={
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {l.location ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPinIcon className="size-3.5 text-accent-400" />
                {listingLocation(locale, l.location)}, {t.country}
              </span>
            ) : null}
            {l.year ? <span>{l.year}</span> : null}
            <span>
              {t.ref}: {l.ref_code}
            </span>
          </span>
        }
      />

      <Container className="grid gap-6 pt-7 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-7">
        <div className="flex flex-col gap-6">
          <ListingGallery
            locale={locale}
            images={images}
            overlay={
              <>
                <StatusBadge locale={locale} status={l.status} className="pointer-events-none absolute start-3.5 top-3.5" />
                {l.condition ? (
                  <span className="pointer-events-none absolute end-3.5 top-3.5 rounded-full bg-steel-950/80 px-3 py-1.5 text-[0.7rem] font-semibold leading-none text-white">
                    {t.conditions[l.condition]}
                  </span>
                ) : null}
              </>
            }
          />

          {desc ? (
            <section>
              <Heading level={2} className="[&_h2]:text-xl">
                {t.description}
              </Heading>
              <div
                className="mt-3 space-y-3 whitespace-pre-line text-sm leading-relaxed text-steel-700"
                // English text shown on an Arabic page (no Arabic description yet) keeps its own direction.
                {...(locale === "ar" && !l.description_ar ? { dir: "ltr", lang: "en" } : {})}
              >
                {desc}
              </div>
            </section>
          ) : null}

          <section className="max-lg:order-last">
            <Heading level={2} className="[&_h2]:text-xl">
              {t.pickupHeading}
            </Heading>
            <ul className="mt-3 space-y-2 text-sm text-steel-700">
              {t.pickup.map((p) => (
                <li key={p} className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent-500" />
                  {p}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="flex flex-col gap-4">
          {isSold ? (
            <div className="rounded-xl border border-steel-100 bg-steel-50 p-4">
              <p className="text-sm text-steel-700">{t.soldNotice}</p>
              <a href="#similar" className="mt-3 inline-block text-sm font-bold text-accent-600 hover:underline">
                {t.seeSimilar} ↓
              </a>
            </div>
          ) : (
            <>
              <div className="flex items-end justify-between gap-4 rounded-xl border border-steel-100 bg-steel-50 px-4.5 py-4">
                <div>
                  <p className="text-[0.7rem] font-semibold text-steel-500">{t.askingPrice}</p>
                  <p className="mt-1 font-display text-2xl font-bold text-accent-700 sm:text-[1.6rem]">
                    {formatPrice(locale, l)}
                  </p>
                </div>
                {l.negotiable && !l.price_on_request && l.price_sar != null ? (
                  <p className="text-end text-[0.7rem] text-steel-500">{t.negotiable}</p>
                ) : null}
              </div>
              {l.status === "reserved" ? (
                <p className="rounded-xl border border-warning/40 bg-warning/10 p-3 text-sm text-steel-800">
                  {t.reservedNotice}
                </p>
              ) : null}
            </>
          )}

          <SpecTable locale={locale} listing={l} />

          {!isSold ? (
            <>
              <ListingContact
                locale={locale}
                listingId={l.id}
                whatsappHref={whatsappUrl(listingWhatsappText(locale, l, url))}
                phone={site.phones[0]}
                shareUrl={url}
                shareTitle={title}
              />
              <section id="enquire" className="rounded-xl border border-steel-100 bg-white p-5 shadow-panel">
                <h2 className="font-display text-lg font-bold">{t.enquiryHeading}</h2>
                <p className="mb-3 mt-1 text-xs text-steel-500">{t.enquirySubtitle}</p>
                <ListingEnquiryForm
                  locale={locale}
                  listingId={l.id}
                  defaultMessage={t.enquiryDefault(title, l.ref_code)}
                />
              </section>
            </>
          ) : null}
        </div>
      </Container>

      <Container id="similar" className="scroll-mt-24 py-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <Heading level={2} className="[&_h2]:text-[1.4rem]">
            {isSold ? t.seeSimilar : t.similar}
          </Heading>
          <Link
            href={localePath(locale, categoryPath(l.category.slug))}
            className={buttonClasses({ variant: "outline", size: "sm", className: "shrink-0" })}
          >
            {t.viewAll}
            <ArrowIcon className="size-3.5" />
          </Link>
        </div>
        <ListingGrid locale={locale} items={similar} />
      </Container>
    </>
  );
}
