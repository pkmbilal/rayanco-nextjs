import type { IconCard } from "@/components/sections/ProcessSteps";

/** Light icon cards listing benefits: 1 / 3 columns. */
export function BenefitList({ items }: { items: IconCard[] }) {
  return (
    <ul className="grid gap-3 sm:gap-4 md:grid-cols-3">
      {items.map(({ icon: Icon, title, text }) => (
        <li key={title} className="flex gap-4 rounded-lg bg-white p-5 ring-1 ring-steel-200 sm:p-6">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-500/10 ring-1 ring-accent-500/30">
            <Icon className="size-5 text-accent-600" />
          </span>
          <div>
            <h3 className="font-display text-[1.05rem] font-semibold leading-snug text-steel-950">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-steel-600">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
