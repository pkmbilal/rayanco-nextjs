"use client";

import { usePathname } from "next/navigation";
import { localePath, splitLocale, type Locale } from "@/lib/i18n";

/**
 * Link to the current page in the other language. A plain <a> on purpose: each locale has its own
 * root layout (html lang/dir), so switching is a full page load.
 */
export function LanguageSwitch({
  locale,
  label,
  title,
  className = "",
}: {
  locale: Locale;
  label: string;
  title: string;
  className?: string;
}) {
  const pathname = usePathname();
  const target: Locale = locale === "ar" ? "en" : "ar";
  const href = localePath(target, splitLocale(pathname).path);

  return (
    <a href={href} hrefLang={target} lang={target} title={title} className={className}>
      {label}
    </a>
  );
}
