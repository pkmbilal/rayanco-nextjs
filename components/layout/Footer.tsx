import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { fullAddress, site } from "@/lib/site";
import { CopyrightYear } from "./CopyrightYear";
import { BrandMark } from "./Header";

const productLinks = [
  { href: "/products/non-ferrous-metals", key: "nonFerrous" },
  { href: "/products/metal-scrap-surplus", key: "metalScrap" },
  { href: "/used-equipment", key: "usedEquipment" },
  { href: "/services/demolition", key: "demolition" },
  { href: "/products", key: "allProducts" },
] as const;

const companyLinks = [
  { href: "/about", key: "about" },
  { href: "/sell-your-equipment", key: "sell" },
  { href: "/contact", key: "contact" },
  { href: "/contact", key: "quote" },
] as const;

function LinkColumn({ heading, links }: { heading: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={heading}>
      <h2 className="mb-4 font-ui text-[0.8rem] font-semibold text-white">{heading}</h2>
      <ul className="space-y-2.5 text-[0.8rem]">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-white/80 hover:text-accent-400">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const href = (path: string) => localePath(locale, path);

  return (
    <footer className="relative mt-auto overflow-hidden bg-[linear-gradient(115deg,#0c1f2c_0%,#0d2130_55%,#0e2a2a_75%,#0b1c28_100%)] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 start-[62%] w-64 -skew-x-[35deg] bg-[linear-gradient(90deg,rgb(31_157_85/0)_0%,rgb(31_157_85/0.18)_50%,rgb(31_157_85/0)_100%)]"
      />
      <Container className="relative grid gap-10 border-b border-white/10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
        <div className="space-y-4">
          <Link href={href("/")} aria-label={t.header.homeLabel} className="inline-block">
            <BrandMark tagline={t.header.tagline} />
          </Link>
          <p className="max-w-64 text-[0.8rem] leading-relaxed text-white/75">{t.footer.tagline}</p>
        </div>

        <LinkColumn
          heading={t.footer.productsHeading}
          links={productLinks.map((l) => ({ href: href(l.href), label: t.footer.productLinks[l.key] }))}
        />
        <LinkColumn
          heading={t.footer.companyHeading}
          links={companyLinks.map((l) => ({ href: href(l.href), label: t.footer.companyLinks[l.key] }))}
        />

        {/* NAP: keep identical on every page of a locale (SEO). */}
        <address className="space-y-2.5 text-[0.8rem] not-italic text-white/80">
          <h2 className="mb-4 font-ui text-[0.8rem] font-semibold text-white">{t.footer.contactHeading}</h2>
          <p className="flex gap-2">
            <MapPinIcon className="mt-0.5 size-3.5 shrink-0 text-accent-400" />
            <span>{fullAddress(locale)}</span>
          </p>
          <p className="flex gap-2">
            <MailIcon className="mt-0.5 size-3.5 shrink-0 text-accent-400" />
            <a href={`mailto:${site.email}`} className="hover:text-accent-400">
              {site.email}
            </a>
          </p>
          {site.phones.map((p) => (
            <p key={p.tel} className="flex gap-2">
              <PhoneIcon className="mt-0.5 size-3.5 shrink-0 text-accent-400" />
              <a href={`tel:${p.tel}`} className="hover:text-accent-400" dir="ltr">
                {p.display}
              </a>
            </p>
          ))}
        </address>
      </Container>

      <Container className="relative flex flex-col gap-2 py-5 text-[0.7rem] text-white/80 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          <span>
            © <CopyrightYear /> {site.name}. {t.footer.rights}
          </span>
          <span>
            {t.footer.designedBy}{" "}
            <a href="https://www.codesudio.com" target="_blank" rel="noopener" className="font-semibold text-accent-400">
              CodeSudio
            </a>
          </span>
        </p>
        <p>{t.footer.motto}</p>
      </Container>
    </footer>
  );
}
