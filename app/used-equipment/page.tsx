import { CtaBand } from "@/components/sections/CtaBand";
import { ItemGrid } from "@/components/sections/ItemGrid";
import { PageHero } from "@/components/sections/PageHero";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { equipmentTypes } from "@/content/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Used Heavy Equipment for Sale in Saudi Arabia",
  description:
    "Used cranes, generators, excavators, wheel loaders, compressors and more for sale from Rayanco in Dammam and Jubail, Saudi Arabia. Contact us on WhatsApp or phone.",
  path: "/used-equipment",
});

// Interim page (build step 4) so /equipment_resale.html never lands on a 404.
// Step 5 replaces it with the full marketplace grid (filters, search, live listings).
export default function UsedEquipmentPage() {
  return (
    <>
      <PageHero
        title="Used Equipment for Sale"
        eyebrow="Equipment resale"
        crumbs={[{ name: "Used Equipment", href: "/used-equipment" }]}
      >
        <p>
          We buy and resell used heavy equipment and machinery across Saudi Arabia. Tell us what you need, or what you
          want to sell, and we will get back to you with what is available.
        </p>
      </PageHero>
      <Section>
        <Heading level={2} className="mb-8">
          Equipment we trade
        </Heading>
        <ItemGrid items={equipmentTypes} />
      </Section>
      <CtaBand
        title="Looking for a specific machine?"
        text="Send us the type, capacity and year you need on WhatsApp and we will check our current stock."
        whatsappText="Hi, I'm looking for used equipment: "
      />
    </>
  );
}
