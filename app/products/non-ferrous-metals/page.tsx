import { CtaBand } from "@/components/sections/CtaBand";
import { ItemGrid } from "@/components/sections/ItemGrid";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { nonFerrousMetals } from "@/content/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Non-Ferrous Metal Scrap Buyer in Saudi Arabia",
  description:
    "Rayanco buys and sells non-ferrous metals in Saudi Arabia: copper, aluminium and zorba, brass, bronze, lead, zinc, tin, stainless, alloy and tool steel.",
  path: "/products/non-ferrous-metals",
});

export default function NonFerrousPage() {
  return (
    <>
      <PageHero
        title="Non-Ferrous Metals"
        crumbs={[
          { name: "Products", href: "/products" },
          { name: "Non-Ferrous Metals", href: "/products/non-ferrous-metals" },
        ]}
      >
        <p>
          We have a large inventory of non-ferrous metals and buy non-ferrous scrap in any quantity, from single lots to
          containers.
        </p>
      </PageHero>
      <Section>
        <h2 className="sr-only">Non-ferrous metals we trade</h2>
        <ItemGrid items={nonFerrousMetals} />
      </Section>
      <CtaBand flushTop whatsappText="Hi Rayanco, I'd like a quote for non-ferrous metal." />
    </>
  );
}
