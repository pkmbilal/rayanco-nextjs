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
  cta: {
    title: "Get a quote today",
    text: "Tell us what you have or what you need. We reply fast on WhatsApp and phone.",
    whatsappText: "Hi Rayanco, I'd like a quote.",
    sellScrap: "Sell us your scrap",
    browseEquipment: "Browse used equipment",
  },
  form: {
    name: "Your name",
    phone: "Phone / WhatsApp",
    email: "Email (optional)",
    company: "Company (optional)",
    location: "Location (city or site)",
    items: "What are you selling?",
    message: "Message",
    submit: "Send",
    sending: "Sending…",
    success: "Thank you. We received your message and will contact you shortly.",
    error: "Sorry, something went wrong. Please try again or contact us on WhatsApp.",
    required: "This field is required",
    invalidPhone: "Enter a valid phone number",
    invalidEmail: "Enter a valid email",
  },
} as const;

export type Dictionary = typeof en;
