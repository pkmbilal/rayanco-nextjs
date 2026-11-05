import { WhatsAppIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { getDictionary } from "@/lib/i18n";
import type { ListingCardData } from "@/lib/listings/queries";
import { whatsappUrl } from "@/lib/site";
import { ListingCard } from "./ListingCard";

export function ListingGrid({ items, priorityCount = 0 }: { items: ListingCardData[]; priorityCount?: number }) {
  if (items.length === 0) return <EmptyListings />;
  return (
    <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((l, i) => (
        <li key={l.id} className="flex">
          <ListingCard listing={l} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}

export function EmptyListings({ whatsappText }: { whatsappText?: string }) {
  const t = getDictionary().listings;
  return (
    <div className="rounded-lg border border-dashed border-steel-300 bg-steel-50 p-8 text-center">
      <p className="font-display text-2xl font-semibold uppercase">{t.emptyTitle}</p>
      <p className="mx-auto mt-2 max-w-xl text-steel-600">{t.emptyText}</p>
      <ButtonLink href={whatsappUrl(whatsappText ?? t.emptyWhatsapp)} external variant="whatsapp" className="mt-5">
        <WhatsAppIcon className="size-5" />
        {getDictionary().header.whatsapp}
      </ButtonLink>
    </div>
  );
}
