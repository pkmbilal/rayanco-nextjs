/**
 * Arabic text for the product catalogue (content/catalog.ts). Keyed by image path (items),
 * group key (groups) and category slug (equipment). English names stay the source of truth.
 * TODO(owner): native Arabic review of all names and descriptions before launch.
 */

type ItemAr = { name: string; description: string };

const P = "/assets/images/Products";
const NF = "/assets/images/Non_Ferrous_Metals";
const MS = "/assets/images/Metal_Scrap_Surplus_Materials";
const EQ = "/assets/images/Equipment_Resale";

export const itemsAr: Record<string, ItemAr> = {
  // /products
  [`${P}/Adjustable_Base_Jack.webp`]: { name: "قواعد سقالات قابلة للتعديل", description: "قواعد رفع للسقالات مستعملة وفائضة، نشتريها ونبيعها بالجملة." },
  [`${P}/Aluminium_Ladders.webp`]: { name: "سلالم ألومنيوم", description: "سلالم ألومنيوم مستعملة لإعادة البيع أو لإعادة التدوير كخردة ألومنيوم." },
  [`${P}/Aluminium_Scrap.webp`]: { name: "خردة الألومنيوم", description: "جميع درجات خردة الألومنيوم، بما فيها المقاطع والألواح والمسبوكات." },
  [`${P}/Auto_Batteries_Scrap.webp`]: { name: "خردة بطاريات السيارات", description: "بطاريات رصاص حمضية مستعملة تُجمع لإعادة التدوير." },
  [`${P}/Big_Pipes.webp`]: { name: "أنابيب كبيرة", description: "أنابيب فولاذية كبيرة القطر من المشاريع والمصانع وخطوط الأنابيب." },
  [`${P}/Billets.webp`]: { name: "عروق الصلب (بيلت)", description: "عروق صلب لإعادة الدرفلة وللتوريد إلى منتجي الصلب." },
  [`${P}/Bolts_n_Screws.webp`]: { name: "مسامير وبراغي", description: "مثبتات فائضة وخردة، مختلطة أو مفروزة." },
  [`${P}/Brass_Scrap.webp`]: { name: "خردة النحاس الأصفر", description: "تجهيزات وصمامات وبرادة نحاس أصفر وخردة نحاس أصفر مختلطة." },
  [`${P}/Cables.webp`]: { name: "كابلات", description: "كابلات طاقة وتحكم مستعملة وفائضة بقلب من النحاس أو الألومنيوم." },
  [`${P}/Clamps.webp`]: { name: "مشابك", description: "وصلات ومشابك سقالات، مستعملة أو فائضة." },
  [`${P}/Containers.webp`]: { name: "حاويات", description: "حاويات شحن وتخزين مستعملة لإعادة البيع أو كخردة." },
  [`${P}/Copper_Berry_Cable.webp`]: { name: "كابل نحاس بيري", description: "سلك نحاس عارٍ لامع (درجة بيري)، من أعلى درجات النحاس قيمة." },
  [`${P}/CS_Pipes.webp`]: { name: "أنابيب الصلب الكربوني", description: "أنابيب صلب كربوني، فائض جديد أو مستعمل، بجميع المقاسات." },
  [`${P}/E_Waste.webp`]: { name: "النفايات الإلكترونية", description: "خردة إلكترونية ولوحات دوائر ومعدات تقنية لاستخلاص المعادن." },
  [`${P}/Elbows.webp`]: { name: "أكواع", description: "أكواع وتجهيزات أنابيب فائضة من الصلب الكربوني والمقاوم للصدأ." },
  [`${P}/Fence.webp`]: { name: "أسوار", description: "ألواح وشبك أسوار فولاذية مستعملة من المواقع والمنشآت." },
  [`${P}/Fence_Gate.webp`]: { name: "بوابات أسوار", description: "بوابات أسوار فولاذية لإعادة البيع أو لإعادة التدوير." },
  [`${P}/Ferrous_Metal_Scrap.webp`]: { name: "خردة المعادن الحديدية", description: "خردة حديدية مختلطة، من الحديد الخفيف إلى خردة الصهر الثقيلة." },
  [`${P}/Fibre_Glass.webp`]: { name: "الألياف الزجاجية", description: "خزانات وأنابيب وألواح من الألياف الزجاجية من المنشآت المفككة." },
  [`${P}/Flanges.webp`]: { name: "شفات (فلنجات)", description: "شفات فولاذية فائضة ومستعملة بتصنيفات ضغط متعددة." },
  [`${P}/Generators.webp`]: { name: "مولدات", description: "مجموعات توليد مستعملة لإعادة البيع أو كقطع غيار أو خردة." },
  [`${P}/Granular_Copper.webp`]: { name: "النحاس الحبيبي", description: "نحاس محبب مستخلص من معالجة الكابلات." },
  [`${P}/Iron_Beems.webp`]: { name: "جسور حديدية", description: "جسور فولاذية إنشائية مستعملة وفائضة." },
  [`${P}/Light_Poles.webp`]: { name: "أعمدة إنارة", description: "أعمدة إنارة فولاذية للشوارع والمواقع، مستعملة أو فائضة." },
  [`${P}/Nickel_Scrap.webp`]: { name: "خردة النيكل", description: "خردة النيكل وسبائك النيكل." },
  [`${P}/Office_Portable_Cabins.webp`]: { name: "كبائن مكتبية متنقلة", description: "كبائن متنقلة ومكاتب مواقع مستعملة لإعادة البيع." },
  [`${P}/Panel_Boards.webp`]: { name: "لوحات كهربائية", description: "لوحات توزيع كهربائية ومفاتيح لإعادة البيع أو لاستخلاص المعادن." },
  [`${P}/Radiators.webp`]: { name: "مشعات (رادياتير)", description: "مشعات نحاس وألومنيوم من المركبات والمعدات." },
  [`${P}/Rebars.webp`]: { name: "حديد التسليح", description: "قضبان حديد تسليح فائضة وخردة." },
  [`${P}/Stainless_Steel.webp`]: { name: "الفولاذ المقاوم للصدأ", description: "أنابيب ولفائف وألواح وقضبان وعروق من الفولاذ المقاوم للصدأ." },
  [`${P}/Steel_Plates.webp`]: { name: "ألواح الصلب", description: "ألواح صلب مستعملة وفائضة بسماكات مختلفة." },
  [`${P}/Wooden_Boards.webp`]: { name: "ألواح خشبية", description: "ألواح سقالات وأخشاب مستعملة من مواقع المشاريع." },

  // /products/non-ferrous-metals
  [`${NF}/Alloy_Steel.webp`]: { name: "الصلب السبائكي", description: "خردة وفائض الصلب السبائكي، مفروزة حسب الدرجة." },
  [`${NF}/Aluminium.webp`]: { name: "الألومنيوم", description: "خردة الألومنيوم بما فيها الزوربا والمقاطع والألواح والمسبوكات." },
  [`${NF}/Brass.webp`]: { name: "النحاس الأصفر", description: "خردة النحاس الأصفر والأحمر وتجهيزاته وبرادته." },
  [`${NF}/Bronz.webp`]: { name: "البرونز", description: "خردة البرونز من المحامل والجلب والتجهيزات البحرية." },
  [`${NF}/Copper.webp`]: { name: "النحاس", description: "أسلاك وأنابيب وكابلات النحاس وخردة النحاس المختلطة." },
  [`${NF}/Galvanized_Steel.webp`]: { name: "الصلب المجلفن", description: "ألواح وهياكل وخردة الصلب المطلي بالزنك." },
  [`${NF}/lead.webp`]: { name: "الرصاص", description: "خردة الرصاص من البطاريات والأغلفة والرصاص الطري." },
  [`${NF}/Stainless_Steel.webp`]: { name: "الفولاذ المقاوم للصدأ", description: "خردة الفولاذ المقاوم للصدأ بدرجات 304 و316 وغيرها." },
  [`${NF}/Tin.webp`]: { name: "القصدير", description: "القصدير والخردة الحاوية على القصدير." },
  [`${NF}/Tool_Steel.webp`]: { name: "صلب العدد", description: "خردة وقصاصات صلب العدد عالي السبائك." },
  [`${NF}/Zinc.webp`]: { name: "الزنك", description: "مسبوكات وألواح وخبث الزنك." },

  // /products/metal-scrap-surplus
  [`${MS}/Beam.webp`]: { name: "الجسور", description: "جسور H وI من المخزون الفائض والهياكل المفككة." },
  [`${MS}/Carbon-Steel.webp`]: { name: "الصلب الكربوني", description: "مقاطع وألواح وخردة الصلب الكربوني." },
  [`${MS}/Coil.webp`]: { name: "اللفائف", description: "لفائف الصلب والفولاذ المقاوم للصدأ، فائضة أو من الدرجة الثانية." },
  [`${MS}/MS-Pipes.webp`]: { name: "أنابيب الصلب الطري", description: "أنابيب صلب طري بأقطار وأطوال متنوعة." },
  [`${MS}/Seamless-Pipe.webp`]: { name: "أنابيب غير ملحومة", description: "أنابيب غير ملحومة فائضة من مشاريع النفط والغاز والمعالجة." },
  [`${MS}/Seamless-Plate.webp`]: { name: "ألواح صلب", description: "ألواح صلب فائضة من مخزون التصنيع والمشاريع." },

  // Equipment types (used for category fallbacks)
  [`${EQ}/Asphalt_Concrete_Plant.webp`]: { name: "محطة خلط الأسفلت", description: "محطات أسفلت بنظام الدفعات والأسطوانة لإنشاء الطرق." },
  [`${EQ}/Compressor.webp`]: { name: "ضواغط الهواء", description: "ضواغط هواء متنقلة وثابتة." },
  [`${EQ}/Concrete_Pumps.webp`]: { name: "مضخات الخرسانة", description: "مضخات خرسانة محمولة على شاحنات أو مقطورات." },
  [`${EQ}/Crane_Barge.webp`]: { name: "البوارج الرافعة", description: "بوارج رافعة عائمة لأعمال البحر والموانئ." },
  [`${EQ}/Cranes.webp`]: { name: "الرافعات", description: "رافعات متحركة وزاحفة ورافعات للطرق الوعرة." },
  [`${EQ}/Dozer.webp`]: { name: "الجرافات (البلدوزر)", description: "جرافات زاحفة لأعمال الحفر ونقل التربة." },
  [`${EQ}/Generators.webp`]: { name: "المولدات", description: "مولدات ديزل بقدرات متعددة بالكيلوفولت أمبير." },
  [`${EQ}/Hydrolic_Excavator.webp`]: { name: "الحفارات الهيدروليكية", description: "حفارات هيدروليكية زاحفة وذات عجلات." },
  [`${EQ}/Piling_Rigs.webp`]: { name: "حفارات الخوازيق", description: "حفارات خوازيق دوارة وطرقية لأعمال الأساسات." },
  [`${EQ}/Road_Paver.webp`]: { name: "فرادات الأسفلت", description: "فرادات وماكينات تشطيب الأسفلت." },
  [`${EQ}/Road_Roller.webp`]: { name: "مداحل الطرق", description: "مداحل ترادفية وهوائية وأحادية الأسطوانة." },
  [`${EQ}/Tower_Cranes.webp`]: { name: "الرافعات البرجية", description: "رافعات برجية للمباني العالية والمشاريع الصناعية." },
  [`${EQ}/Vibratory_Compactor.webp`]: { name: "الهزازات الضاغطة", description: "هزازات ضاغطة للتربة وضاغطات لوحية." },
  [`${EQ}/Welding_Machines.webp`]: { name: "ماكينات اللحام", description: "ماكينات لحام تعمل بمحرك أو بالكهرباء." },
  [`${EQ}/Wheel_Loader.webp`]: { name: "اللوادر ذات العجلات", description: "لوادر أمامية بعجلات لمناولة المواد." },
};

/** Arabic category names by slug (fallback while `categories.name_ar` is empty). */
const equipmentNamesAr: Record<string, string> = {
  "asphalt-concrete-plants": "محطات خلط الأسفلت",
  compressors: "ضواغط الهواء",
  "concrete-pumps": "مضخات الخرسانة",
  "crane-barges": "البوارج الرافعة",
  cranes: "الرافعات",
  dozers: "الجرافات (البلدوزر)",
  generators: "المولدات",
  "hydraulic-excavators": "الحفارات الهيدروليكية",
  "piling-rigs": "حفارات الخوازيق",
  "road-pavers": "فرادات الأسفلت",
  "road-rollers": "مداحل الطرق",
  "tower-cranes": "الرافعات البرجية",
  "vibratory-compactors": "الهزازات الضاغطة",
  "welding-machines": "ماكينات اللحام",
  "wheel-loaders": "اللوادر ذات العجلات",
};

export function categoryNameAr(slug: string): string | undefined {
  return equipmentNamesAr[slug];
}

/** Group titles and intros by group key (products, non-ferrous and metal-scrap groups). */
export const groupsAr: Record<string, { title: string; intro: string }> = {
  "non-ferrous": {
    title: "المعادن غير الحديدية وخردة النحاس",
    intro: "درجات النحاس والألومنيوم والنحاس الأصفر والنيكل، إضافةً إلى الكابلات والمشعات والبطاريات لاستخلاص المعادن.",
  },
  "ferrous-steel": {
    title: "المعادن الحديدية والصلب الإنشائي",
    intro: "خردة الصهر الثقيلة والخردة الحديدية المختلطة والعروق والمقاطع الإنشائية لمنتجي الصلب ومصانع إعادة الدرفلة.",
  },
  "pipes-fittings": {
    title: "الأنابيب والتجهيزات",
    intro: "أنابيب وتجهيزات ومثبتات فائضة ومستعملة من مشاريع النفط والغاز والمعالجة والإنشاءات.",
  },
  "scaffolding-site": {
    title: "السقالات ومواد المواقع",
    intro: "مكونات السقالات والأسوار ومواد المواقع المستردة من المشاريع المنجزة.",
  },
  "equipment-cabins": {
    title: "المعدات والكهربائيات والكبائن",
    intro: "مولدات ولوحات كهربائية ونفايات إلكترونية وحاويات وكبائن متنقلة لإعادة البيع أو قطع الغيار أو إعادة التدوير.",
  },
  "copper-alloys": {
    title: "النحاس وسبائكه",
    intro: "أسلاك وأنابيب وكابلات النحاس، إضافةً إلى تجهيزات وصمامات ومحامل وبرادة النحاس الأصفر والبرونز.",
  },
  "aluminium-base-metals": {
    title: "الألومنيوم والمعادن الأساسية",
    intro: "الألومنيوم بما فيه الزوربا والمقاطع والمسبوكات، إضافةً إلى خردة الزنك والرصاص والقصدير.",
  },
  "specialty-steels": {
    title: "الفولاذ المقاوم للصدأ والأنواع الخاصة",
    intro: "الفولاذ المقاوم للصدأ والصلب السبائكي وصلب العدد مفروزة حسب الدرجة، إضافةً إلى ألواح وهياكل الصلب المجلفن.",
  },
  "structural-plate": {
    title: "الصلب الإنشائي والألواح",
    intro: "جسور H وI ومقاطع وألواح الصلب الكربوني من المخزون الفائض والهياكل المفككة.",
  },
  "pipe-coil": {
    title: "الأنابيب واللفائف",
    intro: "أنابيب الصلب الطري والأنابيب غير الملحومة من مشاريع النفط والغاز والمعالجة، إضافةً إلى لفائف الصلب والفولاذ المقاوم للصدأ.",
  },
};

/** Homepage materials list: titles and items in the same order as `materialGroups` (do not drop items). */
export const materialGroupsAr: Record<string, { title: string; items: string[] }> = {
  "non-ferrous": { title: "المعادن غير الحديدية", items: ["النحاس", "الألومنيوم", "النحاس الأصفر", "النيكل", "الزنك"] },
  "ferrous-scrap": {
    title: "الخردة الحديدية",
    items: [
      "خردة المعادن الثقيلة (HMS)", "الخردة الحديدية", "خردة الصلب المقطّعة", "خردة الجلب المقطّعة",
      "السيارات الحديدية التالفة", "مسبوكات الآلات المكسورة",
    ],
  },
  stainless: {
    title: "الفولاذ المقاوم للصدأ",
    items: [
      "فولاذ مقاوم للصدأ مدرفل على الساخن", "أنابيب SS", "لفائف SS", "ألواح SS", "قضبان SS لامعة", "قضبان SS سداسية",
      "قضبان SS مربعة", "عروق SS", "مخلفات وخردة SS",
    ],
  },
  structural: {
    title: "الصلب الإنشائي والسكك",
    items: [
      "جسور H", "جسور I", "زوايا", "مجاري C", "أنابيب", "ألواح", "ألواح صخرية", "أنابيب صلب مجوفة", "مواسير صلب",
      "أعمدة كهرباء", "ألواح سكك مستعملة", "عجلات قطارات", "سقالات قديمة", "مشابك سقالات (MS)",
    ],
  },
  equipment: {
    title: "المعدات والفائض",
    items: ["الآلات الثقيلة", "المحولات", "المولدات", "الحاويات", "الكبائن المتنقلة المستعملة"],
  },
};
