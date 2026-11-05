import { WhatsAppIcon } from "@/components/icons";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Sell Your Used Equipment & Scrap in Saudi Arabia",
  description:
    "Sell used heavy equipment, surplus materials or scrap metal to Rayanco in Saudi Arabia. Free site visit, fast offer and collection from Jubail, Dammam and across the Kingdom.",
  path: "/sell-your-equipment",
});

const what = [
  "Cranes, excavators, loaders, dozers and rollers",
  "Generators, compressors and welding machines",
  "Ferrous and non-ferrous scrap, in any quantity",
  "Surplus pipe, plate, beams and fittings",
  "Containers, porta cabins and scaffolding",
  "Whole non-functional plants for dismantling",
];

const steps = [
  { title: "Tell us what you have", text: "Send photos and details on WhatsApp or with the form." },
  { title: "Site visit", text: "Our team inspects the equipment or scrap at your site." },
  { title: "Get an offer", text: "We make a fair offer based on condition and current market prices." },
  { title: "Collection", text: "We pay and handle loading and transport from your site." },
];

export default function SellYourEquipmentPage() {
  return (
    <>
      <PageHero
        title="Sell Your Used Equipment & Scrap"
        eyebrow="Sell to Rayanco"
        crumbs={[{ name: "Sell Your Equipment", href: "/sell-your-equipment" }]}
      >
        <p>
          We buy used heavy equipment, surplus materials and scrap metal across Saudi Arabia. Tell us what you have and get
          a fast offer.
        </p>
        <ButtonLink
          href={whatsappUrl("Hi Rayanco, I'd like to sell equipment / scrap. Photos attached.")}
          external
          variant="whatsapp"
          size="lg"
          className="mt-6"
        >
          <WhatsAppIcon className="size-5" />
          Send photos on WhatsApp
        </ButtonLink>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Heading className="mb-6">What we buy</Heading>
            <ul className="list-disc space-y-2 ps-5 text-lg text-steel-700">
              {what.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
            <Heading level={3} className="mb-4 mt-12">
              How it works
            </Heading>
            <ol className="space-y-4">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="font-display text-2xl font-semibold text-accent-500">{i + 1}</span>
                  <div>
                    <p className="font-semibold">{s.title}</p>
                    <p className="text-steel-600">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-lg border border-steel-100 bg-steel-50 p-6 sm:p-8">
            <Heading level={3} className="mb-6">
              Request an offer
            </Heading>
            <EnquiryForm kind="sell" />
          </div>
        </div>
      </Section>
    </>
  );
}
