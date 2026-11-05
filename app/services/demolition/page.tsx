import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Plant Dismantling & Demolition Scrap Services in Saudi Arabia",
  description:
    "Rayanco dismantles and scraps non-functional plants and structures across Saudi Arabia, then buys and recycles the recovered steel and non-ferrous metal.",
  path: "/services/demolition",
});

// TODO(owner): confirm scope (safety certifications, equipment fleet, past projects) to strengthen this page.
const steps = [
  { title: "Site survey", text: "We inspect the plant or structure and estimate the recoverable metal and equipment." },
  { title: "Offer", text: "You get a clear offer for the scrap value, the dismantling work, or both." },
  { title: "Dismantling", text: "Our team dismantles and cuts the structure, segregating ferrous and non-ferrous metal." },
  { title: "Removal & recycling", text: "Material is weighed, transported to our yard and recycled. The site is left clear." },
];

const scope = [
  "Non-functional process plants and industrial units",
  "Steel structures, sheds and warehouses",
  "Tanks, pipelines and pipe racks",
  "Heavy machinery, transformers and generators",
  "Scaffolding and site camps",
];

export default function DemolitionPage() {
  return (
    <>
      <PageHero
        title="Dismantling & Demolition"
        eyebrow="Services"
        crumbs={[{ name: "Demolition", href: "/services/demolition" }]}
      >
        <p>
          We are active in the dismantling and scrapping of non-functional plants across Saudi Arabia, and we buy the
          recovered metal directly, so the scrap value offsets the cost of the work.
        </p>
      </PageHero>

      <Section>
        <Heading className="mb-8">How it works</Heading>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-lg bg-steel-50 p-6">
              <span className="font-display text-4xl font-semibold text-accent-500">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-display text-xl font-semibold uppercase">{s.title}</h3>
              <p className="mt-2 text-steel-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Heading>What we dismantle</Heading>
          <ul className="list-disc space-y-2 ps-5 text-lg text-steel-700">
            {scope.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand
        title="Have a plant to dismantle?"
        text="Send us the location and a few photos, and we will arrange a site visit."
        whatsappText="Hi Rayanco, I have a plant / structure to dismantle."
      />
    </>
  );
}
