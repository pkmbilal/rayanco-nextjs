"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, MailIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/Button";
import { site } from "@/lib/site";

type Item = { href: string; label: string; exact?: boolean };

type MobileNavProps = {
  items: Item[];
  whatsappHref: string;
  labels: { open: string; close: string; whatsapp: string; call: string; email: string };
};

export function MobileNav({ items, whatsappHref, labels }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  // Drawer starts at the header's bottom edge (the utility strip may still be above it on tablets).
  const [top, setTop] = useState<number | null>(null);
  const pathname = usePathname();

  // Close the drawer after navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? labels.close : labels.open}
        onClick={(e) => {
          setTop(e.currentTarget.closest("header")?.getBoundingClientRect().bottom ?? null);
          setOpen((v) => !v);
        }}
        className="-me-2 inline-flex size-11 items-center justify-center rounded-full text-white hover:bg-white/10"
      >
        {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
      </button>

      {open ? (
        <div
          id="mobile-nav"
          style={top !== null ? { top } : undefined}
          className="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 overflow-y-auto border-t border-white/10 bg-steel-950 px-4 pb-8 pt-4 motion-safe:animate-[drawer-in_200ms_ease-out]"
        >
          <nav>
            <ul className="divide-y divide-white/10">
              {items.map((item) => {
                const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`block border-s-2 py-4 ps-3 font-display text-xl font-semibold transition-colors ${
                        active ? "border-accent-400 text-white" : "border-transparent text-white/80 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <ul className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 font-ui text-sm text-white/80">
            {site.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className="flex items-center gap-3 hover:text-white" aria-label={`${labels.call} ${p.display}`}>
                  <PhoneIcon className="size-4 text-accent-400" />
                  <span dir="ltr">{p.display}</span>
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-white" aria-label={`${labels.email} ${site.email}`}>
                <MailIcon className="size-4 text-accent-400" />
                {site.email}
              </a>
            </li>
          </ul>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: "whatsapp", size: "lg", className: "mt-4 w-full" })}
          >
            <WhatsAppIcon className="size-5" />
            {labels.whatsapp}
          </a>
        </div>
      ) : null}
    </div>
  );
}
