import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { ItemGrid } from "@/components/sections/ItemGrid";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { products } from "@/content/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Scrap Metal Products & Surplus Materials in Saudi Arabia",
  description:
    "Rayanco's product line: aluminium, copper, brass, nickel and ferrous scrap, pipes, beams, plates, rebars, cables, generators, containers and porta cabins in Jubail and Dammam.",
  path: "/products",
});

const subPages = [
  { href: "/products/non-ferrous-metals", title: "Non-Ferrous Metals" },
  { href: "/products/metal-scrap-surplus", title: "Metal Scrap & Surplus Materials" },
  { href: "/used-equipment", title: "Used Equipment" },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero title="Products" eyebrow="Our product line" crumbs={[{ name: "Products", href: "/products" }]}>
        <p>
          Our product line consists of the following scrap, surplus and used materials. We buy and sell in bulk and in
          containers, locally and internationally.
        </p>
      </PageHero>

      <Section>
        <nav aria-label="Product categories" className="mb-10 flex flex-wrap gap-3">
          {subPages.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-md border border-steel-200 px-4 py-2 font-semibold text-steel-800 hover:border-accent-500 hover:text-accent-600"
            >
              {s.title} →
            </Link>
          ))}
        </nav>
        <h2 className="sr-only">All products</h2>
        <ItemGrid items={products} />
      </Section>

      <CtaBand title="Need a price?" text="Send us the material, grade and quantity and we will quote you quickly." />
    </>
  );
}
