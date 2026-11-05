/**
 * Old static-site URLs → new URLs (CLAUDE.md §4). Every entry is a single permanent (301/308) hop
 * straight to the final URL. Do not change without asking: these protect existing Google rankings.
 * Also reused by the step 7 QA check.
 */
export const legacyRedirects = [
  { source: "/index.html", destination: "/" },
  { source: "/about.html", destination: "/about" },
  { source: "/products.html", destination: "/products" },
  { source: "/non_ferrous_metals.html", destination: "/products/non-ferrous-metals" },
  { source: "/metal_scrap_surplus_materials.html", destination: "/products/metal-scrap-surplus" },
  { source: "/equipment_resale.html", destination: "/used-equipment" },
  { source: "/contact.html", destination: "/contact" },
] as const;
