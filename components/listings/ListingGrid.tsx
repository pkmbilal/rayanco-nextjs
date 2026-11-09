import { WhatsAppIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { getDictionary, type Locale } from "@/lib/i18n";
import type { ListingCardData } from "@/lib/listings/queries";
import { whatsappUrl } from "@/lib/site";
import { ListingCard } from "./ListingCard";

const gridCols = {
  3: "sm:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
} as const;

export function ListingGrid({
  locale,
  items,
  priorityCount = 0,
  columns = 4,
}: {
  locale: Locale;
  items: ListingCardData[];
  priorityCount?: number;
  /** 3 beside the filter sidebar, 4 for full-width strips. */
  columns?: keyof typeof gridCols;
}) {
  if (items.length === 0) return <EmptyListings locale={locale} />;
  return (
    <ul className={`grid gap-3 sm:gap-4 ${gridCols[columns]}`}>
      {items.map((l, i) => (
        <li key={l.id} className="flex">
          <ListingCard locale={locale} listing={l} priority={i < priorityCount} compact={columns === 4} />
        </li>
      ))}
    </ul>
  );
}

export function EmptyListings({ locale, whatsappText }: { locale: Locale; whatsappText?: string }) {
  const dict = getDictionary(locale);
  const t = dict.listings;
  return (
    <div className="rounded-lg bg-steel-50 p-8 text-center sm:p-10">
      <p className="font-display text-xl font-bold">{t.emptyTitle}</p>
      <p className="mx-auto mt-2 max-w-xl text-sm text-steel-700">{t.emptyText}</p>
      <ButtonLink href={whatsappUrl(whatsappText ?? t.emptyWhatsapp)} external variant="whatsapp" className="mt-5">
        <WhatsAppIcon className="size-4" />
        {dict.header.whatsapp}
      </ButtonLink>
    </div>
  );
}
