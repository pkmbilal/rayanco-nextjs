import Image from "next/image";
import { WhatsAppIcon } from "@/components/icons";
import { CATALOG_IMAGE_SIZE, type CatalogItem } from "@/content/catalog";
import { whatsappUrl } from "@/lib/site";

/** Grid of catalogue items: real image + name + short description (so pages aren't image-only) + a quote link. */
export function ItemGrid({
  items,
  headingLevel = 3,
  showQuote = true,
}: {
  items: CatalogItem[];
  /** Level of each item's name heading (3 under a visible group H2). */
  headingLevel?: 2 | 3;
  showQuote?: boolean;
}) {
  const Name = `h${headingLevel}` as const;

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
      {items.map((item) => (
        <li
          key={item.image}
          className="group flex flex-col overflow-hidden rounded-lg bg-white ring-1 ring-steel-200 transition duration-200 hover:-translate-y-0.5 hover:shadow-float hover:ring-steel-300 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          <div className="overflow-hidden bg-steel-100">
            <Image
              src={item.image}
              alt={item.name}
              width={CATALOG_IMAGE_SIZE}
              height={CATALOG_IMAGE_SIZE}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>
          <div className="flex flex-1 flex-col p-3 sm:p-4">
            <Name className="font-display text-[0.95rem] font-semibold leading-snug text-steel-950 sm:text-base">
              {item.name}
            </Name>
            <p className="mt-1 text-xs leading-relaxed text-steel-600 sm:text-sm">{item.description}</p>
            {showQuote ? (
              <a
                href={whatsappUrl(`Hi Rayanco, I'd like a quote for ${item.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 pt-3 text-xs font-bold text-accent-600 hover:text-accent-700 hover:underline sm:text-sm"
              >
                <WhatsAppIcon className="size-3.5 shrink-0" />
                Get a quote
                <span className="sr-only"> for {item.name} on WhatsApp</span>
              </a>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
