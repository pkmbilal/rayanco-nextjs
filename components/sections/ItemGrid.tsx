import Image from "next/image";
import { CATALOG_IMAGE_SIZE, type CatalogItem } from "@/content/catalog";

/** Grid of catalogue items: real image + name + short description (so pages aren't image-only). */
export function ItemGrid({ items }: { items: CatalogItem[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item.image} className="overflow-hidden rounded-md bg-white shadow-card">
          <Image
            src={item.image}
            alt={item.name}
            width={CATALOG_IMAGE_SIZE}
            height={CATALOG_IMAGE_SIZE}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="aspect-square h-auto w-full object-cover"
          />
          <div className="p-3 sm:p-4">
            <h3 className="text-sm font-semibold leading-snug sm:text-[0.95rem]">{item.name}</h3>
            <p className="mt-1 text-xs text-steel-600 sm:text-sm">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
