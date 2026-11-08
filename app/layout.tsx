import type { Metadata, Viewport } from "next";
import { Figtree, Outfit, Poppins } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { isIndexable, publicEnv } from "@/lib/env";
import { defaultLocale, getDictionary, getDirection } from "@/lib/i18n";
import { site } from "@/lib/site";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.NEXT_PUBLIC_SITE_URL),
  title: {
    template: "%s | Rayanco",
    default: "Scrap Buyer in Jubail, Saudi Arabia | Rayanco",
  },
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_SA",
    images: [{ url: "/assets/images/Hero_bg.webp", width: 2560, height: 1709 }],
  },
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0d1e28",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const locale = defaultLocale;
  const t = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      className={`${figtree.variable} ${outfit.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-steel-900"
        >
          {t.header.skipToContent}
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
