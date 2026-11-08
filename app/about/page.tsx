import { CtaBand } from "@/components/sections/CtaBand";
import { LogoGrid } from "@/components/sections/LogoGrid";
import { PageHero } from "@/components/sections/PageHero";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";
import { certifications } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Us – Scrap Metal Trading & Recycling Since 1995",
  description:
    "Rayanco is one of Saudi Arabia's most reputed scrap traders, processing around 500,000 metric tons of scrap a year, with branches in Jubail, Riyadh, Dammam, Abqaiq and Jeddah.",
  path: "/about",
});

const branches = ["Al Jubail", "Riyadh", "Dammam", "Abqaiq", "Jeddah"];

const facts = [
  { value: "1995", label: "Trading since" },
  { value: "~500,000 t", label: "Scrap processed per year" },
  { value: "20+", label: "Steel producers supplied" },
  { value: "5", label: "Branches in the Kingdom" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Rayanco" eyebrow="Our story" crumbs={[{ name: "About", href: "/about" }]}>
        <p>
          One of the most reputed traders, suppliers, processors and recyclers of scrap for the steel industry in the
          Kingdom of Saudi Arabia.
        </p>
      </PageHero>

      <Section>
        <dl className="mb-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="rounded-lg bg-steel-50 p-5">
              <dt className="text-sm text-steel-600">{f.label}</dt>
              <dd className="font-display text-3xl font-semibold text-steel-900">{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-6 border-t border-steel-200 pt-5 lg:grid-cols-12 lg:gap-12">
          <Heading rule={false} eyebrow="Since 1995" className="lg:col-span-6">
            Our story
          </Heading>
          <div className="space-y-4 text-lg text-steel-700 lg:col-span-6 lg:pt-8">
            <p>
              Rayanco is one of the most reputed traders, suppliers, processors and recyclers of scrap for a number of
              companies in the steel industry in the Kingdom of Saudi Arabia. It is by far the largest trader of metal scrap
              brought into the country, processing approximately 500,000 metric tons of scrap per year.
            </p>
            <p>
              Being reputation conscious, we trade with the most reputed suppliers and offer only superior-quality scrap. We
              collect many types of metal waste from our clients and customers and store it in our large yard. We weigh it
              accurately, then carefully segregate and categorise it using state-of-the-art equipment.
            </p>
            <p>
              Our company is based in the Eastern Province, with branches in {branches.join(", ")}. We are one of the
              foremost companies in this field and price competitively against international markets (LME), growing
              alongside the prosperity of the Kingdom.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-6 border-t border-steel-200 pt-5 lg:grid-cols-12 lg:gap-12">
          <Heading rule={false} eyebrow="Vision" className="lg:col-span-6">
            Our vision
          </Heading>
          <p className="text-lg text-steel-700 lg:col-span-6 lg:pt-8">
            As from the very beginning, our vision is to provide quality shredded material and other scrap metal products
            that meet our customers&apos; quality standards. We aim to be the top-of-mind metal processing and recycling
            company in the Gulf region.
          </p>
        </div>
      </Section>

      <Section>
        <Heading eyebrow="Certifications" className="mb-8">
          Certified quality and compliance
        </Heading>
        <LogoGrid logos={certifications} width={250} height={150} altSuffix=" certification" />
      </Section>

      <CtaBand />
    </>
  );
}
