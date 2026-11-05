import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingContact } from "@/components/listings/ListingContact";
import { ListingEnquiryForm } from "@/components/listings/ListingEnquiryForm";
import { ListingGallery, type GalleryImage } from "@/components/listings/ListingGallery";
import { ListingGrid } from "@/components/listings/ListingGrid";
import { SpecTable } from "@/components/listings/SpecTable";
import { ViewTracker } from "@/components/listings/ViewTracker";
import { JsonLd } from "@/components/seo/JsonLd";
import { StatusBadge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { getDictionary } from "@/lib/i18n";
import { absoluteUrl, productJsonLd } from "@/lib/jsonld";
import { categoryPath, formatPrice, listingMetaTitle, listingPath, listingWhatsappText } from "@/lib/listings/format";
import { listingAlt, mediaUrl } from "@/lib/listings/media";
import { getListing, getPublicListingPaths, getSimilarListings, type ListingDetail } from "@/lib/listings/queries";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappUrl } from "@/lib/site";

// Listings published after the build render on demand. Blocking (not a streamed shell) so the
// first response is complete server HTML and unknown slugs get a real 404 status (SEO).
export const instant = false;

// Cache Components requires at least one param per segment; unknown slugs render on demand.
const PLACEHOLDER = "__none__";

export async function generateStaticParams({ params }: { params: { category: string } }) {
  const paths = await getPublicListingPaths();
  const slugs = paths.filter((p) => p.category === params.category).map((p) => ({ slug: p.slug }));
  return slugs.length ? slugs : [{ slug: PLACEHOLDER }];
}

function metaDescription(l: ListingDetail): string {
  const facts = [l.year, l.make, l.model, l.capacity].filter(Boolean).join(" ");
  const status = l.status === "sold" ? "Sold." : formatPrice(l) + ".";
  const text = l.description_en?.replace(/\s+/g, " ").trim();
  const base = `Used ${l.title_en}${facts ? ` (${facts})` : ""} for sale${l.location ? ` in ${l.location}` : ""}, Saudi Arabia. ${status} Ref ${l.ref_code}.`;
  const full = text ? `${base} ${text}` : `${base} Contact Rayanco on WhatsApp or phone.`;
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

async function load(params: PageProps<"/used-equipment/[category]/[slug]">["params"]) {
  const { category, slug } = await params;
  if (slug === PLACEHOLDER) return null;
  return getListing(category, slug);
}

export async function generateMetadata({ params }: PageProps<"/used-equipment/[category]/[slug]">): Promise<Metadata> {
  const l = await load(params);
  if (!l) return {};
  const cover = l.images[0];
  return pageMetadata({
    title: listingMetaTitle(l),
    description: metaDescription(l),
    path: listingPath(l.category.slug, l.slug),
    image: cover
      ? { url: mediaUrl(cover.r2_key), width: cover.width ?? 1600, height: cover.height ?? 1200, alt: cover.alt_text || listingAlt(l) }
      : undefined,
  });
}

export default async function ListingPage({ params }: PageProps<"/used-equipment/[category]/[slug]">) {
  const l = await load(params);
  if (!l) notFound();

  const t = getDictionary().listings;
  const path = listingPath(l.category.slug, l.slug);
  const url = absoluteUrl(path);
  const images = galleryImages(l);
  const similar = await getSimilarListings({ id: l.id, category: l.category });
  const isSold = l.status === "sold";

  return (
    <>
      <JsonLd
        data={productJsonLd({
          title: l.title_en,
          path,
          refCode: l.ref_code,
          description: l.description_en,
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

      <Container className="py-6 sm:py-10">
        <Breadcrumbs
          className="mb-6"
          items={[
            { name: "Used Equipment", href: "/used-equipment" },
            { name: l.category.name_en, href: categoryPath(l.category.slug) },
            { name: l.title_en, href: path },
          ]}
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <ListingGallery images={images} />
          </div>

          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={l.status} />
              <span className="text-sm text-steel-500">
                {t.ref} {l.ref_code}
              </span>
            </div>
            <Heading level={1} className="mt-3 [&_h1]:text-3xl [&_h1]:sm:text-4xl">
              {l.title_en}
            </Heading>
            {l.location || l.year ? (
              <p className="mt-2 text-steel-600">{[l.year, l.location].filter(Boolean).join(" · ")}</p>
            ) : null}

            {isSold ? (
              <div className="mt-6 rounded-lg border border-steel-200 bg-steel-50 p-4">
                <p className="text-steel-700">{t.soldNotice}</p>
                <a href="#similar" className="mt-3 inline-block font-semibold text-accent-600 hover:underline">
                  {t.seeSimilar} ↓
                </a>
              </div>
            ) : (
              <>
                <p className="mt-5 text-3xl font-bold text-steel-900">{formatPrice(l)}</p>
                {l.negotiable && !l.price_on_request && l.price_sar != null ? (
                  <p className="text-sm text-steel-500">{t.negotiable}</p>
                ) : null}
                {l.status === "reserved" ? (
                  <p className="mt-4 rounded-lg border border-warning/40 bg-warning/10 p-3 text-sm text-steel-800">
                    {t.reservedNotice}
                  </p>
                ) : null}
                <div className="mt-6">
                  <ListingContact
                    listingId={l.id}
                    whatsappHref={whatsappUrl(listingWhatsappText(l, url))}
                    phone={site.phones[0]}
                    shareUrl={url}
                    shareTitle={l.title_en}
                  />
                </div>
              </>
            )}

            <h2 className="mt-8 font-display text-xl font-semibold uppercase">{t.specs}</h2>
            <div className="mt-2">
              <SpecTable listing={l} />
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {l.description_en ? (
            <section className="lg:col-span-7">
              <h2 className="font-display text-2xl font-semibold uppercase">{t.description}</h2>
              <div className="mt-3 space-y-3 whitespace-pre-line text-steel-700">{l.description_en}</div>
            </section>
          ) : null}
          {!isSold ? (
            <section className={l.description_en ? "lg:col-span-5" : "lg:col-span-7"}>
              <h2 className="font-display text-2xl font-semibold uppercase">{t.enquiryHeading}</h2>
              <div className="mt-4">
                <ListingEnquiryForm
                  listingId={l.id}
                  defaultMessage={`I'm interested in ${l.title_en} (Ref ${l.ref_code}).`}
                />
              </div>
            </section>
          ) : null}
        </div>
      </Container>

      <Section tone="muted" id="similar" className="scroll-mt-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <Heading level={2}>{isSold ? t.seeSimilar : t.similar}</Heading>
          <Link href={categoryPath(l.category.slug)} className="shrink-0 font-semibold text-accent-600 hover:underline">
            {t.viewAll} {l.category.name_en} →
          </Link>
        </div>
        <ListingGrid items={similar} />
      </Section>
    </>
  );
}
