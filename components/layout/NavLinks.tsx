"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string; exact?: boolean };

/** Desktop nav. Client-side only to highlight the active item. */
export function NavLinks({ items }: { items: Item[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-0.5 xl:gap-2">
      {items.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative block px-3 py-2 font-ui text-[0.8rem] font-medium tracking-wide transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-center after:rounded-full after:bg-accent-400 after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100 ${
                active ? "text-white after:scale-x-100" : "text-white/75 after:scale-x-0"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
