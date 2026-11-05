import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";
import { fullAddress, site, whatsappUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Us – Scrap Buyer in Dammam & Jubail",
  description:
    "Contact Rayanco in Dammam, Saudi Arabia: call +966 50 974 7741, WhatsApp us or email sales@rayanco.com to sell scrap or buy metals and used equipment.",
  path: "/contact",
});

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Al-Hammam Commercial Centre, King Fahad Road, Dammam, Saudi Arabia",
)}`;

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" crumbs={[{ name: "Contact", href: "/contact" }]}>
        <p>Selling scrap or buying metal and equipment? Call, WhatsApp or send us a message.</p>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <Heading level={3}>Rayanco office</Heading>
            <address className="space-y-4 not-italic text-steel-700">
              <p className="flex gap-3">
                <MapPinIcon className="mt-1 size-5 shrink-0 text-accent-500" />
                <span>{fullAddress()}</span>
              </p>
              <p className="flex gap-3">
                <MailIcon className="mt-1 size-5 shrink-0 text-accent-500" />
                <a href={`mailto:${site.email}`} className="hover:text-accent-600 hover:underline">
                  {site.email}
                </a>
              </p>
              {site.phones.map((p) => (
                <p key={p.tel} className="flex gap-3">
                  <PhoneIcon className="mt-1 size-5 shrink-0 text-accent-500" />
                  <a href={`tel:${p.tel}`} dir="ltr" className="hover:text-accent-600 hover:underline">
                    {p.display}
                  </a>
                </p>
              ))}
            </address>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href={whatsappUrl("Hi Rayanco, I have an enquiry.")} external variant="whatsapp">
                <WhatsAppIcon className="size-5" />
                WhatsApp us
              </ButtonLink>
              <ButtonLink href={mapsUrl} external variant="secondary">
                <MapPinIcon className="size-5" />
                Open in Google Maps
              </ButtonLink>
            </div>
            {/* TODO(owner): confirm office hours and the exact Google Maps pin for the office. */}
          </div>

          <div className="rounded-lg border border-steel-100 bg-steel-50 p-6 sm:p-8 lg:col-span-3">
            <Heading level={3} className="mb-6">
              Send us a message
            </Heading>
            <EnquiryForm kind="contact" />
          </div>
        </div>
      </Section>
    </>
  );
}
