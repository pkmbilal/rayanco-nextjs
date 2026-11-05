import Image from "next/image";
import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/lib/i18n";
import { certifications, mainNav, site } from "@/lib/site";
import { CopyrightYear } from "./CopyrightYear";

const productLinks = [
  { href: "/products/non-ferrous-metals", label: "Non-Ferrous Metals" },
  { href: "/products/metal-scrap-surplus", label: "Metal Scrap & Surplus" },
  { href: "/services/demolition", label: "Demolition" },
  { href: "/sell-your-equipment", label: "Sell Your Equipment" },
];

export function Footer() {
  const t = getDictionary();
  const { address } = site;

  return (
    <footer className="mt-auto bg-steel-950 text-steel-300">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Image src={site.logo.src} alt={site.name} width={site.logo.width} height={site.logo.height} className="h-14 w-auto" />
          <p className="text-sm">{t.footer.tagline}</p>
        </div>

        {/* NAP: keep identical on every page (SEO). */}
        <address className="space-y-3 text-sm not-italic">
          <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-white">{t.footer.contactHeading}</h2>
          <p className="flex gap-2">
            <MapPinIcon className="mt-0.5 size-4 shrink-0 text-accent-500" />
            <span>
              {site.name}, {address.poBox}, {address.city} {address.postalCode}, {address.street}, {address.country}
            </span>
          </p>
          <p className="flex gap-2">
            <MailIcon className="mt-0.5 size-4 shrink-0 text-accent-500" />
            <a href={`mailto:${site.email}`} className="hover:text-white">
              {site.email}
            </a>
          </p>
          {site.phones.map((p) => (
            <p key={p.tel} className="flex gap-2">
              <PhoneIcon className="mt-0.5 size-4 shrink-0 text-accent-500" />
              <a href={`tel:${p.tel}`} className="hover:text-white" dir="ltr">
                {p.display}
              </a>
            </p>
          ))}
        </address>

        <nav aria-label={t.footer.linksHeading} className="text-sm">
          <h2 className="mb-3 font-display text-lg font-semibold uppercase tracking-wide text-white">{t.footer.linksHeading}</h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 lg:grid-cols-1">
            {mainNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-white">
                  {t.nav[n.labelKey]}
                </Link>
              </li>
            ))}
            {productLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold uppercase tracking-wide text-white">{t.footer.certsHeading}</h2>
          <ul className="grid grid-cols-3 gap-2">
            {certifications.map((c) => (
              <li key={c.name} className="rounded bg-white p-1.5">
                <Image src={c.src} alt={`${c.name} certification`} width={250} height={150} className="h-auto w-full" />
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-5 text-xs text-steel-400">
          © <CopyrightYear /> {site.name}. {t.footer.rights}
        </Container>
      </div>
    </footer>
  );
}
