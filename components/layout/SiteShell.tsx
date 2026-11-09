import type { ReactNode } from "react";
import { getDictionary, getDirection, type Locale } from "@/lib/i18n";
import { Footer } from "./Footer";
import { Header } from "./Header";

/** The <html> document for one locale: lang/dir, skip link, header, main and footer. */
export function SiteShell({
  locale,
  fontClassName,
  children,
}: {
  locale: Locale;
  fontClassName: string;
  children: ReactNode;
}) {
  const t = getDictionary(locale);
  return (
    <html lang={locale} dir={getDirection(locale)} className={`${fontClassName} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-steel-900"
        >
          {t.header.skipToContent}
        </a>
        <Header locale={locale} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
