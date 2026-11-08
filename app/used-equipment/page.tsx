import { Suspense } from "react";
import { MarketplaceResults, ResultsSkeleton } from "@/components/listings/MarketplaceResults";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Used Heavy Equipment for Sale in Saudi Arabia",
  description:
    "Used cranes, generators, excavators, wheel loaders, compressors and more for sale from Rayanco in Dammam and Jubail, Saudi Arabia. Contact us on WhatsApp or phone.",
  path: "/used-equipment",
});

export default function UsedEquipmentPage({ searchParams }: PageProps<"/used-equipment">) {
  return (
    <>
      <PageHero
        title="Used Equipment for Sale"
        accent="for Sale"
        crumbs={[{ name: "Used Equipment", href: "/used-equipment" }]}
        overlap
      >
        <p>
          We buy and resell used heavy equipment and machinery across Saudi Arabia. Every machine below is inspected by
          our team in Dammam and Jubail. Contact us on WhatsApp or phone to arrange a viewing and agree a price.
        </p>
      </PageHero>

      <Container>
        <Suspense fallback={<ResultsSkeleton />}>
          <MarketplaceResults searchParams={searchParams} basePath="/used-equipment" />
        </Suspense>
      </Container>

      <CtaBand
        title="Looking for a"
        accent="specific machine?"
        text="Send us the type, capacity and year you need on WhatsApp and we will check our current stock."
        whatsappText="Hi, I'm looking for used equipment: "
      />
    </>
  );
}
