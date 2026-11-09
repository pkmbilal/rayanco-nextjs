import { Container } from "@/components/ui/Container";

/** Sticky, horizontally scrollable jump bar to the sections of a long page. Sits just below the sticky header. */
export function GroupNav({ label, links }: { label: string; links: { href: string; title: string; count?: number }[] }) {
  return (
    <nav
      aria-label={label}
      className="sticky top-[var(--header-h)] z-40 transition-[top] duration-300 border-b border-steel-200 bg-page/95 backdrop-blur supports-[backdrop-filter]:bg-page/80"
    >
      <Container>
        <ul className="-mx-4 flex gap-1 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          {links.map((l) => (
            <li key={l.href} className="shrink-0">
              <a
                href={l.href}
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold text-steel-700 transition-colors hover:bg-steel-100 hover:text-steel-950"
              >
                {l.title}
                {l.count !== undefined ? (
                  <span className="rounded-full bg-steel-100 px-1.5 text-[0.7rem] font-bold tabular-nums text-steel-600">
                    {l.count}
                  </span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
