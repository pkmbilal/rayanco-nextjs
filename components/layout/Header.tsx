import Image from "next/image";
import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/Button";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { mainNav, site, whatsappUrl } from "@/lib/site";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";
import { StickyHeader } from "./StickyHeader";

export function BrandMark({
  tagline,
  eager = false,
  className = "",
}: {
  tagline: string;
  eager?: boolean;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-2 text-white ${className}`}>
      <Image
        src={site.logo.src}
        alt=""
        width={site.logo.width}
        height={site.logo.height}
        loading={eager ? "eager" : "lazy"}
        className="h-10 w-auto transition-[height] duration-300 sm:h-12 sm:group-data-[scrolled]/header:h-10"
      />
      <span className="flex flex-col items-center leading-none">
        <span className="font-display text-xl font-bold tracking-tight sm:text-[1.45rem]">{site.name}</span>
        <span className="mt-1 text-[0.6rem] text-white/85">{tagline}</span>
      </span>
    </span>
  );
}

const Dot = () => <span aria-hidden="true" className="size-1 rounded-full bg-white/25" />;

/** Thin contact strip above the main bar (md+). Not sticky, so it scrolls away. */
function UtilityBar({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const link = "inline-flex items-center gap-1.5 transition-colors hover:text-white";
  return (
    <div className="hidden border-b border-white/5 bg-steel-900 font-ui text-xs text-white/70 md:block">
      <Container className="flex h-9 items-center justify-between gap-6">
        <ul className="flex items-center gap-5">
          {site.phones.map((p) => (
            <li key={p.tel}>
              <a href={`tel:${p.tel}`} className={link} aria-label={`${t.header.callUs} ${p.display}`}>
                <PhoneIcon className="size-3.5 text-accent-400" />
                <span dir="ltr">{p.display}</span>
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${site.email}`} className={link} aria-label={`${t.header.emailUs} ${site.email}`}>
              <MailIcon className="size-3.5 text-accent-400" />
              {site.email}
            </a>
          </li>
        </ul>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <MapPinIcon className="size-3.5 text-accent-400" />
            {t.header.locations}
          </span>
          <Dot />
          <span>{t.header.since}</span>
          <span aria-hidden="true" className="h-4 w-px bg-white/15" />
          <LanguageSwitch
            locale={locale}
            label={t.header.switchLanguage}
            title={t.header.switchLanguageLabel}
            className="font-medium text-white transition-colors hover:text-accent-400"
          />
        </div>
      </Container>
    </div>
  );
}

export function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const items = mainNav.map((n) => ({ href: localePath(locale, n.href), label: t.nav[n.labelKey], exact: n.href === "/" }));
  const waHref = whatsappUrl();

  return (
    <>
      <UtilityBar locale={locale} />
      <StickyHeader>
        <Container className="flex h-[var(--header-h)] items-center justify-between gap-4 transition-[height] duration-300">
          <Link href={localePath(locale, "/")} className="shrink-0" aria-label={t.header.homeLabel}>
            <BrandMark eager tagline={t.header.tagline} />
          </Link>

          <nav aria-label={t.header.mainNav} className="hidden lg:block">
            <NavLinks items={items} />
          </nav>

          <div className="flex items-center gap-2 lg:gap-4">
            <span aria-hidden="true" className="hidden h-6 w-px bg-white/15 lg:block" />
            <LanguageSwitch
              locale={locale}
              label={t.header.switchLanguage}
              title={t.header.switchLanguageLabel}
              className="inline-flex h-9 items-center rounded-full border border-white/20 px-3 font-ui text-xs font-medium text-white transition-colors hover:border-accent-400 hover:text-accent-400 md:hidden"
            />
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses({
                variant: "dark",
                size: "sm",
                className:
                  "shadow-[0_4px_14px_rgb(31_157_85/0.35)] transition-[background-color,transform,box-shadow] hover:-translate-y-px hover:shadow-[0_6px_18px_rgb(31_157_85/0.45)] max-sm:hidden",
              })}
            >
              <WhatsAppIcon className="size-4" />
              {t.header.whatsapp}
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.header.whatsapp}
              className="inline-flex size-11 items-center justify-center rounded-full text-accent-400 hover:bg-white/10 sm:hidden"
            >
              <WhatsAppIcon className="size-6" />
            </a>
            <MobileNav
              items={items}
              whatsappHref={waHref}
              labels={{
                open: t.header.openMenu,
                close: t.header.closeMenu,
                whatsapp: t.header.whatsapp,
                call: t.header.callUs,
                email: t.header.emailUs,
              }}
            />
          </div>
        </Container>
      </StickyHeader>
    </>
  );
}
