import { CtaBand } from "@/components/sections/CtaBand";
import { ItemGrid } from "@/components/sections/ItemGrid";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { metalScrapSurplus } from "@/content/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Metal Scrap & Surplus Materials in Saudi Arabia",
  description:
    "Surplus steel from Rayanco in Jubail and Dammam: beams, carbon steel, coils, MS pipes, seamless pipe and plate, from project and plant surplus.",
  path: "/products/metal-scrap-surplus",
});

export default function MetalScrapSurplusPage() {
  return (
    <>
      <PageHero
        title="Metal Scrap & Surplus Materials"
        crumbs={[
          { name: "Products", href: "/products" },
          { name: "Metal Scrap & Surplus", href: "/products/metal-scrap-surplus" },
        ]}
      >
        <p>
          We have a large inventory of surplus materials from projects, plants and fabrication yards, available for resale
          or as scrap.
        </p>
      </PageHero>
      <Section>
        <h2 className="sr-only">Surplus materials in stock</h2>
        <ItemGrid items={metalScrapSurplus} />
      </Section>
      <CtaBand whatsappText="Hi Rayanco, I'm interested in your surplus materials." />
    </>
  );
}
