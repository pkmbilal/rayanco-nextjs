import Image from "next/image";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/Badge";
import { getDictionary } from "@/lib/i18n";
import { formatPrice, listingPath } from "@/lib/listings/format";
import { listingAlt, mediaUrl } from "@/lib/listings/media";
import type { ListingCardData } from "@/lib/listings/queries";

export function ListingCard({ listing, priority = false }: { listing: ListingCardData; priority?: boolean }) {
  const t = getDictionary().listings;
  const cover = listing.cover;
  const href = listingPath(listing.category.slug, listing.slug);
  const meta = [listing.year, listing.location].filter(Boolean).join(" · ");

  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-lg border border-steel-100 bg-white transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] bg-steel-100">
        {cover ? (
          <Image
            src={mediaUrl(cover.thumb_key ?? cover.r2_key)}
            alt={cover.alt_text || listingAlt(listing)}
            fill
            preload={priority}
            loading={priority ? "eager" : undefined}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className={`object-cover ${listing.status === "sold" ? "opacity-70 grayscale" : ""}`}
          />
        ) : null}
        <StatusBadge status={listing.status} className="absolute start-3 top-3" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-steel-500">{listing.category.name_en}</p>
        <h3 className="mt-1 font-display text-xl font-semibold uppercase leading-tight">
          <Link href={href} className="after:absolute after:inset-0 group-hover:text-accent-600">
            {listing.title_en}
          </Link>
        </h3>
        {meta ? <p className="mt-1 text-sm text-steel-600">{meta}</p> : null}
        <p className="mt-auto pt-3 text-lg font-bold text-steel-900">
          {/* TODO(owner): should sold listings still show their price? Hidden for now. */}
          {listing.status === "sold" ? getDictionary().status.sold : formatPrice(listing)}
        </p>
        <p className="text-xs text-steel-400">
          {t.ref} {listing.ref_code}
        </p>
      </div>
    </article>
  );
}
