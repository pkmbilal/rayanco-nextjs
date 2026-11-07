import Image from "next/image";
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/lib/i18n";
import { site, whatsappUrl } from "@/lib/site";

/** Closing call-to-action ("Ready to trade?" band): WhatsApp + call. */
export function CtaBand({
  title,
  accent,
  text,
  whatsappText,
}: {
  title?: string;
  /** Trailing part of the title shown in green. */
  accent?: string;
  text?: string;
  whatsappText?: string;
}) {
  const t = getDictionary();
  const heading = title ?? t.cta.title;
  const green = accent ?? (title ? undefined : t.cta.titleAccent);

  return (
    <Container className="py-10 sm:py-12">
      <section className="relative isolate overflow-hidden rounded-lg bg-steel-800 text-white">
        <div className="absolute inset-y-0 end-0 -z-10 hidden w-[46%] md:block">
          <Image src="/assets/images/site/cta.webp" alt="" fill sizes="(min-width: 1280px) 560px, 46vw" className="object-cover object-right" />
        </div>
        {/* Skewed divider with the green edge, as in the design. */}
        <div
          aria-hidden="true"
          className="absolute -inset-y-4 end-[40%] -z-10 hidden w-56 -skew-x-[31deg] border-e-[14px] border-accent-400 bg-steel-800 md:block rtl:skew-x-[31deg] rtl:border-e-0 rtl:border-s-[14px]"
        />
        <div className="px-6 py-7 sm:px-10 md:max-w-[52%]">
          <h2 className="font-display text-2xl font-bold leading-tight sm:text-[2rem]">
            {heading}
            {green ? <span className="text-accent-400"> {green}</span> : null}
          </h2>
          <p className="mt-2 max-w-md text-[0.95rem] text-white/90">{text ?? t.cta.text}</p>
          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <ButtonLink href={whatsappUrl(whatsappText ?? t.cta.whatsappText)} external size="md" variant="primary">
              <WhatsAppIcon className="size-4" />
              {t.header.whatsapp}
              <ArrowIcon className="size-3.5" />
            </ButtonLink>
            <ButtonLink href={`tel:${site.phones[0].tel}`} size="md" variant="secondary" className="text-white">
              <PhoneIcon className="size-4" />
              <span dir="ltr">{site.phones[0].display}</span>
            </ButtonLink>
          </div>
        </div>
      </section>
    </Container>
  );
}
