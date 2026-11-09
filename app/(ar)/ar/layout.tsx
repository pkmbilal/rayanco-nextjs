import type { Viewport } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { rootMetadata } from "@/lib/seo";
import { figtree, outfit, plexArabic, poppins } from "../../fonts";
import "../../globals.css";

export const metadata = rootMetadata("ar");

export const viewport: Viewport = {
  themeColor: "#0d1e28",
};

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell
      locale="ar"
      fontClassName={`${plexArabic.variable} ${figtree.variable} ${outfit.variable} ${poppins.variable}`}
    >
      {children}
    </SiteShell>
  );
}
