"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sticky header wrapper. Once the page scrolls, sets `data-scrolled` on itself (shadow, smaller logo)
 * and on <html> (shrinks the --header-h variable that other sticky elements use).
 */
export function StickyHeader({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrolled = window.scrollY > 8;
      root.toggleAttribute("data-scrolled", scrolled);
      ref.current?.toggleAttribute("data-scrolled", scrolled);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      root.removeAttribute("data-scrolled");
    };
  }, []);

  // Solid bg on purpose: backdrop-filter would trap the fixed mobile drawer inside the header.
  // Same navy as the page heroes below it, so the two read as one dark block.
  return (
    <header
      ref={ref}
      className="group/header sticky top-0 z-50 bg-steel-950 transition-shadow duration-300 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-accent-500/60 after:to-transparent data-[scrolled]:shadow-[0_8px_24px_rgb(0_0_0/0.35)]"
    >
      {children}
    </header>
  );
}
