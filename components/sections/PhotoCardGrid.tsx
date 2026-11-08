import Image from "next/image";
import { WhatsAppIcon } from "@/components/icons";
import type { CatalogItem } from "@/content/catalog";
import { whatsappUrl } from "@/lib/site";

const COLS = {
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
} as const;

const SIZES = {
  3: "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw",
  4: "(min-width: 1024px) 300px, (min-width: 640px) 33vw, 50vw",
} as const;

/** Full-bleed photo cards with a navy fade, accent bar, name and description. */
export function PhotoCardGrid({
  items,
  columns = 3,
  numbered = false,
  quote = false,
  headingLevel = 3,
}: {
  items: CatalogItem[];
  /** 3: one column on mobile, roomy cards. 4: two columns on mobile, compact cards. */
  columns?: 3 | 4;
  /** Show a 01, 02… badge in the top corner. */
  numbered?: boolean;
  /** Add a WhatsApp "Quote" link to each card. */
  quote?: boolean;
  headingLevel?: 2 | 3;
}) {
  const Name = `h${headingLevel}` as const;
  const compact = columns === 4;
  // A 3-item compact grid fills the row at 3 columns instead of leaving an empty 4th slot.
  const cols = compact && items.length === 3 ? "grid-cols-2 sm:grid-cols-3" : COLS[columns];

  return (
    <ul className={`grid sm:gap-5 ${compact ? "gap-3" : "gap-4"} ${cols}`}>
      {items.map((item, i) => (
        <li
          key={item.image}
          className={`group relative isolate flex flex-col justify-end overflow-hidden rounded-xl bg-steel-950 shadow-panel ring-1 ring-steel-900/10 motion-safe:transition motion-safe:duration-300 hover:-translate-y-1 hover:shadow-float ${
            compact ? "aspect-[3/4] sm:aspect-[4/5]" : "aspect-[4/3]"
          } ${
            // Odd last card in the 2-column mobile grid spans the row instead of leaving an empty slot.
            compact && items.length % 2 === 1 && i === items.length - 1 ? "max-sm:col-span-2 max-sm:aspect-[16/9]" : ""
          }`}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes={SIZES[columns]}
            className="-z-20 object-cover motion-safe:transition-transform motion-safe:duration-700 group-hover:scale-110"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-steel-950 from-5% via-steel-950/55 via-45% to-transparent"
          />
          {numbered ? (
            <span
              aria-hidden="true"
              className="absolute start-4 top-4 inline-flex h-7 items-center rounded-full bg-steel-950/55 px-2.5 font-display text-xs font-bold tabular-nums text-white ring-1 ring-white/20 backdrop-blur-sm"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          ) : null}
          {quote ? (
            <a
              href={whatsappUrl(`Hi Rayanco, I'd like a quote for ${item.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute end-2.5 top-2.5 inline-flex h-8 items-center gap-1.5 rounded-full bg-steel-950/60 px-2.5 text-xs font-bold text-white ring-1 ring-white/20 backdrop-blur-sm motion-safe:transition-colors hover:bg-accent-500 hover:ring-accent-400 focus-visible:bg-accent-500 sm:end-3 sm:top-3 sm:px-3"
            >
              <WhatsAppIcon className="size-3.5 shrink-0" />
              Quote
              <span className="sr-only"> for {item.name} on WhatsApp</span>
            </a>
          ) : null}
          <div className={compact ? "p-3.5 sm:p-5" : "p-5 sm:p-6"}>
            <span
              aria-hidden="true"
              className="mb-3 block h-1 w-8 rounded-full bg-accent-400 motion-safe:transition-all motion-safe:duration-300 group-hover:w-14"
            />
            <Name
              className={`font-display font-semibold leading-snug text-white ${compact ? "text-base sm:text-lg" : "text-lg"}`}
            >
              {item.name}
            </Name>
            <p
              className={`mt-1.5 leading-relaxed text-white/75 ${compact ? "text-xs sm:text-sm" : "text-sm"}`}
            >
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
