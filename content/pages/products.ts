import type { Locale } from "@/lib/i18n";

/**
 * Copy for /products, /products/non-ferrous-metals and /products/metal-scrap-surplus.
 * TODO(owner): native Arabic review of the `ar` copy before launch.
 */

const sharedEn = {
  since: "Since 1995 · ISO 9001 & 14001 · ISRI member",
  productsCrumb: "Products",
  productsEyebrow: "Products",
  tradingSince: "Trading since",
  steelProducers: "Steel producers supplied",
  bulk: "Bulk",
  bulkLabel: "and container, local & international",
  whatYouGet: "What you get",
};

const sharedAr: typeof sharedEn = {
  since: "منذ 1995 · ISO 9001 و14001 · عضو في ISRI",
  productsCrumb: "المنتجات",
  productsEyebrow: "المنتجات",
  tradingSince: "نتاجر منذ",
  steelProducers: "مصنعًا للصلب نورّد له",
  bulk: "بالجملة",
  bulkLabel: "وبالحاويات، محليًا ودوليًا",
  whatYouGet: "ما الذي تحصل عليه",
};

const productsEn = {
  meta: {
    title: "Scrap Metal Products & Surplus Materials in Saudi Arabia",
    description:
      "Rayanco's product line: aluminium, copper, brass, nickel and ferrous scrap, pipes, beams, plates, rebars, cables, generators, containers and porta cabins in Jubail and Dammam.",
  },
  hero: {
    title: "Products",
    eyebrow: "Our product line",
    text: "Our product line consists of the following scrap, surplus and used materials. We buy and sell in bulk and in containers, locally and internationally.",
  },
  cards: [
    { title: "Non-Ferrous Metals", text: "Copper, aluminium, brass, bronze, zinc and more.", meta: (n: number) => `${n} metals` },
    {
      title: "Metal Scrap & Surplus",
      text: "Beams, coils, plate and seamless pipe from project surplus.",
      meta: (n: number) => `${n} materials`,
    },
    {
      title: "Used Equipment",
      text: "Cranes, excavators, generators and heavy plant for sale.",
      meta: (n: number) => `${n} categories`,
    },
  ],
  productLines: "Product lines",
  bulkLabel: "and container, local and international",
  groupNav: "Product groups",
  groupEyebrow: (n: number) => `${n} materials`,
  viewAll: "View all",
  cta: { title: "Need a price?", text: "Send us the material, grade and quantity and we will quote you quickly." },
};

const productsAr: typeof productsEn = {
  meta: {
    title: "منتجات خردة المعادن والمواد الفائضة في السعودية",
    description:
      "منتجات ريانكو: خردة الألومنيوم والنحاس والنحاس الأصفر والنيكل والخردة الحديدية، والأنابيب والجسور والألواح وحديد التسليح والكابلات والمولدات والحاويات والكبائن المتنقلة في الجبيل والدمام.",
  },
  hero: {
    title: "المنتجات",
    eyebrow: "منتجاتنا",
    text: "تتكون منتجاتنا من مواد الخردة والفائض والمواد المستعملة التالية. نشتري ونبيع بالجملة وبالحاويات، محليًا ودوليًا.",
  },
  cards: [
    {
      title: "المعادن غير الحديدية",
      text: "النحاس والألومنيوم والنحاس الأصفر والبرونز والزنك وغيرها.",
      meta: (n: number) => `${n} معدنًا`,
    },
    {
      title: "خردة المعادن والفائض",
      text: "جسور ولفائف وألواح وأنابيب غير ملحومة من فائض المشاريع.",
      meta: (n: number) => `${n} مواد`,
    },
    {
      title: "المعدات المستعملة",
      text: "رافعات وحفارات ومولدات ومعدات ثقيلة للبيع.",
      meta: (n: number) => `${n} فئة`,
    },
  ],
  productLines: "خط إنتاج",
  bulkLabel: "وبالحاويات، محليًا ودوليًا",
  groupNav: "مجموعات المنتجات",
  groupEyebrow: (n: number) => `${n} مواد`,
  viewAll: "عرض الكل",
  cta: { title: "تحتاج إلى سعر؟", text: "أرسل لنا نوع المادة ودرجتها وكميتها وسنقدّم لك عرض سعر بسرعة." },
};

const nonFerrousEn = {
  meta: {
    title: "Non-Ferrous Metal Scrap Buyer in Saudi Arabia",
    description:
      "Rayanco buys and sells non-ferrous metals in Saudi Arabia: copper, aluminium and zorba, brass, bronze, lead, zinc, tin, stainless, alloy and tool steel.",
  },
  hero: {
    title: "Non-Ferrous Metals",
    accent: "Non-Ferrous",
    crumb: "Non-Ferrous Metals",
    text: "We have a large inventory of non-ferrous metals and buy non-ferrous scrap in any quantity, from single lots to containers.",
  },
  intro: {
    eyebrow: "Non-ferrous trading",
    title: "Copper, aluminium, brass and more, in any quantity",
    lead: "Rayanco buys and sells non-ferrous metal in bulk and in containers, locally and internationally, and has done so since 1995. From copper cable and aluminium zorba to brass turnings and stainless offcuts, we grade it, price it and take it away.",
    body: "Recovered metal is segregated by grade at our yard and supplied to more than 20 steel-producing companies and to buyers abroad, so you get a fair price for what you have.",
    imageAlt: "Sorted copper, aluminium and brass scrap",
  },
  factLabel: "Non-ferrous metals traded",
  groupEyebrow: (n: number) => `${n} metals`,
  how: {
    eyebrow: "How we buy",
    subtitle: "Four simple steps from your first message to collection.",
    title: "Selling non-ferrous scrap to Rayanco",
    steps: [
      {
        title: "Send the details",
        text: "Share the metal, grade, approximate quantity and a few photos on WhatsApp or by phone.",
      },
      {
        title: "Grading & sorting",
        text: "We identify the grade and check the material so the price reflects what you actually have.",
      },
      { title: "Offer", text: "You get a clear offer based on the grade and current market prices." },
      {
        title: "Weighing & collection",
        text: "Material is weighed accurately and collected, from single lots up to full containers.",
      },
    ],
  },
  benefitsEyebrow: "Why Rayanco",
  benefits: [
    { title: "Any quantity", text: "We buy non-ferrous scrap in any quantity, from single lots to full containers." },
    {
      title: "Local & international trade",
      text: "Trade ties with suppliers in the UK, USA, Canada, Denmark, Russia, Dubai, Africa and India.",
    },
    {
      title: "Accurate weighing & segregation",
      text: "Material is weighed accurately and segregated by metal and grade before it is recycled.",
    },
  ],
  itemListName: "Non-ferrous metals bought and sold by Rayanco",
  cta: {
    title: "Have non-ferrous scrap to",
    accent: "sell?",
    text: "Send us the metal, grade and quantity, and we will quote you quickly.",
    whatsapp: "Hi Rayanco, I'd like a quote for non-ferrous metal.",
  },
};

const nonFerrousAr: typeof nonFerrousEn = {
  meta: {
    title: "مشتري خردة المعادن غير الحديدية في السعودية",
    description:
      "تشتري ريانكو وتبيع المعادن غير الحديدية في المملكة العربية السعودية: النحاس والألومنيوم والزوربا والنحاس الأصفر والبرونز والرصاص والزنك والقصدير والفولاذ المقاوم للصدأ والصلب السبائكي وصلب العدد.",
  },
  hero: {
    title: "المعادن غير الحديدية",
    accent: "غير الحديدية",
    crumb: "المعادن غير الحديدية",
    text: "لدينا مخزون كبير من المعادن غير الحديدية، ونشتري خردتها بأي كمية، من الدفعات الصغيرة إلى الحاويات.",
  },
  intro: {
    eyebrow: "تجارة المعادن غير الحديدية",
    title: "النحاس والألومنيوم والنحاس الأصفر وغيرها، بأي كمية",
    lead: "تشتري ريانكو وتبيع المعادن غير الحديدية بالجملة وبالحاويات، محليًا ودوليًا، منذ عام 1995. من كابلات النحاس وزوربا الألومنيوم إلى برادة النحاس الأصفر وقصاصات الفولاذ المقاوم للصدأ، نحدد الدرجة ونسعّرها وننقلها.",
    body: "تُفرز المعادن المستردة حسب الدرجة في ساحتنا وتُورّد لأكثر من 20 شركة لإنتاج الصلب وللمشترين في الخارج، لتحصل على سعر عادل لما لديك.",
    imageAlt: "خردة نحاس وألومنيوم ونحاس أصفر مفروزة",
  },
  factLabel: "معدنًا غير حديدي نتاجر فيه",
  groupEyebrow: (n: number) => `${n} معادن`,
  how: {
    eyebrow: "كيف نشتري",
    subtitle: "أربع خطوات بسيطة من رسالتك الأولى حتى الاستلام.",
    title: "بيع خردة المعادن غير الحديدية لريانكو",
    steps: [
      { title: "أرسل التفاصيل", text: "شاركنا نوع المعدن ودرجته وكميته التقريبية وبعض الصور عبر واتساب أو الهاتف." },
      { title: "التصنيف والفرز", text: "نحدد الدرجة ونفحص المادة ليعكس السعر ما لديك فعلًا." },
      { title: "العرض", text: "تحصل على عرض واضح بناءً على الدرجة وأسعار السوق الحالية." },
      { title: "الوزن والاستلام", text: "توزن المادة بدقة وتُستلم، من الدفعات الصغيرة حتى الحاويات الكاملة." },
    ],
  },
  benefitsEyebrow: "لماذا ريانكو",
  benefits: [
    { title: "أي كمية", text: "نشتري خردة المعادن غير الحديدية بأي كمية، من الدفعات الصغيرة إلى الحاويات الكاملة." },
    {
      title: "تجارة محلية ودولية",
      text: "علاقات تجارية مع موردين في المملكة المتحدة والولايات المتحدة وكندا والدنمارك وروسيا ودبي وأفريقيا والهند.",
    },
    { title: "وزن وفرز دقيقان", text: "توزن المواد بدقة وتُفرز حسب المعدن والدرجة قبل إعادة تدويرها." },
  ],
  itemListName: "المعادن غير الحديدية التي تشتريها ريانكو وتبيعها",
  cta: {
    title: "لديك خردة معادن غير حديدية",
    accent: "للبيع؟",
    text: "أرسل لنا نوع المعدن ودرجته وكميته، وسنقدّم لك عرض سعر بسرعة.",
    whatsapp: "مرحبًا ريانكو، أرغب في عرض سعر لمعادن غير حديدية.",
  },
};

const metalScrapEn = {
  meta: {
    title: "Metal Scrap & Surplus Materials in Saudi Arabia",
    description:
      "Surplus steel from Rayanco in Jubail and Dammam: beams, carbon steel, coils, MS pipes, seamless pipe and plate, from project and plant surplus.",
  },
  hero: {
    title: "Metal Scrap & Surplus Materials",
    accent: "Surplus Materials",
    crumb: "Metal Scrap & Surplus",
    text: "We have a large inventory of surplus materials from projects, plants and fabrication yards, available for resale or as scrap.",
  },
  intro: {
    eyebrow: "Surplus steel",
    title: "Beams, pipe, plate and coil, ready to inspect",
    lead: "When projects finish and plants are dismantled, good steel is left over. Rayanco buys that surplus and keeps it in stock in the Eastern Province, so you can buy structural sections, pipe, plate and coil without the cost or lead time of new material.",
    body: "What can't be reused is graded and supplied as scrap to more than 20 steel-producing companies, in bulk and in containers, locally and internationally.",
    imageAlt: "Surplus steel beams and pipe in a scrap yard",
  },
  factLabel: "Surplus product lines",
  groupEyebrow: (n: number) => `${n} product lines`,
  how: {
    eyebrow: "How it works",
    subtitle: "Four simple steps from your first message to dispatch.",
    title: "Buying surplus steel from Rayanco",
    steps: [
      {
        title: "Send your requirement",
        text: "Tell us the material, size or grade and quantity you need on WhatsApp or by phone.",
      },
      {
        title: "Stock & specs",
        text: "We check what we have in stock and send you photos, dimensions and available quantities.",
      },
      { title: "Quote", text: "You get a clear price for the lot, for resale use or as scrap." },
      {
        title: "Inspection & dispatch",
        text: "Inspect the material at our yard, then we weigh, load and dispatch it to you.",
      },
    ],
  },
  benefitsEyebrow: "Why surplus",
  benefits: [
    {
      title: "Project & plant surplus",
      text: "Steel from projects, plants and fabrication yards, often unused, at well below the price of new stock.",
    },
    {
      title: "Ready stock, no lead time",
      text: "Material is already in Saudi Arabia, so you can inspect it and take it away without waiting on a mill.",
    },
    {
      title: "We buy surplus too",
      text: "Have leftover beams, pipe or plate after a project? We buy surplus and scrap steel in any quantity.",
    },
  ],
  itemListName: "Metal scrap and surplus materials from Rayanco",
  cta: {
    title: "Need steel, pipe or plate from",
    accent: "surplus?",
    text: "Send us the size, grade and quantity you need, and we will check our stock and quote you quickly.",
    whatsapp: "Hi Rayanco, I'm interested in your surplus steel materials.",
  },
};

const metalScrapAr: typeof metalScrapEn = {
  meta: {
    title: "خردة المعادن والمواد الفائضة في السعودية",
    description:
      "صلب فائض من ريانكو في الجبيل والدمام: جسور وصلب كربوني ولفائف وأنابيب صلب طري وأنابيب وألواح غير ملحومة من فائض المشاريع والمصانع.",
  },
  hero: {
    title: "خردة المعادن والمواد الفائضة",
    accent: "المواد الفائضة",
    crumb: "خردة المعادن والفائض",
    text: "لدينا مخزون كبير من المواد الفائضة من المشاريع والمصانع وساحات التصنيع، متاحة لإعادة البيع أو كخردة.",
  },
  intro: {
    eyebrow: "الصلب الفائض",
    title: "جسور وأنابيب وألواح ولفائف جاهزة للمعاينة",
    lead: "عند انتهاء المشاريع وتفكيك المصانع يتبقى صلب جيد. تشتري ريانكو هذا الفائض وتحتفظ به في مخزونها بالمنطقة الشرقية، لتتمكن من شراء المقاطع الإنشائية والأنابيب والألواح واللفائف دون تكلفة المواد الجديدة أو انتظار توريدها.",
    body: "أما ما لا يمكن إعادة استخدامه فيُصنّف ويُورّد كخردة لأكثر من 20 شركة لإنتاج الصلب، بالجملة وبالحاويات، محليًا ودوليًا.",
    imageAlt: "جسور وأنابيب صلب فائضة في ساحة خردة",
  },
  factLabel: "خطوط منتجات فائضة",
  groupEyebrow: (n: number) => `${n} خطوط منتجات`,
  how: {
    eyebrow: "كيف يعمل",
    subtitle: "أربع خطوات بسيطة من رسالتك الأولى حتى الشحن.",
    title: "شراء الصلب الفائض من ريانكو",
    steps: [
      { title: "أرسل طلبك", text: "أخبرنا بالمادة والمقاس أو الدرجة والكمية التي تحتاجها عبر واتساب أو الهاتف." },
      { title: "المخزون والمواصفات", text: "نتحقق من المتوفر لدينا ونرسل لك الصور والأبعاد والكميات المتاحة." },
      { title: "عرض السعر", text: "تحصل على سعر واضح للدفعة، لإعادة الاستخدام أو كخردة." },
      { title: "المعاينة والشحن", text: "عاين المواد في ساحتنا، ثم نزنها ونحمّلها ونشحنها إليك." },
    ],
  },
  benefitsEyebrow: "لماذا الفائض",
  benefits: [
    {
      title: "فائض المشاريع والمصانع",
      text: "صلب من المشاريع والمصانع وساحات التصنيع، غالبًا غير مستعمل، بسعر أقل بكثير من المخزون الجديد.",
    },
    {
      title: "مخزون جاهز دون انتظار",
      text: "المواد موجودة بالفعل في المملكة، فيمكنك معاينتها واستلامها دون انتظار مصنع الدرفلة.",
    },
    {
      title: "نشتري الفائض أيضًا",
      text: "لديك جسور أو أنابيب أو ألواح متبقية بعد مشروع؟ نشتري الصلب الفائض والخردة بأي كمية.",
    },
  ],
  itemListName: "خردة المعادن والمواد الفائضة من ريانكو",
  cta: {
    title: "تحتاج إلى صلب أو أنابيب أو ألواح",
    accent: "من الفائض؟",
    text: "أرسل لنا المقاس والدرجة والكمية التي تحتاجها، وسنتحقق من مخزوننا ونقدّم لك عرض سعر بسرعة.",
    whatsapp: "مرحبًا ريانكو، أنا مهتم بمواد الصلب الفائضة لديكم.",
  },
};

export type ProductsShared = typeof sharedEn;
export type ProductsCopy = typeof productsEn;
export type ProductDetailCopy = typeof nonFerrousEn;

export const productsSharedCopy: Record<Locale, ProductsShared> = { en: sharedEn, ar: sharedAr };
export const productsCopy: Record<Locale, ProductsCopy> = { en: productsEn, ar: productsAr };
export const nonFerrousCopy: Record<Locale, ProductDetailCopy> = { en: nonFerrousEn, ar: nonFerrousAr };
export const metalScrapCopy: Record<Locale, ProductDetailCopy> = { en: metalScrapEn, ar: metalScrapAr };
