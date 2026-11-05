import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getDictionary } from "@/lib/i18n";
import { site, whatsappUrl } from "@/lib/site";

/** Closing call-to-action: WhatsApp + call. */
export function CtaBand({
  title,
  text,
  whatsappText,
}: {
  title?: string;
  text?: string;
  whatsappText?: string;
}) {
  const t = getDictionary();
  return (
    <Section tone="dark">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold uppercase sm:text-4xl">{title ?? t.cta.title}</h2>
          <p className="mt-3 text-steel-300">{text ?? t.cta.text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={whatsappUrl(whatsappText ?? t.cta.whatsappText)} external size="lg" variant="whatsapp">
            <WhatsAppIcon className="size-5" />
            {t.header.whatsapp}
          </ButtonLink>
          <ButtonLink href={`tel:${site.phones[0].tel}`} size="lg" variant="secondary" className="text-white">
            <PhoneIcon className="size-5" />
            <span dir="ltr">{site.phones[0].display}</span>
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
