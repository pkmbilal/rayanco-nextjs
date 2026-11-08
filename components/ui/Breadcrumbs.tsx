import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/lib/i18n";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export type Crumb = { name: string; href: string };

/**
 * Breadcrumb trail + matching BreadcrumbList JSON-LD.
 * The home crumb is added automatically; the last item is the current page.
 */
export function Breadcrumbs({
  items,
  tone = "light",
  className = "",
}: {
  items: Crumb[];
  /** "dark" = on a dark hero. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const t = getDictionary();
  const trail: Crumb[] = [{ name: t.breadcrumbs.home, href: "/" }, ...items];
  const dark = tone === "dark";

  return (
    <nav aria-label={t.breadcrumbs.label} className={className}>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <ol
        className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-[0.8rem] ${
          dark ? "text-white/75" : "text-steel-500"
        }`}
      >
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-x-2">
              {isLast ? (
                <span aria-current="page" className={`font-medium ${dark ? "text-accent-400" : "text-steel-800"}`}>
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link href={crumb.href} className={dark ? "hover:text-white" : "hover:text-accent-600"}>
                    {crumb.name}
                  </Link>
                  <span aria-hidden="true" className="rtl:rotate-180">
                    ›
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
