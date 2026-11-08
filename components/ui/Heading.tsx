import type { ReactNode } from "react";

type Level = 1 | 2 | 3;

const styles: Record<Level, string> = {
  1: "text-4xl sm:text-5xl leading-tight tracking-tight",
  2: "text-[1.7rem] sm:text-[2.15rem] leading-[1.1] tracking-[-0.02em]",
  3: "text-lg sm:text-xl leading-tight tracking-tight",
};

type HeadingProps = {
  level?: Level;
  /** Small green uppercase label shown above the heading. */
  eyebrow?: string;
  /** Short intro, stacked under the heading. */
  subtitle?: ReactNode;
  /** Short green accent bar under the heading. Defaults to true for h2. */
  rule?: boolean;
  className?: string;
  children: ReactNode;
};

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 font-ui text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">{children}</p>
  );
}

export function Heading({ level = 2, eyebrow, subtitle, rule, className = "", children }: HeadingProps) {
  const Tag = `h${level}` as const;
  const ruled = rule ?? level === 2;

  return (
    <div className={className}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag className={`font-display font-bold text-balance ${styles[level]}`}>{children}</Tag>
      {ruled ? <span aria-hidden="true" className="mt-3 block h-1 w-12 rounded-full bg-accent-500" /> : null}
      {subtitle ? <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-steel-600">{subtitle}</p> : null}
    </div>
  );
}
