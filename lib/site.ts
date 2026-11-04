import { publicEnv } from "@/lib/env";
import type { Dictionary } from "@/lib/i18n/en";

/** Business facts. NAP must stay identical on every page (SEO). */
export const site = {
  name: "Rayanco",
  url: publicEnv.NEXT_PUBLIC_SITE_URL,
  foundingYear: 1995,
  email: "sales@rayanco.com",
  phones: [
    { display: "+966 50 974 7741", tel: "+966509747741" },
    { display: "+966 50 386 1438", tel: "+966503861438" },
  ],
  address: {
    poBox: "P.O. Box 72146",
    street: "King Fahad Road, North opp. MMG, Al-Hammam Commercial Centre, 1st Floor, Office No. 9",
    city: "Dammam",
    postalCode: "31518",
    country: "Saudi Arabia",
    countryCode: "SA",
  },
  logo: { src: "/assets/images/Logo.webp", width: 300, height: 182 },
} as const;

export type NavItem = { href: string; labelKey: keyof Dictionary["nav"] };

export const mainNav: NavItem[] = [
  { href: "/", labelKey: "home" },
  { href: "/about", labelKey: "about" },
  { href: "/products", labelKey: "products" },
  { href: "/used-equipment", labelKey: "usedEquipment" },
  { href: "/services/demolition", labelKey: "services" },
  { href: "/contact", labelKey: "contact" },
];

export const certifications = [
  { name: "ISRI", src: "/assets/images/isri.webp" },
  { name: "ISO 9001", src: "/assets/images/iso9001.webp" },
  { name: "ISO 14001", src: "/assets/images/iso14001.webp" },
  { name: "Achilles", src: "/assets/images/achilles.webp" },
  { name: "BMR", src: "/assets/images/bmr.webp" },
] as const;

/** Builds a wa.me link. Falls back to the first sales phone until the owner confirms a WhatsApp number. */
export function whatsappUrl(text?: string): string {
  // TODO(owner): confirm NEXT_PUBLIC_WHATSAPP_NUMBER; fallback is the first sales line.
  const number = publicEnv.NEXT_PUBLIC_WHATSAPP_NUMBER || site.phones[0].tel.replace(/\D/g, "");
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${number}${query}`;
}
