import type { ComponentType, SVGProps } from "react";

export type IconCard = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
};

/** Numbered dark step cards (01, 02…): 1 / 2 / 4 columns. */
export function ProcessSteps({ steps }: { steps: IconCard[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
      {steps.map(({ icon: Icon, title, text }, i) => (
        <li
          key={title}
          className="group relative isolate flex h-full flex-col overflow-hidden rounded-lg bg-gradient-to-br from-steel-900 to-steel-950 p-6 text-white shadow-panel ring-1 ring-white/10 motion-safe:transition motion-safe:duration-300 hover:-translate-y-0.5 hover:ring-accent-400/30"
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent-400 via-accent-400/40 to-transparent opacity-60 motion-safe:transition-opacity group-hover:opacity-100 rtl:bg-gradient-to-l"
          />
          <span
            aria-hidden="true"
            className="absolute end-5 top-4 font-display text-5xl font-bold leading-none text-white/10 motion-safe:transition-colors group-hover:text-white/15"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="flex size-11 items-center justify-center rounded-full bg-white/5 ring-1 ring-accent-400/40">
            <Icon className="size-5 text-accent-400" />
          </span>
          <h3 className="mt-6 font-display text-[1.05rem] font-semibold leading-snug">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{text}</p>
        </li>
      ))}
    </ol>
  );
}
