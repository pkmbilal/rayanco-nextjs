import Link from "next/link";
import { getDictionary } from "@/lib/i18n";

export type Crumb = { name: string; href: string };

/** Visual breadcrumb trail. The home crumb is added automatically; the last item is the current page. */
export function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  const t = getDictionary();
  const trail: Crumb[] = [{ name: t.breadcrumbs.home, href: "/" }, ...items];

  return (
    <nav aria-label={t.breadcrumbs.label} className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-steel-500">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-x-2">
              {isLast ? (
                <span aria-current="page" className="font-medium text-steel-800">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link href={crumb.href} className="hover:text-accent-600 hover:underline">
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
