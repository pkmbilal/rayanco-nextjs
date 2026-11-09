import type { Locale } from "@/lib/i18n";

/**
 * Copy for /services/demolition, /sell-your-equipment and /contact.
 * TODO(owner): native Arabic review of the `ar` copy before launch.
 */

const sinceEn = "Since 1995 · ISO 9001 & 14001 · ISRI member";
const sinceAr = "منذ 1995 · ISO 9001 و14001 · عضو في ISRI";

const demolitionEn = {
  meta: {
    title: "Plant Dismantling & Demolition Scrap Services in Saudi Arabia",
    description:
      "Rayanco dismantles and scraps non-functional plants and structures across Saudi Arabia, then buys and recycles the recovered steel and non-ferrous metal.",
  },
  hero: {
    title: "Dismantling & Demolition",
    accent: "Demolition",
    eyebrow: "Services",
    crumb: "Demolition",
    text: "We are active in the dismantling and scrapping of non-functional plants across Saudi Arabia, and we buy the recovered metal directly, so the scrap value offsets the cost of the work.",
    since: sinceEn,
  },
  intro: {
    eyebrow: "Turnkey dismantling",
    title: "One partner, from survey to scrap",
    lead: "When a plant or structure reaches the end of its life, Rayanco takes it down and takes it away. We dismantle non-functional plants and buy the recovered steel and non-ferrous metal ourselves, so you deal with one company instead of a contractor and a scrap buyer.",
    body: "Recovered material comes back to our yard, where it is weighed accurately and segregated before it is recycled and supplied to steel producers. Our branches across the Kingdom mean we can reach sites in the Eastern Province and beyond.",
    imageAlt: "Excavators and heavy machinery on a demolition site",
  },
  facts: [
    { value: "1995", label: "Trading since" },
    { value: "~500,000 t", label: "Scrap processed per year" },
    { value: "20+", label: "Steel producers supplied" },
    { value: "ISO", label: "9001 & 14001 certified" },
  ],
  how: {
    eyebrow: "How it works",
    subtitle: "A simple, four-step process from first visit to a clear site.",
    title: "From survey to clear site",
    steps: [
      { title: "Site survey", text: "We inspect the plant or structure and estimate the recoverable metal and equipment." },
      { title: "Offer", text: "You get a clear offer for the scrap value, the dismantling work, or both." },
      { title: "Dismantling", text: "Our team dismantles and cuts the structure, segregating ferrous and non-ferrous metal." },
      { title: "Removal & recycling", text: "Material is weighed, transported to our yard and recycled. The site is left clear." },
    ],
  },
  scope: {
    eyebrow: "Scope",
    subtitle: "From complete process plants to site camps, we dismantle and recover the metal.",
    title: "What we dismantle",
    items: [
      {
        name: "Process plants & industrial units",
        description: "Non-functional process plants, including panels, switchgear and plant equipment.",
      },
      { name: "Steel structures & warehouses", description: "Steel structures, sheds and warehouses, cut down and sorted by grade." },
      { name: "Tanks, pipelines & pipe racks", description: "Storage tanks, pipelines and pipe racks, dismantled and removed." },
      {
        name: "Heavy machinery & generators",
        description: "Heavy machinery, transformers and generators, recovered for resale or scrap.",
      },
      { name: "Scaffolding", description: "Old scaffolding, base jacks and clamps, collected in bulk." },
      { name: "Site camps & porta cabins", description: "Site camps and used porta cabins, removed and cleared." },
    ],
  },
  benefitsEyebrow: "Why Rayanco",
  benefitsTitle: "What you get",
  benefits: [
    {
      title: "Scrap value offsets the cost",
      text: "We buy the recovered metal directly, so its value is set against the cost of the dismantling work.",
    },
    {
      title: "Full segregation & recycling",
      text: "Ferrous and non-ferrous metal is segregated, weighed accurately and recycled through our yard.",
    },
    { title: "Site left clear", text: "Material is transported away and the site is left clear once the work is done." },
  ],
  clients: { eyebrow: "Trusted by", subtitle: "Some of the industry leaders we work with.", title: "Our clients" },
  jsonLd: {
    name: "Plant dismantling & demolition scrap services",
    serviceType: "Industrial dismantling and demolition",
    description:
      "Dismantling and scrapping of non-functional plants and structures across Saudi Arabia, with the recovered metal bought and recycled by Rayanco.",
    country: "Saudi Arabia",
  },
  cta: {
    title: "Have a plant to",
    accent: "dismantle?",
    text: "Send us the location and a few photos, and we will arrange a site visit.",
    whatsapp: "Hi Rayanco, I have a plant / structure to dismantle.",
  },
};

const demolitionAr: typeof demolitionEn = {
  meta: {
    title: "خدمات تفكيك المصانع والهدم وشراء الخردة في السعودية",
    description:
      "تفكك ريانكو المصانع والمنشآت المتوقفة عن العمل في جميع أنحاء المملكة العربية السعودية، ثم تشتري الصلب والمعادن غير الحديدية المستردة وتعيد تدويرها.",
  },
  hero: {
    title: "التفكيك والهدم",
    accent: "والهدم",
    eyebrow: "الخدمات",
    crumb: "الهدم والتفكيك",
    text: "نعمل في تفكيك المصانع المتوقفة عن العمل وتحويلها إلى خردة في جميع أنحاء المملكة، ونشتري المعادن المستردة مباشرةً، فتغطي قيمة الخردة تكلفة العمل.",
    since: sinceAr,
  },
  intro: {
    eyebrow: "تفكيك متكامل",
    title: "شريك واحد من المعاينة حتى الخردة",
    lead: "عندما يصل مصنع أو منشأة إلى نهاية عمرها، تتولى ريانكو تفكيكها ونقلها. نفكك المصانع المتوقفة عن العمل ونشتري الصلب والمعادن غير الحديدية المستردة بأنفسنا، فتتعامل مع شركة واحدة بدلًا من مقاول ومشترٍ للخردة.",
    body: "تعود المواد المستردة إلى ساحتنا حيث توزن بدقة وتُفرز قبل إعادة تدويرها وتوريدها لمنتجي الصلب. وبفضل فروعنا في أنحاء المملكة نصل إلى المواقع في المنطقة الشرقية وخارجها.",
    imageAlt: "حفارات وآليات ثقيلة في موقع هدم",
  },
  facts: [
    { value: "1995", label: "نتاجر منذ" },
    { value: "~500,000 طن", label: "خردة نعالجها سنويًا" },
    { value: "20+", label: "مصنعًا للصلب نورّد له" },
    { value: "ISO", label: "حاصلون على 9001 و14001" },
  ],
  how: {
    eyebrow: "كيف يعمل",
    subtitle: "عملية بسيطة من أربع خطوات، من الزيارة الأولى حتى إخلاء الموقع.",
    title: "من المعاينة حتى إخلاء الموقع",
    steps: [
      { title: "معاينة الموقع", text: "نعاين المصنع أو المنشأة ونقدّر المعادن والمعدات القابلة للاسترداد." },
      { title: "العرض", text: "تحصل على عرض واضح لقيمة الخردة أو لأعمال التفكيك أو لكليهما." },
      { title: "التفكيك", text: "يفكك فريقنا المنشأة ويقطّعها، ويفرز المعادن الحديدية عن غير الحديدية." },
      { title: "النقل وإعادة التدوير", text: "توزن المواد وتُنقل إلى ساحتنا ويعاد تدويرها، ويُترك الموقع خاليًا." },
    ],
  },
  scope: {
    eyebrow: "النطاق",
    subtitle: "من مصانع المعالجة الكاملة إلى مخيمات المواقع، نفكك المنشآت ونسترد المعادن.",
    title: "ما الذي نفككه",
    items: [
      {
        name: "مصانع المعالجة والوحدات الصناعية",
        description: "مصانع معالجة متوقفة عن العمل، بما فيها اللوحات والمفاتيح الكهربائية ومعدات المصنع.",
      },
      { name: "الهياكل الفولاذية والمستودعات", description: "هياكل فولاذية وهناجر ومستودعات، تُقطّع وتُفرز حسب الدرجة." },
      { name: "الخزانات وخطوط وحوامل الأنابيب", description: "خزانات تخزين وخطوط أنابيب وحوامل أنابيب، تُفكك وتُنقل." },
      { name: "الآليات الثقيلة والمولدات", description: "آليات ثقيلة ومحولات ومولدات، تُسترد لإعادة البيع أو كخردة." },
      { name: "السقالات", description: "سقالات قديمة وقواعد ومشابك، تُجمع بالجملة." },
      { name: "مخيمات المواقع والكبائن المتنقلة", description: "مخيمات مواقع وكبائن متنقلة مستعملة، تُنقل ويُخلى مكانها." },
    ],
  },
  benefitsEyebrow: "لماذا ريانكو",
  benefitsTitle: "ما الذي تحصل عليه",
  benefits: [
    { title: "قيمة الخردة تغطي التكلفة", text: "نشتري المعادن المستردة مباشرةً، فتُخصم قيمتها من تكلفة أعمال التفكيك." },
    { title: "فرز كامل وإعادة تدوير", text: "تُفرز المعادن الحديدية وغير الحديدية وتوزن بدقة ويعاد تدويرها في ساحتنا." },
    { title: "إخلاء الموقع", text: "تُنقل المواد ويُترك الموقع خاليًا بعد انتهاء العمل." },
  ],
  clients: { eyebrow: "يثقون بنا", subtitle: "بعض رواد القطاع الذين نعمل معهم.", title: "عملاؤنا" },
  jsonLd: {
    name: "خدمات تفكيك المصانع والهدم وشراء الخردة",
    serviceType: "التفكيك والهدم الصناعي",
    description:
      "تفكيك المصانع والمنشآت المتوقفة عن العمل وتحويلها إلى خردة في جميع أنحاء المملكة العربية السعودية، مع شراء ريانكو للمعادن المستردة وإعادة تدويرها.",
    country: "المملكة العربية السعودية",
  },
  cta: {
    title: "لديك مصنع",
    accent: "لتفكيكه؟",
    text: "أرسل لنا الموقع وبعض الصور، وسنرتّب زيارة للموقع.",
    whatsapp: "مرحبًا ريانكو، لديّ مصنع / منشأة لتفكيكها.",
  },
};

const sellEn = {
  meta: {
    title: "Sell Your Used Equipment & Scrap in Saudi Arabia",
    description:
      "Sell used heavy equipment, surplus materials or scrap metal to Rayanco in Saudi Arabia. Free site visit, fast offer and collection from Jubail, Dammam and across the Kingdom.",
  },
  hero: {
    title: "Sell Your Used Equipment & Scrap",
    eyebrow: "Sell to Rayanco",
    crumb: "Sell Your Equipment",
    text: "We buy used heavy equipment, surplus materials and scrap metal across Saudi Arabia. Tell us what you have and get a fast offer.",
    whatsapp: "Hi Rayanco, I'd like to sell equipment / scrap. Photos attached.",
    whatsappCta: "Send photos on WhatsApp",
  },
  whatTitle: "What we buy",
  what: [
    "Cranes, excavators, loaders, dozers and rollers",
    "Generators, compressors and welding machines",
    "Ferrous and non-ferrous scrap, in any quantity",
    "Surplus pipe, plate, beams and fittings",
    "Containers, porta cabins and scaffolding",
    "Whole non-functional plants for dismantling",
  ],
  howTitle: "How it works",
  steps: [
    { title: "Tell us what you have", text: "Send photos and details on WhatsApp or with the form." },
    { title: "Site visit", text: "Our team inspects the equipment or scrap at your site." },
    { title: "Get an offer", text: "We make a fair offer based on condition and current market prices." },
    { title: "Collection", text: "We pay and handle loading and transport from your site." },
  ],
  formTitle: "Request an offer",
};

const sellAr: typeof sellEn = {
  meta: {
    title: "بِع معداتك المستعملة والخردة في السعودية",
    description:
      "بِع المعدات الثقيلة المستعملة أو المواد الفائضة أو خردة المعادن لريانكو في المملكة العربية السعودية. زيارة مجانية للموقع وعرض سريع واستلام من الجبيل والدمام وجميع أنحاء المملكة.",
  },
  hero: {
    title: "بِع معداتك المستعملة والخردة",
    eyebrow: "بِع لريانكو",
    crumb: "بِع معداتك",
    text: "نشتري المعدات الثقيلة المستعملة والمواد الفائضة وخردة المعادن في جميع أنحاء المملكة. أخبرنا بما لديك واحصل على عرض سريع.",
    whatsapp: "مرحبًا ريانكو، أرغب في بيع معدات / خردة. الصور مرفقة.",
    whatsappCta: "أرسل الصور عبر واتساب",
  },
  whatTitle: "ما الذي نشتريه",
  what: [
    "الرافعات والحفارات واللوادر والجرافات والمداحل",
    "المولدات والضواغط وماكينات اللحام",
    "الخردة الحديدية وغير الحديدية، بأي كمية",
    "الأنابيب والألواح والجسور والتجهيزات الفائضة",
    "الحاويات والكبائن المتنقلة والسقالات",
    "المصانع المتوقفة عن العمل بالكامل لتفكيكها",
  ],
  howTitle: "كيف يعمل",
  steps: [
    { title: "أخبرنا بما لديك", text: "أرسل الصور والتفاصيل عبر واتساب أو من خلال النموذج." },
    { title: "زيارة الموقع", text: "يعاين فريقنا المعدات أو الخردة في موقعك." },
    { title: "احصل على عرض", text: "نقدّم عرضًا عادلًا بناءً على الحالة وأسعار السوق الحالية." },
    { title: "الاستلام", text: "ندفع ونتولى التحميل والنقل من موقعك." },
  ],
  formTitle: "اطلب عرضًا",
};

const contactEn = {
  meta: {
    title: "Contact Us – Scrap Buyer in Dammam & Jubail",
    description:
      "Contact Rayanco in Dammam, Saudi Arabia: call +966 50 974 7741, WhatsApp us or email sales@rayanco.com to sell scrap or buy metals and used equipment.",
  },
  hero: {
    title: "Contact Us",
    accent: "Us",
    eyebrow: "Get in touch",
    crumb: "Contact",
    text: "Selling scrap or buying metal and equipment? Call, WhatsApp or send us a message.",
    since: sinceEn,
  },
  quick: {
    callLabel: "Call sales",
    callHint: "Tap to call",
    whatsappLabel: "WhatsApp",
    whatsappValue: "Send photos & details",
    whatsappHint: "Chat now",
    emailLabel: "Email",
    emailHint: "Write to us",
  },
  whatsappText: "Hi Rayanco, I have an enquiry.",
  office: {
    eyebrow: "Head office",
    title: "Rayanco, Dammam",
    address: "Address",
    phone: "Phone",
    email: "Email",
    whatsapp: "WhatsApp us",
    maps: "Open in Google Maps",
    serving: "Serving Dammam, Jubail and sites across Saudi Arabia.",
  },
  form: {
    eyebrow: "Message us",
    subtitle: "Fill in the form and our sales team will get back to you.",
    title: "Send us a message",
  },
  map: {
    eyebrow: "Find us",
    subtitle: "Al-Hammam Commercial Centre, King Fahad Road, Dammam.",
    title: "Our location",
    iframeTitle: "Map showing the Rayanco office in Dammam",
  },
  help: {
    eyebrow: "How can we help?",
    subtitle: "Jump straight to what you need.",
    title: "What are you looking for?",
    learnMore: "Learn more",
    topics: [
      { title: "Sell your scrap or equipment", text: "Send photos and the location, and we will make you an offer." },
      { title: "Buy metals & materials", text: "Ferrous and non-ferrous metal, stainless steel and surplus materials." },
      { title: "Used equipment", text: "Cranes, generators, excavators and more, available to buy." },
      { title: "Plant dismantling", text: "Dismantling and scrapping of non-functional plants and structures." },
    ],
  },
  jsonLdName: "Contact Rayanco",
};

const contactAr: typeof contactEn = {
  meta: {
    title: "اتصل بنا – مشتري الخردة في الدمام والجبيل",
    description:
      "تواصل مع ريانكو في الدمام بالمملكة العربية السعودية: اتصل على ‎+966 50 974 7741 أو راسلنا عبر واتساب أو على sales@rayanco.com لبيع الخردة أو شراء المعادن والمعدات المستعملة.",
  },
  hero: {
    title: "اتصل بنا",
    accent: "بنا",
    eyebrow: "تواصل معنا",
    crumb: "اتصل بنا",
    text: "تبيع خردة أو تشتري معادن ومعدات؟ اتصل بنا أو راسلنا عبر واتساب أو أرسل لنا رسالة.",
    since: sinceAr,
  },
  quick: {
    callLabel: "اتصل بالمبيعات",
    callHint: "اضغط للاتصال",
    whatsappLabel: "واتساب",
    whatsappValue: "أرسل الصور والتفاصيل",
    whatsappHint: "تحدث الآن",
    emailLabel: "البريد الإلكتروني",
    emailHint: "راسلنا",
  },
  whatsappText: "مرحبًا ريانكو، لديّ استفسار.",
  office: {
    eyebrow: "المكتب الرئيسي",
    title: "ريانكو، الدمام",
    address: "العنوان",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    whatsapp: "راسلنا عبر واتساب",
    maps: "افتح في خرائط Google",
    serving: "نخدم الدمام والجبيل والمواقع في جميع أنحاء المملكة العربية السعودية.",
  },
  form: {
    eyebrow: "راسلنا",
    subtitle: "املأ النموذج وسيتواصل معك فريق المبيعات.",
    title: "أرسل لنا رسالة",
  },
  map: {
    eyebrow: "موقعنا",
    subtitle: "مركز الحمام التجاري، طريق الملك فهد، الدمام.",
    title: "موقعنا على الخريطة",
    iframeTitle: "خريطة توضح موقع مكتب ريانكو في الدمام",
  },
  help: {
    eyebrow: "كيف يمكننا مساعدتك؟",
    subtitle: "انتقل مباشرةً إلى ما تحتاجه.",
    title: "عمّ تبحث؟",
    learnMore: "اعرف المزيد",
    topics: [
      { title: "بِع الخردة أو المعدات", text: "أرسل الصور والموقع، وسنقدّم لك عرضًا." },
      { title: "اشترِ المعادن والمواد", text: "المعادن الحديدية وغير الحديدية والفولاذ المقاوم للصدأ والمواد الفائضة." },
      { title: "المعدات المستعملة", text: "رافعات ومولدات وحفارات وغيرها، متاحة للشراء." },
      { title: "تفكيك المصانع", text: "تفكيك المصانع والمنشآت المتوقفة عن العمل وتحويلها إلى خردة." },
    ],
  },
  jsonLdName: "اتصل بريانكو",
};

export type DemolitionCopy = typeof demolitionEn;
export type SellCopy = typeof sellEn;
export type ContactCopy = typeof contactEn;

export const demolitionCopy: Record<Locale, DemolitionCopy> = { en: demolitionEn, ar: demolitionAr };
export const sellCopy: Record<Locale, SellCopy> = { en: sellEn, ar: sellAr };
export const contactCopy: Record<Locale, ContactCopy> = { en: contactEn, ar: contactAr };
