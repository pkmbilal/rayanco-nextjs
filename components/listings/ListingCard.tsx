import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, MapPinIcon } from "@/components/icons";
import { StatusBadge } from "@/components/ui/Badge";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { categoryName, formatPrice, listingLocation, listingPath, listingTitle } from "@/lib/listings/format";
import { listingAlt, mediaUrl } from "@/lib/listings/media";
import type { ListingCardData } from "@/lib/listings/queries";

export function ListingCard({
  locale,
  listing,
  priority = false,
  compact = false,
}: {
  locale: Locale;
  listing: ListingCardData;
  priority?: boolean;
  /** Smaller card for 4-up strips (home, similar): no condition pill or "View details" button. */
  compact?: boolean;
}) {
  const dict = getDictionary(locale);
  const t = dict.listings;
  const cover = listing.cover;
  const href = localePath(locale, listingPath(listing.category.slug, listing.slug));
  const title = listingTitle(locale, listing);
  const sold = listing.status === "sold";

  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-md bg-white shadow-card transition-shadow hover:shadow-[0_6px_18px_rgb(11_34_54/0.16)]">
      <div className="relative aspect-[4/3] bg-steel-100">
        {cover ? (
          <Image
            src={mediaUrl(cover.thumb_key ?? cover.r2_key)}
            alt={cover.alt_text || listingAlt(listing)}
            fill
            preload={priority}
            loading={priority ? "eager" : undefined}
            sizes="(min-width: 1280px) 300px, (min-width: 640px) 50vw, 100vw"
            className={`object-cover ${sold ? "opacity-70 grayscale" : ""}`}
          />
        ) : null}
        <StatusBadge locale={locale} status={listing.status} className="absolute start-2.5 top-2.5" />
        {!compact && listing.condition ? (
          <span className="absolute end-2.5 top-2.5 rounded-full bg-steel-950/80 px-2.5 py-1 text-[0.68rem] font-semibold leading-none text-white">
            {t.conditions[listing.condition]}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <p className="text-[0.65rem] font-bold uppercase tracking-wide text-accent-500">{categoryName(locale, listing.category)}</p>
        <h3 className="text-[0.85rem] font-semibold leading-snug">
          <Link href={href} className="after:absolute after:inset-0 group-hover:text-accent-600">
            {title}
          </Link>
        </h3>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[0.7rem] text-steel-600">
          {listing.location ? (
            <span className="inline-flex items-center gap-1">
              <MapPinIcon className="size-3 text-accent-500" />
              {listingLocation(locale, listing.location)}
            </span>
          ) : null}
          {listing.year ? <span>{listing.year}</span> : null}
          <span>
            {t.ref} {listing.ref_code}
          </span>
        </p>
        <div
          className={`mt-auto flex items-center justify-between gap-2 pt-2.5 ${compact ? "" : "border-t border-steel-100"}`}
        >
          <p className={`text-[0.85rem] font-bold ${sold ? "text-steel-500" : "text-accent-700"}`}>
            {/* TODO(owner): should sold listings still show their price? Hidden for now. */}
            {sold ? dict.status.sold : formatPrice(locale, listing)}
          </p>
          {!compact ? (
            <span className="inline-flex h-7 shrink-0 items-center gap-1 rounded-full border-[1.5px] border-accent-500 px-3 text-[0.68rem] font-bold">
              {t.viewDetails}
              <ArrowIcon className="size-3" />
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
