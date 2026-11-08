"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/Button";

type Item = { href: string; label: string };

type MobileNavProps = {
  items: Item[];
  whatsappHref: string;
  labels: { open: string; close: string; whatsapp: string };
};

export function MobileNav({ items, whatsappHref, labels }: MobileNavProps) {
  const [open, setOpen] = useState(false);
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
        onClick={() => setOpen((v) => !v)}
        className="-me-2 inline-flex size-11 items-center justify-center rounded-full text-white hover:bg-white/10"
      >
        {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
      </button>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 bottom-0 sm:top-[4.5rem] z-40 overflow-y-auto border-t border-white/10 bg-steel-950 px-4 pb-8 pt-4"
        >
          <nav>
            <ul className="divide-y divide-white/10">
              {items.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`block py-4 font-display text-xl font-semibold ${
                        active ? "text-accent-400" : "text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: "whatsapp", size: "lg", className: "mt-6 w-full" })}
          >
            <WhatsAppIcon className="size-5" />
            {labels.whatsapp}
          </a>
        </div>
      ) : null}
    </div>
  );
}
