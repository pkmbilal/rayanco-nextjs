import { ar } from "./ar";
import { en, type Dictionary } from "./en";

export type { Dictionary };

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

/** UI dictionary for a locale. */
export function getDictionary(locale: Locale): Dictionary {
  return locale === "ar" ? ar : en;
}

/** Open Graph locale. */
export function ogLocale(locale: Locale): string {
  return locale === "ar" ? "ar_SA" : "en_SA";
}

/** Site path for a locale: English stays at the root, Arabic lives under /ar. */
export function localePath(locale: Locale, path: string): string {
  if (locale === "en") return path;
  if (path === "/") return "/ar";
  if (path.startsWith("/?") || path.startsWith("/#")) return `/ar${path.slice(1)}`;
  return path.startsWith("/") ? `/ar${path}` : path;
}

/** Splits a pathname into its locale and the locale-free path ("/ar/about" → ar + "/about"). */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  if (pathname === "/ar" || pathname === "/ar/") return { locale: "ar", path: "/" };
  if (pathname.startsWith("/ar/")) return { locale: "ar", path: pathname.slice(3) };
  return { locale: "en", path: pathname };
}

/** Localised value with English fallback (DB `_ar` columns may be empty). */
export function pick<T>(locale: Locale, en: T, ar: T | null | undefined): T {
  return locale === "ar" && ar != null && ar !== "" ? ar : en;
}

const cityNamesAr: Record<string, string> = {
  jubail: "الجبيل",
  "al jubail": "الجبيل",
  dammam: "الدمام",
  riyadh: "الرياض",
  jeddah: "جدة",
  abqaiq: "بقيق",
  khobar: "الخبر",
  "al khobar": "الخبر",
};

/** Display name of a city stored in English in the DB (filter values stay English). */
export function cityName(locale: Locale, name: string): string {
  if (locale !== "ar") return name;
  return cityNamesAr[name.trim().toLowerCase()] ?? name;
}

/** Number formatting. Western digits are kept in Arabic too (common on Saudi business sites). */
export function numberFormat(locale: Locale): Intl.NumberFormat {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA-u-nu-latn" : "en-SA", { maximumFractionDigits: 0 });
}
