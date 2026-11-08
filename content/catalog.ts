/**
 * Product catalogue reproduced from the legacy site (content/legacy/*.md).
 * Image paths are unchanged so old image URLs keep ranking. All legacy images are 300×300 WebP.
 */
export type CatalogItem = {
  name: string;
  image: string;
  description: string;
};

export const CATALOG_IMAGE_SIZE = 300;

const P = "/assets/images/Products";
const NF = "/assets/images/Non_Ferrous_Metals";
const MS = "/assets/images/Metal_Scrap_Surplus_Materials";

/** /products — 32 items, same order as the legacy page. */
export const products: CatalogItem[] = [
  { name: "Adjustable Base Jack", image: `${P}/Adjustable_Base_Jack.webp`, description: "Used and surplus scaffolding base jacks, bought and sold in bulk." },
  { name: "Aluminium Ladders", image: `${P}/Aluminium_Ladders.webp`, description: "Used aluminium ladders for resale or recycling as aluminium scrap." },
  { name: "Aluminium Scrap", image: `${P}/Aluminium_Scrap.webp`, description: "All grades of aluminium scrap, including extrusions, sheet and cast." },
  { name: "Auto Batteries Scrap", image: `${P}/Auto_Batteries_Scrap.webp`, description: "Used lead-acid vehicle batteries collected for recycling." },
  { name: "Big Pipes", image: `${P}/Big_Pipes.webp`, description: "Large-diameter steel pipes from projects, plants and pipelines." },
  { name: "Billets", image: `${P}/Billets.webp`, description: "Steel billets for re-rolling and supply to steel producers." },
  { name: "Bolts & Screws", image: `${P}/Bolts_n_Screws.webp`, description: "Surplus and scrap fasteners in mixed or sorted lots." },
  { name: "Brass Scrap", image: `${P}/Brass_Scrap.webp`, description: "Brass fittings, valves, turnings and mixed brass scrap." },
  { name: "Cables", image: `${P}/Cables.webp`, description: "Used and surplus power and control cables with copper or aluminium cores." },
  { name: "Clamps", image: `${P}/Clamps.webp`, description: "Scaffolding couplers and clamps, used or surplus." },
  { name: "Containers", image: `${P}/Containers.webp`, description: "Used shipping and storage containers for resale or scrap." },
  { name: "Copper Berry Cable", image: `${P}/Copper_Berry_Cable.webp`, description: "Bare bright copper wire (Berry grade), one of the highest-value copper grades." },
  { name: "CS Pipes", image: `${P}/CS_Pipes.webp`, description: "Carbon steel pipes, new surplus or used, in all sizes." },
  { name: "E-Waste", image: `${P}/E_Waste.webp`, description: "Electronic scrap, circuit boards and IT equipment for recovery." },
  { name: "Elbows", image: `${P}/Elbows.webp`, description: "Surplus pipe elbows and fittings in carbon and stainless steel." },
  { name: "Fence", image: `${P}/Fence.webp`, description: "Used steel fencing panels and mesh from sites and facilities." },
  { name: "Fence Gate", image: `${P}/Fence_Gate.webp`, description: "Steel fence gates for resale or recycling." },
  { name: "Ferrous Metal Scrap", image: `${P}/Ferrous_Metal_Scrap.webp`, description: "Mixed ferrous scrap, from light gauge to heavy melting steel." },
  { name: "Fibre Glass", image: `${P}/Fibre_Glass.webp`, description: "Fibreglass tanks, pipes and panels from dismantled facilities." },
  { name: "Flanges", image: `${P}/Flanges.webp`, description: "Surplus and used steel flanges in a wide range of ratings." },
  { name: "Generators", image: `${P}/Generators.webp`, description: "Used generator sets for resale, parts or scrap." },
  { name: "Granular Copper", image: `${P}/Granular_Copper.webp`, description: "Granulated copper recovered from cable processing." },
  { name: "Iron Beams", image: `${P}/Iron_Beems.webp`, description: "Used and surplus structural steel beams." },
  { name: "Light Poles", image: `${P}/Light_Poles.webp`, description: "Steel street and site light poles, used or surplus." },
  { name: "Nickel Scrap", image: `${P}/Nickel_Scrap.webp`, description: "Nickel and nickel-alloy scrap." },
  { name: "Office Portable Cabins", image: `${P}/Office_Portable_Cabins.webp`, description: "Used porta cabins and site offices for resale." },
  { name: "Panel Boards", image: `${P}/Panel_Boards.webp`, description: "Electrical panel boards and switchgear for resale or recovery." },
  { name: "Radiators", image: `${P}/Radiators.webp`, description: "Copper and aluminium radiators from vehicles and equipment." },
  { name: "Rebars", image: `${P}/Rebars.webp`, description: "Surplus and scrap reinforcing steel bars." },
  { name: "Stainless Steel", image: `${P}/Stainless_Steel.webp`, description: "Stainless steel tube, coils, sheets, bars and billets." },
  { name: "Steel Plates", image: `${P}/Steel_Plates.webp`, description: "Used and surplus steel plates in various thicknesses." },
  { name: "Wooden Boards", image: `${P}/Wooden_Boards.webp`, description: "Used scaffolding and timber boards from project sites." },
];

export type ProductGroup = {
  key: string;
  title: string;
  intro: string;
  /** Deeper page for this group, if one exists. */
  href?: string;
  items: CatalogItem[];
};

const productGroupDefs: (Omit<ProductGroup, "items"> & { names: string[] })[] = [
  {
    key: "non-ferrous",
    title: "Non-ferrous & copper scrap",
    intro: "Copper, aluminium, brass and nickel grades, plus cables, radiators and batteries for metal recovery.",
    href: "/products/non-ferrous-metals",
    names: [
      "Aluminium Scrap", "Brass Scrap", "Copper Berry Cable", "Granular Copper", "Nickel Scrap", "Radiators", "Cables",
      "Auto Batteries Scrap",
    ],
  },
  {
    key: "ferrous-steel",
    title: "Ferrous & structural steel",
    intro: "Heavy melting and mixed ferrous scrap, billets and structural sections for steel producers and re-rollers.",
    href: "/products/metal-scrap-surplus",
    names: ["Ferrous Metal Scrap", "Billets", "Iron Beams", "Steel Plates", "Rebars", "Stainless Steel", "Light Poles"],
  },
  {
    key: "pipes-fittings",
    title: "Pipes & fittings",
    intro: "Surplus and used pipe, fittings and fasteners from oil, gas, process and construction projects.",
    href: "/products/metal-scrap-surplus",
    names: ["Big Pipes", "CS Pipes", "Elbows", "Flanges", "Bolts & Screws"],
  },
  {
    key: "scaffolding-site",
    title: "Scaffolding & site materials",
    intro: "Scaffolding components, fencing and site materials recovered from completed projects.",
    names: ["Adjustable Base Jack", "Clamps", "Aluminium Ladders", "Wooden Boards", "Fence", "Fence Gate", "Fibre Glass"],
  },
  {
    key: "equipment-cabins",
    title: "Equipment, electrical & cabins",
    intro: "Generators, panel boards, e-waste, containers and porta cabins for resale, parts or recycling.",
    href: "/used-equipment",
    names: ["Generators", "Panel Boards", "E-Waste", "Containers", "Office Portable Cabins"],
  },
];

/** /products grouped for display. Every legacy item appears in exactly one group (checked at build time). */
export const productGroups: ProductGroup[] = (() => {
  const byName = new Map(products.map((p) => [p.name, p]));
  const seen = new Set<string>();
  const groups = productGroupDefs.map(({ names, ...g }) => ({
    ...g,
    items: names.map((n) => {
      const item = byName.get(n);
      if (!item || seen.has(n)) throw new Error(`productGroups: unknown or duplicate item "${n}"`);
      seen.add(n);
      return item;
    }),
  }));
  if (seen.size !== products.length) {
    const missing = products.filter((p) => !seen.has(p.name)).map((p) => p.name);
    throw new Error(`productGroups: ungrouped items ${missing.join(", ")}`);
  }
  return groups;
})();

/** /products/non-ferrous-metals — 11 items. */
export const nonFerrousMetals: CatalogItem[] = [
  { name: "Alloy Steel", image: `${NF}/Alloy_Steel.webp`, description: "Alloy steel scrap and surplus, sorted by grade." },
  { name: "Aluminium", image: `${NF}/Aluminium.webp`, description: "Aluminium scrap including zorba, extrusions, sheet and cast." },
  { name: "Brass", image: `${NF}/Brass.webp`, description: "Yellow and red brass scrap, fittings and turnings." },
  { name: "Bronze", image: `${NF}/Bronz.webp`, description: "Bronze scrap from bearings, bushings and marine fittings." },
  { name: "Copper", image: `${NF}/Copper.webp`, description: "Copper wire, tube, cable and mixed copper scrap." },
  { name: "Galvanized Steel", image: `${NF}/Galvanized_Steel.webp`, description: "Zinc-coated steel sheet, structures and scrap." },
  { name: "Lead", image: `${NF}/lead.webp`, description: "Lead scrap from batteries, sheathing and soft lead." },
  { name: "Stainless Steel", image: `${NF}/Stainless_Steel.webp`, description: "Stainless steel scrap in 304, 316 and other grades." },
  { name: "Tin", image: `${NF}/Tin.webp`, description: "Tin and tin-bearing scrap." },
  { name: "Tool Steel", image: `${NF}/Tool_Steel.webp`, description: "High-alloy tool steel scrap and offcuts." },
  { name: "Zinc", image: `${NF}/Zinc.webp`, description: "Zinc die-cast, sheet and dross." },
];

export type CatalogGroup = { key: string; title: string; intro: string; items: CatalogItem[] };

/** Groups `items` by name; throws at build time if any item is unknown, duplicated or left out. */
function groupCatalog(
  label: string,
  items: CatalogItem[],
  defs: { key: string; title: string; intro: string; names: string[] }[],
): CatalogGroup[] {
  const byName = new Map(items.map((p) => [p.name, p]));
  const seen = new Set<string>();
  const groups = defs.map(({ names, ...g }) => ({
    ...g,
    items: names.map((n) => {
      const item = byName.get(n);
      if (!item || seen.has(n)) throw new Error(`${label}: unknown or duplicate item "${n}"`);
      seen.add(n);
      return item;
    }),
  }));
  if (seen.size !== items.length) {
    const missing = items.filter((p) => !seen.has(p.name)).map((p) => p.name);
    throw new Error(`${label}: ungrouped items ${missing.join(", ")}`);
  }
  return groups;
}

/** /products/non-ferrous-metals grouped for display. All 11 legacy items, each in exactly one group. */
export const nonFerrousGroups: CatalogGroup[] = groupCatalog("nonFerrousGroups", nonFerrousMetals, [
  {
    key: "copper-alloys",
    title: "Copper & copper alloys",
    intro: "Copper wire, tube and cable, plus brass and bronze fittings, valves, bearings and turnings.",
    names: ["Copper", "Brass", "Bronze"],
  },
  {
    key: "aluminium-base-metals",
    title: "Aluminium & base metals",
    intro: "Aluminium including zorba, extrusions and cast, plus zinc, lead and tin scrap.",
    names: ["Aluminium", "Zinc", "Lead", "Tin"],
  },
  {
    key: "specialty-steels",
    title: "Stainless & specialty steels",
    intro: "Stainless, alloy and tool steel sorted by grade, and galvanized steel sheet and structures.",
    names: ["Stainless Steel", "Alloy Steel", "Tool Steel", "Galvanized Steel"],
  },
]);

/** /products/metal-scrap-surplus — 6 items. */
export const metalScrapSurplus: CatalogItem[] = [
  { name: "Beam", image: `${MS}/Beam.webp`, description: "H and I beams from surplus stock and dismantled structures." },
  { name: "Carbon Steel", image: `${MS}/Carbon-Steel.webp`, description: "Carbon steel sections, plate and scrap." },
  { name: "Coil", image: `${MS}/Coil.webp`, description: "Steel and stainless coils, surplus or secondary grade." },
  { name: "MS Pipes", image: `${MS}/MS-Pipes.webp`, description: "Mild steel pipes in a range of diameters and lengths." },
  { name: "Seamless Pipe", image: `${MS}/Seamless-Pipe.webp`, description: "Surplus seamless pipe from oil, gas and process projects." },
  { name: "Seamless Plate", image: `${MS}/Seamless-Plate.webp`, description: "Surplus steel plate from fabrication and project stock." },
];

export type MaterialGroupKey = "non-ferrous" | "ferrous-scrap" | "structural" | "stainless" | "equipment";

/**
 * Homepage "Main activities": used and unused ferrous and non-ferrous metals we buy and sell.
 * All 39 legacy items (CLAUDE.md §6 ranking content), grouped for display. Do not drop items.
 */
export const materialGroups: { key: MaterialGroupKey; title: string; href: string; items: string[] }[] = [
  {
    key: "non-ferrous",
    title: "Non-ferrous metals",
    href: "/products/non-ferrous-metals",
    items: ["Copper", "Aluminium", "Brass", "Nickel", "Zinc"],
  },
  {
    key: "ferrous-scrap",
    title: "Ferrous scrap",
    href: "/products",
    items: [
      "Heavy metal scrap (HMS)", "Ferrous scrap", "Shredded steel scrap", "Bushing shredded scrap",
      "Destroyed steel cars", "Broken machinery casts",
    ],
  },
  {
    key: "stainless",
    title: "Stainless steel",
    href: "/products",
    items: [
      "Hot-rolled stainless steel", "SS tube", "SS coils", "SS sheets", "SS bright bars", "SS hexagonal bars",
      "SS square bars", "SS billets", "SS waste & scrap",
    ],
  },
  {
    key: "structural",
    title: "Structural steel & rail",
    href: "/products/metal-scrap-surplus",
    items: [
      "H beams", "I beams", "Angles", "C channels", "Pipes", "Plates", "Shale plates", "Steel tube", "Steel pipe",
      "Electric poles", "Used rail plates", "Rail wheels", "Old scaffolding", "Scaffolding clamps (MS)",
    ],
  },
  {
    key: "equipment",
    title: "Equipment & surplus",
    href: "/used-equipment",
    items: ["Heavy machinery", "Transformers", "Generators", "Containers", "Used porta cabins"],
  },
];

const EQ = "/assets/images/Equipment_Resale";

/**
 * Equipment types from the legacy equipment resale page (typos fixed, image paths unchanged).
 * `slug` matches the seeded `categories.slug` so step 5 can link each one to its category page.
 */
export const equipmentTypes: (CatalogItem & { slug: string })[] = [
  { slug: "asphalt-concrete-plants", name: "Asphalt Concrete Plant", image: `${EQ}/Asphalt_Concrete_Plant.webp`, description: "Batch and drum asphalt plants for road construction." },
  { slug: "compressors", name: "Compressors", image: `${EQ}/Compressor.webp`, description: "Portable and stationary air compressors." },
  { slug: "concrete-pumps", name: "Concrete Pumps", image: `${EQ}/Concrete_Pumps.webp`, description: "Truck-mounted and trailer concrete pumps." },
  { slug: "crane-barges", name: "Crane Barges", image: `${EQ}/Crane_Barge.webp`, description: "Floating crane barges for marine and port work." },
  { slug: "cranes", name: "Cranes", image: `${EQ}/Cranes.webp`, description: "Mobile, crawler and rough-terrain cranes." },
  { slug: "dozers", name: "Dozers", image: `${EQ}/Dozer.webp`, description: "Crawler bulldozers for earthmoving." },
  { slug: "generators", name: "Generators", image: `${EQ}/Generators.webp`, description: "Diesel generator sets in a range of kVA ratings." },
  { slug: "hydraulic-excavators", name: "Hydraulic Excavators", image: `${EQ}/Hydrolic_Excavator.webp`, description: "Crawler and wheeled hydraulic excavators." },
  { slug: "piling-rigs", name: "Piling Rigs", image: `${EQ}/Piling_Rigs.webp`, description: "Rotary and impact piling rigs for foundations." },
  { slug: "road-pavers", name: "Road Pavers", image: `${EQ}/Road_Paver.webp`, description: "Asphalt pavers and finishers." },
  { slug: "road-rollers", name: "Road Rollers", image: `${EQ}/Road_Roller.webp`, description: "Tandem, pneumatic and single-drum road rollers." },
  { slug: "tower-cranes", name: "Tower Cranes", image: `${EQ}/Tower_Cranes.webp`, description: "Tower cranes for high-rise and industrial projects." },
  { slug: "vibratory-compactors", name: "Vibratory Compactors", image: `${EQ}/Vibratory_Compactor.webp`, description: "Soil and plate vibratory compactors." },
  { slug: "welding-machines", name: "Welding Machines", image: `${EQ}/Welding_Machines.webp`, description: "Engine-driven and electric welding machines." },
  { slug: "wheel-loaders", name: "Wheel Loaders", image: `${EQ}/Wheel_Loader.webp`, description: "Front-end wheel loaders for material handling." },
];
