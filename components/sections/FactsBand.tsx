import { Container } from "@/components/ui/Container";

export type Fact = { value: string; label: string };

const glow =
  "absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgb(31_157_85/0.16),transparent_55%)] rtl:bg-[radial-gradient(ellipse_at_top_left,rgb(31_157_85/0.16),transparent_55%)]";

/** Dark key-figures band: 2 columns on mobile, 4 on desktop. */
export function FactsBand({ facts, className = "pt-12" }: { facts: Fact[]; className?: string }) {
  return (
    <Container className={className}>
      <dl className="relative isolate grid grid-cols-2 gap-y-6 overflow-hidden rounded-xl bg-steel-950 px-2 py-7 text-white shadow-panel ring-1 ring-white/10 sm:py-9 lg:grid-cols-4">
        <div aria-hidden="true" className={glow} />
        {facts.map((f, i) => (
          <div
            key={f.label}
            className={`flex flex-col-reverse px-3.5 sm:px-7 ${i % 2 === 1 ? "border-s border-white/10" : ""} ${
              i === 2 ? "lg:border-s lg:border-white/10" : ""
            }`}
          >
            <dt className="mt-2 text-xs leading-snug text-white/65 sm:text-sm">{f.label}</dt>
            <dd className="whitespace-nowrap font-display text-[1.45rem] font-bold leading-none tracking-tight tabular-nums sm:text-4xl lg:text-[2.6rem]">
              {f.value}
            </dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}
