import type { Locale } from "@/lib/i18n";

/** About page copy. TODO(owner): native Arabic review of the `ar` copy before launch. */
const en = {
  meta: {
    title: "About Us – Scrap Metal Trading & Recycling Since 1995",
    description:
      "Rayanco is one of Saudi Arabia's most reputed scrap traders, processing around 500,000 metric tons of scrap a year, with branches in Jubail, Riyadh, Dammam, Abqaiq and Jeddah.",
  },
  hero: {
    title: "About Rayanco",
    accent: "Rayanco",
    eyebrow: "Our story",
    crumb: "About",
    text: "One of the most reputed traders, suppliers, processors and recyclers of scrap for the steel industry in the Kingdom of Saudi Arabia.",
  },
  story: {
    eyebrow: "Since 1995",
    title: "Our story",
    lead: "Rayanco is one of the most reputed traders, suppliers, processors and recyclers of scrap for a number of companies in the steel industry in the Kingdom of Saudi Arabia. It is by far the largest trader of metal scrap brought into the country, processing approximately 500,000 metric tons of scrap per year.",
    body1:
      "Being reputation conscious, we trade with the most reputed suppliers and offer only superior-quality scrap. We collect many types of metal waste from our clients and customers and store it in our large yard. We weigh it accurately, then carefully segregate and categorise it using state-of-the-art equipment.",
    body2: (branches: string) =>
      `Our company is based in the Eastern Province, with branches in ${branches}. We are one of the foremost companies in this field and price competitively against international markets (LME), growing alongside the prosperity of the Kingdom.`,
    branchesLabel: "Branches",
    branches: ["Al Jubail", "Riyadh", "Dammam", "Abqaiq", "Jeddah"],
    branchSeparator: ", ",
    imageAlt: "Grapple loading metal scrap at a scrap yard",
  },
  facts: [
    { value: "1995", label: "Trading since" },
    { value: "~500,000 t", label: "Scrap processed per year" },
    { value: "20+", label: "Steel producers supplied" },
    { value: "5", label: "Branches in the Kingdom" },
  ],
  how: {
    eyebrow: "How we work",
    subtitle: "Every load follows the same careful path through our yard.",
    title: "From yard to steel mill",
    steps: [
      {
        title: "Collect",
        text: "We collect many types of metal waste from our clients and customers and store it in our large yard.",
      },
      { title: "Weigh", text: "Every load is weighed accurately on arrival." },
      {
        title: "Segregate",
        text: "Material is carefully segregated and categorised using state-of-the-art equipment.",
      },
      { title: "Process", text: "Metal scrap is shredded into quality material for steel making." },
      {
        title: "Supply",
        text: "We supply 20+ steel producers, priced competitively against international markets (LME).",
      },
    ],
  },
  vision: {
    eyebrow: "Vision",
    title: "Our vision",
    text: "As from the very beginning, our vision is to provide quality shredded material and other scrap metal products that meet our customers' quality standards. We aim to be the top-of-mind metal processing and recycling company in the Gulf region.",
  },
  clients: { eyebrow: "Trusted by", subtitle: "Some of our esteemed clients.", title: "Our clients" },
};

export type AboutCopy = typeof en;

const ar: AboutCopy = {
  meta: {
    title: "من نحن – تجارة وإعادة تدوير خردة المعادن منذ 1995",
    description:
      "ريانكو من أعرق تجار الخردة في المملكة العربية السعودية، تعالج نحو 500,000 طن متري من الخردة سنويًا، ولها فروع في الجبيل والرياض والدمام وبقيق وجدة.",
  },
  hero: {
    title: "عن ريانكو",
    accent: "ريانكو",
    eyebrow: "قصتنا",
    crumb: "من نحن",
    text: "من أعرق تجار وموردي ومعالجي ومعيدي تدوير الخردة لقطاع الصلب في المملكة العربية السعودية.",
  },
  story: {
    eyebrow: "منذ 1995",
    title: "قصتنا",
    lead: "ريانكو من أعرق تجار وموردي ومعالجي ومعيدي تدوير الخردة لعدد من شركات قطاع الصلب في المملكة العربية السعودية، وهي أكبر تاجر لخردة المعادن الواردة إلى المملكة بفارق كبير، إذ تعالج نحو 500,000 طن متري من الخردة سنويًا.",
    body1:
      "حرصًا على سمعتنا، نتعامل مع أفضل الموردين ولا نقدّم إلا خردة عالية الجودة. نجمع أنواعًا كثيرة من المخلفات المعدنية من عملائنا ونخزّنها في ساحتنا الكبيرة، ثم نزنها بدقة ونفرزها ونصنّفها بعناية باستخدام أحدث المعدات.",
    body2: (branches: string) =>
      `يقع مقر شركتنا في المنطقة الشرقية، ولنا فروع في ${branches}. نحن من الشركات الرائدة في هذا المجال، ونقدّم أسعارًا منافسة وفق الأسواق العالمية (بورصة لندن للمعادن LME)، وننمو مع ازدهار المملكة.`,
    branchesLabel: "الفروع",
    branches: ["الجبيل", "الرياض", "الدمام", "بقيق", "جدة"],
    branchSeparator: "، ",
    imageAlt: "رافعة بمخلب تحمّل خردة معدنية في ساحة خردة",
  },
  facts: [
    { value: "1995", label: "نتاجر منذ" },
    { value: "~500,000 طن", label: "خردة نعالجها سنويًا" },
    { value: "20+", label: "مصنعًا للصلب نورّد له" },
    { value: "5", label: "فروع في المملكة" },
  ],
  how: {
    eyebrow: "كيف نعمل",
    subtitle: "تمر كل شحنة بالمسار الدقيق نفسه داخل ساحتنا.",
    title: "من الساحة إلى مصنع الصلب",
    steps: [
      { title: "الجمع", text: "نجمع أنواعًا كثيرة من المخلفات المعدنية من عملائنا ونخزّنها في ساحتنا الكبيرة." },
      { title: "الوزن", text: "توزن كل شحنة بدقة عند وصولها." },
      { title: "الفرز", text: "تُفرز المواد وتُصنّف بعناية باستخدام أحدث المعدات." },
      { title: "المعالجة", text: "تُقطّع خردة المعادن لتصبح مادة عالية الجودة لصناعة الصلب." },
      { title: "التوريد", text: "نورّد لأكثر من 20 مصنعًا للصلب بأسعار منافسة وفق الأسواق العالمية (LME)." },
    ],
  },
  vision: {
    eyebrow: "الرؤية",
    title: "رؤيتنا",
    text: "منذ البداية، تتمثل رؤيتنا في تقديم مواد مقطّعة عالية الجودة وغيرها من منتجات خردة المعادن بما يلبي معايير الجودة لدى عملائنا. ونطمح أن نكون الشركة الأولى في معالجة المعادن وإعادة تدويرها في منطقة الخليج.",
  },
  clients: { eyebrow: "يثقون بنا", subtitle: "بعض عملائنا الكرام.", title: "عملاؤنا" },
};

export const aboutCopy: Record<Locale, AboutCopy> = { en, ar };
