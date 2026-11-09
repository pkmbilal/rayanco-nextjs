import type { Locale } from "@/lib/i18n";

/**
 * Copy for /used-equipment, its category pages and listing pages.
 * TODO(owner): native Arabic review of the `ar` copy before launch.
 */
const en = {
  index: {
    meta: {
      title: "Used Heavy Equipment for Sale in Saudi Arabia",
      description:
        "Used cranes, generators, excavators, wheel loaders, compressors and more for sale from Rayanco in Dammam and Jubail, Saudi Arabia. Contact us on WhatsApp or phone.",
    },
    title: "Used Equipment for Sale",
    accent: "for Sale",
    crumb: "Used Equipment",
    text: "We buy and resell used heavy equipment and machinery across Saudi Arabia. Every machine below is inspected by our team in Dammam and Jubail. Contact us on WhatsApp or phone to arrange a viewing and agree a price.",
    cta: {
      title: "Looking for a",
      accent: "specific machine?",
      text: "Send us the type, capacity and year you need on WhatsApp and we will check our current stock.",
      whatsapp: "Hi, I'm looking for used equipment: ",
    },
  },
  category: {
    metaTitle: (name: string) => `Used ${name} for Sale in Saudi Arabia`,
    metaDescription: (name: string) =>
      `Used ${name.toLowerCase()} for sale from Rayanco in Dammam and Jubail, Saudi Arabia. Inspected machines, honest condition reports. Enquire on WhatsApp or phone.`,
    title: (name: string) => `Used ${name} for Sale`,
    eyebrow: "Used equipment",
    text: (name: string) =>
      `Rayanco buys and resells used ${name.toLowerCase()} across Saudi Arabia from our yards in Dammam and Jubail. Contact us on WhatsApp or phone for photos, inspection and the best price.`,
    ctaTitle: (name: string) => `Need a specific ${name.toLowerCase().replace(/s$/, "")}?`,
    ctaText: "Tell us the capacity, year and location you need. Stock changes weekly and not every machine is listed online.",
    ctaWhatsapp: (name: string) => `Hi, I'm looking for used ${name.toLowerCase()}: `,
  },
  listing: {
    sold: "Sold.",
    forSale: "for sale",
    used: "Used",
    contactFallback: "Contact Rayanco on WhatsApp or phone.",
    metaDescription: (p: { title: string; facts: string; location: string; status: string; ref: string }) =>
      `Used ${p.title}${p.facts ? ` (${p.facts})` : ""} for sale${p.location ? ` in ${p.location}` : ""}, Saudi Arabia. ${p.status} Ref ${p.ref}.`,
  },
};

export type MarketplaceCopy = typeof en;

const ar: MarketplaceCopy = {
  index: {
    meta: {
      title: "معدات ثقيلة مستعملة للبيع في السعودية",
      description:
        "رافعات ومولدات وحفارات ولوادر وضواغط مستعملة وغيرها للبيع من ريانكو في الدمام والجبيل بالمملكة العربية السعودية. تواصل معنا عبر واتساب أو الهاتف.",
    },
    title: "معدات مستعملة للبيع",
    accent: "للبيع",
    crumb: "المعدات المستعملة",
    text: "نشتري ونعيد بيع المعدات والآليات الثقيلة المستعملة في جميع أنحاء المملكة. يعاين فريقنا في الدمام والجبيل كل معدة معروضة أدناه. تواصل معنا عبر واتساب أو الهاتف لترتيب المعاينة والاتفاق على السعر.",
    cta: {
      title: "تبحث عن",
      accent: "معدة محددة؟",
      text: "أرسل لنا النوع والسعة وسنة الصنع التي تحتاجها عبر واتساب، وسنتحقق من مخزوننا الحالي.",
      whatsapp: "مرحبًا، أبحث عن معدات مستعملة: ",
    },
  },
  category: {
    metaTitle: (name: string) => `${name} المستعملة للبيع في السعودية`,
    metaDescription: (name: string) =>
      `${name} المستعملة للبيع من ريانكو في الدمام والجبيل بالمملكة العربية السعودية. معدات معاينة وتقارير حالة دقيقة. استفسر عبر واتساب أو الهاتف.`,
    title: (name: string) => `${name} المستعملة للبيع`,
    eyebrow: "المعدات المستعملة",
    text: (name: string) =>
      `تشتري ريانكو ${name} المستعملة وتعيد بيعها في جميع أنحاء المملكة من ساحاتها في الدمام والجبيل. تواصل معنا عبر واتساب أو الهاتف للحصول على الصور والمعاينة وأفضل سعر.`,
    ctaTitle: (name: string) => `تبحث عن ${name} بمواصفات محددة؟`,
    ctaText: "أخبرنا بالسعة وسنة الصنع والموقع الذي تحتاجه. يتغير المخزون أسبوعيًا، ولا تُعرض جميع المعدات على الموقع.",
    ctaWhatsapp: (name: string) => `مرحبًا، أبحث عن ${name} المستعملة: `,
  },
  listing: {
    sold: "تم البيع.",
    forSale: "للبيع",
    used: "مستعمل",
    contactFallback: "تواصل مع ريانكو عبر واتساب أو الهاتف.",
    metaDescription: (p: { title: string; facts: string; location: string; status: string; ref: string }) =>
      `${p.title} مستعمل${p.facts ? ` (${p.facts})` : ""} للبيع${p.location ? ` في ${p.location}` : ""}، المملكة العربية السعودية. ${p.status} المرجع ${p.ref}.`,
  },
};

export const marketplaceCopy: Record<Locale, MarketplaceCopy> = { en, ar };
