import { en, type Dictionary } from "./en";

export type Locale = "en" | "ar";

export const defaultLocale: Locale = "en";

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

/** Returns the UI dictionary for a locale. Arabic falls back to English until phase 2. */
export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  switch (locale) {
    case "en":
    case "ar":
    default:
      return en;
  }
}
