import type { Viewport } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { rootMetadata } from "@/lib/seo";
import { figtree, outfit, poppins } from "../fonts";
import "../globals.css";

export const metadata = rootMetadata("en");

export const viewport: Viewport = {
  themeColor: "#0d1e28",
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell locale="en" fontClassName={`${figtree.variable} ${outfit.variable} ${poppins.variable}`}>
      {children}
    </SiteShell>
  );
}
