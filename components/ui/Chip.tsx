import Link from "next/link";
import type { ReactNode } from "react";

type Tone = "green" | "ink";

const activeTone: Record<Tone, string> = {
  green: "border-accent-500 bg-accent-500 text-white shadow-[0_4px_12px_rgb(31_157_85/0.3)]",
  ink: "border-steel-900 bg-steel-900 text-white shadow-[0_4px_12px_rgb(11_34_54/0.25)]",
};

const dotTone: Record<Tone, string> = { green: "bg-white", ink: "bg-accent-400" };

type ChipProps = {
  children: ReactNode;
  /** Renders a link when set; otherwise a static tag. */
  href?: string;
  active?: boolean;
  tone?: Tone;
  dot?: boolean;
  count?: number;
  className?: string;
};

/** Pill tag / filter option from the design system. */
export function Chip({ children, href, active = false, tone = "green", dot = false, count, className = "" }: ChipProps) {
  const classes = `inline-flex h-8 items-center gap-1.5 rounded-full border-[1.5px] px-3.5 text-xs font-semibold transition-colors ${
    active ? activeTone[tone] : "border-steel-100 bg-steel-50 text-steel-900 hover:border-accent-500"
  } ${count !== undefined ? "pe-1.5" : ""} ${className}`;

  const content = (
    <>
      {dot ? (
        <span aria-hidden="true" className={`size-1.5 rounded-full ${active ? dotTone[tone] : "bg-steel-300"}`} />
      ) : null}
      {children}
      {count !== undefined ? (
        <span
          className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[0.65rem] font-bold ${
            active ? "bg-white/20 text-white" : "bg-white text-steel-500"
          }`}
        >
          {count}
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} aria-current={active ? "true" : undefined} className={classes}>
        {content}
      </Link>
    );
  }
  return <span className={classes}>{content}</span>;
}
