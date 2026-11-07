import type { ReactNode } from "react";

type Level = 1 | 2 | 3;

const styles: Record<Level, string> = {
  1: "text-4xl sm:text-5xl",
  2: "text-2xl sm:text-[1.7rem]",
  3: "text-lg sm:text-xl",
};

type HeadingProps = {
  level?: Level;
  /** Small label shown above the heading. */
  eyebrow?: string;
  /** One-line intro under the heading. */
  subtitle?: ReactNode;
  /** Green start-side rule (the design's section-heading style). Defaults to true for h2. */
  rule?: boolean;
  className?: string;
  children: ReactNode;
};

export function Heading({ level = 2, eyebrow, subtitle, rule, className = "", children }: HeadingProps) {
  const Tag = `h${level}` as const;
  const ruled = rule ?? level === 2;
  return (
    <div className={`${ruled ? "border-s-4 border-accent-500 ps-4" : ""} ${className}`}>
      {eyebrow ? (
        <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-accent-600">{eyebrow}</p>
      ) : null}
      <Tag className={`font-display font-bold leading-tight tracking-tight ${styles[level]}`}>{children}</Tag>
      {subtitle ? <p className="mt-1.5 text-sm text-steel-700">{subtitle}</p> : null}
    </div>
  );
}
