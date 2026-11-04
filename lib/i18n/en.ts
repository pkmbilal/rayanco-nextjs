/** English UI strings. The Arabic dictionary (ar.ts) must mirror this shape in phase 2. */
export const en = {
  nav: {
    home: "Home",
    about: "About",
    products: "Products",
    usedEquipment: "Used Equipment",
    services: "Services",
    contact: "Contact",
  },
  header: {
    whatsapp: "WhatsApp us",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: "العربية",
    switchLanguageSoon: "Arabic version coming soon",
    skipToContent: "Skip to content",
  },
  footer: {
    contactHeading: "Contact",
    linksHeading: "Quick links",
    certsHeading: "Certifications",
    tagline: "Scrap metal trading in Jubail and Dammam since 1995.",
    rights: "All rights reserved.",
  },
  status: {
    available: "Available",
    reserved: "Reserved",
    sold: "Sold",
  },
  breadcrumbs: {
    label: "Breadcrumb",
    home: "Home",
  },
} as const;

export type Dictionary = typeof en;
