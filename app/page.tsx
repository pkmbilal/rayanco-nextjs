import type { Metadata } from "next";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { whatsappUrl } from "@/lib/site";

// Temporary shell to validate the layout. The full homepage (preserved content, CLAUDE.md §6) is step 3.
export const metadata: Metadata = {
  title: { absolute: "Scrap Buyer in Jubail, Saudi Arabia | Rayanco" },
  description:
    "Rayanco is the largest scrap buyer in Jubail, Saudi Arabia, buying and selling scrap metal, ferrous and non-ferrous, since 1995.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <section className="relative isolate overflow-hidden bg-steel-900 text-white">
      <Image
        src="/assets/images/Hero_bg.webp"
        alt=""
        fill
        preload
        sizes="100vw"
        className="-z-10 object-cover opacity-30"
      />
      <Container className="py-24 sm:py-32">
        <h1 className="max-w-3xl font-display text-4xl font-semibold uppercase leading-tight sm:text-6xl">
          Scrap Buyer in Jubail, Saudi Arabia
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-steel-200">
          Rayanco is the largest scrap buyer in Jubail, Saudi Arabia, trading ferrous and non-ferrous metal in bulk and
          containers, locally and internationally, since 1995.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={whatsappUrl("Hi, I'd like to sell scrap to Rayanco.")} external size="lg" variant="whatsapp">
            <WhatsAppIcon className="size-5" />
            Sell us your scrap
          </ButtonLink>
          <ButtonLink href="/used-equipment" size="lg" variant="secondary" className="text-white">
            Browse used equipment
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
