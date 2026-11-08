import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/Button";
import { getDictionary } from "@/lib/i18n";
import { mainNav, site, whatsappUrl } from "@/lib/site";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";

export function BrandMark({ eager = false, className = "" }: { eager?: boolean; className?: string }) {
  return (
    <span className={`flex items-center gap-2 text-white ${className}`}>
      <Image
        src={site.logo.src}
        alt=""
        width={site.logo.width}
        height={site.logo.height}
        loading={eager ? "eager" : "lazy"}
        className="h-10 w-auto sm:h-12"
      />
      <span className="flex flex-col items-center leading-none">
        <span className="font-display text-xl font-bold tracking-tight sm:text-[1.45rem]">{site.name}</span>
        <span className="mt-1 text-[0.6rem] text-white/85">Buy • Sell • Trade</span>
      </span>
    </span>
  );
}

export function Header() {
  const t = getDictionary();
  const items = mainNav.map((n) => ({ href: n.href, label: t.nav[n.labelKey] }));
  const waHref = whatsappUrl();

  // Solid bg on purpose: backdrop-filter would trap the fixed mobile drawer inside the header.
  // Same navy as the page heroes below it, so the two read as one dark block.
  return (
    <header className="sticky top-0 z-50 bg-steel-950">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Link href="/" className="shrink-0" aria-label={`${site.name} home`}>
          <BrandMark eager />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks items={items} />
        </nav>

        <div className="flex items-center gap-2">
          {/* Arabic version ships in phase 2; placeholder only. */}
          <span
            title={t.header.switchLanguageSoon}
            aria-disabled="true"
            className="hidden cursor-not-allowed px-2 py-1 text-sm text-white/50 sm:inline"
            lang="ar"
          >
            {t.header.switchLanguage}
          </span>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: "dark", size: "sm", className: "max-sm:hidden" })}
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
            labels={{ open: t.header.openMenu, close: t.header.closeMenu, whatsapp: t.header.whatsapp }}
          />
        </div>
      </Container>
    </header>
  );
}
