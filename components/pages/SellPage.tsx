import { WhatsAppIcon } from "@/components/icons";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { sellCopy } from "@/content/pages/services";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/site";

export function sellMetadata(locale: Locale) {
  const c = sellCopy[locale].meta;
  return pageMetadata({ locale, title: c.title, description: c.description, path: "/sell-your-equipment" });
}

export function SellPage({ locale }: { locale: Locale }) {
  const c = sellCopy[locale];
  return (
    <>
      <PageHero
        locale={locale}
        title={c.hero.title}
        eyebrow={c.hero.eyebrow}
        crumbs={[{ name: c.hero.crumb, href: "/sell-your-equipment" }]}
      >
        <p>{c.hero.text}</p>
        <ButtonLink
          href={whatsappUrl(c.hero.whatsapp)}
          external
          variant="whatsapp"
          size="lg"
          className="mt-6"
        >
          <WhatsAppIcon className="size-5" />
          {c.hero.whatsappCta}
        </ButtonLink>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Heading className="mb-6">{c.whatTitle}</Heading>
            <ul className="list-disc space-y-2 ps-5 text-lg text-steel-700">
              {c.what.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
            <Heading level={3} className="mb-4 mt-12">
              {c.howTitle}
            </Heading>
            <ol className="space-y-4">
              {c.steps.map((s, i) => (
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
              {c.formTitle}
            </Heading>
            <EnquiryForm locale={locale} kind="sell" />
          </div>
        </div>
      </Section>
    </>
  );
}
