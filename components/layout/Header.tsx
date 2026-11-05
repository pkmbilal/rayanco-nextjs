import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/Button";
import { getDictionary } from "@/lib/i18n";
import { mainNav, site, whatsappUrl } from "@/lib/site";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";

export function Header() {
  const t = getDictionary();
  const items = mainNav.map((n) => ({ href: n.href, label: t.nav[n.labelKey] }));
  const waHref = whatsappUrl();

  // Solid bg on purpose: backdrop-filter would trap the fixed mobile drawer inside the header.
  return (
    <header className="sticky top-0 z-50 bg-steel-950">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${site.name} home`}>
          <Image
            src={site.logo.src}
            alt={site.name}
            width={site.logo.width}
            height={site.logo.height}
            loading="eager"
            className="h-11 w-auto"
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks items={items} />
        </nav>

        <div className="flex items-center gap-2">
          {/* Arabic version ships in phase 2; placeholder only. */}
          <span
            title={t.header.switchLanguageSoon}
            aria-disabled="true"
            className="hidden cursor-not-allowed rounded-md px-2 py-1 text-sm text-steel-400 sm:inline"
            lang="ar"
          >
            {t.header.switchLanguage}
          </span>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: "whatsapp", size: "sm", className: "max-sm:hidden" })}
          >
            <WhatsAppIcon className="size-4" />
            {t.header.whatsapp}
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.header.whatsapp}
            className="inline-flex size-11 items-center justify-center rounded-md text-whatsapp hover:bg-white/10 sm:hidden"
          >
            <WhatsAppIcon className="size-6" />
          </a>
          <MobileNav
            items={items}
            whatsappHref={waHref}
            labels={{ open: t.header.openMenu, close: t.header.closeMenu, whatsapp: t.header.whatsapp }}
          />
        </div>
      </Container>
    </header>
  );
}
