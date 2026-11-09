import type { Locale } from "@/lib/i18n";

/**
 * Homepage copy. English is the legacy ranking content (CLAUDE.md §6): do not remove the title, H1 or core text.
 * TODO(owner): native Arabic review of the `ar` copy before launch.
 */
const en = {
  meta: {
    title: "Scrap Buyer in Jubail, Saudi Arabia | Rayanco",
    description:
      "Rayanco is the largest scrap buyer in Jubail, Saudi Arabia, buying and selling scrap since 1995: ferrous and non-ferrous metals, surplus materials and used equipment.",
  },
  hero: {
    h1Lead: "Scrap Buyer in ",
    h1Accent: "Jubail, Saudi Arabia",
    text: "Bulk and container trade of ferrous and non-ferrous metal, local as well as international, since 1995.",
    sellWhatsapp: "Hi, I'd like to sell scrap to Rayanco.",
  },
  paths: [
    { title: "Non-Ferrous Metals", text: "Copper, aluminium, brass, zinc", alt: "Copper wire scrap" },
    { title: "Metal Scrap & Surplus", text: "Beams, pipes, plates, HMS", alt: "Stacked steel beams" },
    { title: "Used Equipment", text: "Cranes, generators, loaders", alt: "Used industrial equipment" },
    { title: "Demolition & Dismantling", text: "Non-functional plants", alt: "Heavy machinery on a demolition site" },
  ],
  stats: ["Trading since 1995", "20+ steel producers supplied", "Local & international", "ISO 9001 & 14001"],
  latest: {
    eyebrow: "In stock",
    subtitle: "Used equipment currently available from our yards.",
    title: "Latest Stock",
    viewAll: "View all",
  },
  services: {
    eyebrow: "What we do",
    subtitle: "Buying and selling scrap, locally and internationally.",
    title: "Our Services",
    items: [
      {
        title: "Buying & selling of ferrous metals",
        text: "We buy and sell all kinds of ferrous scrap materials, from raw materials to finished products: HMS, shredded scrap, beams, pipes, plates and rail.",
      },
      {
        title: "Buying & selling of non-ferrous metals",
        text: "We buy and sell non-ferrous products such as zorba and all types of aluminium scrap, plus copper, brass, nickel and zinc.",
      },
      {
        title: "Buying & selling of plastic scrap",
        text: "We also buy and sell selected plastic scrap products. Contact us with the material and quantity for a quote.",
      },
      {
        title: "Metal scrap shredding",
        text: "We offer metal scrap shredding services at very affordable shredding charges.",
      },
    ],
  },
  materials: {
    eyebrow: "Materials",
    title: "What We Buy & Sell",
    text: "All used and unused ferrous and non-ferrous metals, surplus materials, heavy equipment and selected plastic scrap, in bulk and by container.",
    notListedTitle: "Don't see your material?",
    notListedText: "Send us a photo and the quantity for a quote.",
    notListedWhatsapp: "Hi Rayanco, I have material to sell. Here is a photo:",
    notListedCta: "Send a photo on WhatsApp",
    footer: "Plus selected plastic scrap and metal scrap shredding.",
    fullLine: "See our full product line",
  },
  cta: {
    text: "Have scrap or equipment to sell? Contact our team and we will make you an offer or list it for you.",
    whatsapp: "Hi Rayanco, I have scrap / equipment to sell.",
  },
  clients: { eyebrow: "Trusted by", subtitle: "Some of our esteemed clients.", title: "Our Clients" },
  about: {
    eyebrow: "Who we are",
    title: "The largest scrap buyer in Jubail",
    lead: "Rayanco is the largest scrap buyer in Jubail, Saudi Arabia. We are involved in the bulk and container trade of ferrous and non-ferrous metal, local as well as international, since 1995.",
    body: [
      "We have enduring trade ties with reputed suppliers across the UK, USA, Canada, Denmark, Russia, Dubai, several African countries and India, and we supply more than 20 steel-producing companies.",
      "We are also active in the dismantling and scrapping of non-functional plants.",
    ],
    tradeTiesLabel: "Trade ties",
    tradeTies: ["UK", "USA", "Canada", "Denmark", "Russia", "Dubai", "Africa", "India"],
    figures: ["Year founded in Saudi Arabia", "Steel producers supplied", "Trade regions worldwide"],
    more: "More about Rayanco",
    imageAlt: "Grapple loading metal scrap at a scrap yard",
    newsLabel: "Latest news",
    newsTitle: "Building Saudi Arabia's first EAF steel billet plant in Dammam.",
    newsText: "A new step from scrap trading into local steel production.",
  },
};

export type HomeCopy = typeof en;

const ar: HomeCopy = {
  meta: {
    title: "مشتري الخردة في الجبيل، المملكة العربية السعودية | Rayanco",
    description:
      "ريانكو أكبر مشترٍ للخردة في الجبيل بالمملكة العربية السعودية، نشتري ونبيع الخردة منذ عام 1995: المعادن الحديدية وغير الحديدية والمواد الفائضة والمعدات المستعملة.",
  },
  hero: {
    h1Lead: "مشتري الخردة في ",
    h1Accent: "الجبيل، المملكة العربية السعودية",
    text: "تجارة المعادن الحديدية وغير الحديدية بالجملة وبالحاويات، محليًا ودوليًا، منذ عام 1995.",
    sellWhatsapp: "مرحبًا، أرغب في بيع خردة لريانكو.",
  },
  paths: [
    { title: "المعادن غير الحديدية", text: "النحاس، الألومنيوم، النحاس الأصفر، الزنك", alt: "خردة أسلاك نحاسية" },
    { title: "خردة المعادن والفائض", text: "جسور، أنابيب، ألواح، HMS", alt: "جسور فولاذية مكدسة" },
    { title: "المعدات المستعملة", text: "رافعات، مولدات، لوادر", alt: "معدات صناعية مستعملة" },
    { title: "الهدم والتفكيك", text: "المصانع المتوقفة عن العمل", alt: "آليات ثقيلة في موقع هدم" },
  ],
  stats: ["نتاجر منذ عام 1995", "نورّد لأكثر من 20 مصنعًا للصلب", "محليًا ودوليًا", "ISO 9001 و14001"],
  latest: {
    eyebrow: "متوفر الآن",
    subtitle: "معدات مستعملة متاحة حاليًا في ساحاتنا.",
    title: "أحدث المعروضات",
    viewAll: "عرض الكل",
  },
  services: {
    eyebrow: "ماذا نقدم",
    subtitle: "شراء وبيع الخردة محليًا ودوليًا.",
    title: "خدماتنا",
    items: [
      {
        title: "شراء وبيع المعادن الحديدية",
        text: "نشتري ونبيع جميع أنواع الخردة الحديدية، من المواد الخام إلى المنتجات النهائية: خردة HMS والخردة المقطّعة والجسور والأنابيب والألواح والسكك.",
      },
      {
        title: "شراء وبيع المعادن غير الحديدية",
        text: "نشتري ونبيع المنتجات غير الحديدية مثل الزوربا وجميع أنواع خردة الألومنيوم، إضافةً إلى النحاس والنحاس الأصفر والنيكل والزنك.",
      },
      {
        title: "شراء وبيع خردة البلاستيك",
        text: "نشتري ونبيع أيضًا منتجات مختارة من خردة البلاستيك. تواصل معنا بنوع المادة وكميتها للحصول على عرض سعر.",
      },
      {
        title: "تقطيع خردة المعادن",
        text: "نقدّم خدمات تقطيع خردة المعادن بأسعار مناسبة جدًا.",
      },
    ],
  },
  materials: {
    eyebrow: "المواد",
    title: "ما نشتريه ونبيعه",
    text: "جميع المعادن الحديدية وغير الحديدية المستعملة وغير المستعملة، والمواد الفائضة، والمعدات الثقيلة، ومنتجات مختارة من خردة البلاستيك، بالجملة وبالحاويات.",
    notListedTitle: "لم تجد المادة التي لديك؟",
    notListedText: "أرسل لنا صورة والكمية لنقدّم لك عرض سعر.",
    notListedWhatsapp: "مرحبًا ريانكو، لديّ مواد للبيع. هذه صورة لها:",
    notListedCta: "أرسل صورة عبر واتساب",
    footer: "إضافةً إلى منتجات مختارة من خردة البلاستيك وخدمة تقطيع خردة المعادن.",
    fullLine: "اطّلع على جميع منتجاتنا",
  },
  cta: {
    text: "لديك خردة أو معدات للبيع؟ تواصل مع فريقنا وسنقدّم لك عرضًا أو نعرضها للبيع نيابةً عنك.",
    whatsapp: "مرحبًا ريانكو، لديّ خردة / معدات للبيع.",
  },
  clients: { eyebrow: "يثقون بنا", subtitle: "بعض عملائنا الكرام.", title: "عملاؤنا" },
  about: {
    eyebrow: "من نحن",
    title: "أكبر مشترٍ للخردة في الجبيل",
    lead: "ريانكو أكبر مشترٍ للخردة في الجبيل بالمملكة العربية السعودية. نعمل في تجارة المعادن الحديدية وغير الحديدية بالجملة وبالحاويات، محليًا ودوليًا، منذ عام 1995.",
    body: [
      "تربطنا علاقات تجارية راسخة مع موردين موثوقين في المملكة المتحدة والولايات المتحدة وكندا والدنمارك وروسيا ودبي وعدد من الدول الأفريقية والهند، ونورّد لأكثر من 20 شركة لإنتاج الصلب.",
      "كما نعمل في تفكيك المصانع المتوقفة عن العمل وتحويلها إلى خردة.",
    ],
    tradeTiesLabel: "علاقاتنا التجارية",
    tradeTies: ["المملكة المتحدة", "الولايات المتحدة", "كندا", "الدنمارك", "روسيا", "دبي", "أفريقيا", "الهند"],
    figures: ["سنة التأسيس في المملكة", "مصانع صلب نورّد لها", "مناطق تجارية حول العالم"],
    more: "المزيد عن ريانكو",
    imageAlt: "رافعة بمخلب تحمّل خردة معدنية في ساحة خردة",
    newsLabel: "آخر الأخبار",
    newsTitle: "نبني أول مصنع لإنتاج عروق الصلب بالفرن الكهربائي (EAF) في المملكة العربية السعودية في الدمام.",
    newsText: "خطوة جديدة من تجارة الخردة إلى إنتاج الصلب محليًا.",
  },
};

export const homeCopy: Record<Locale, HomeCopy> = { en, ar };
