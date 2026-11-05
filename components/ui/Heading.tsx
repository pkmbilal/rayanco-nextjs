import type { ReactNode } from "react";

type Level = 1 | 2 | 3;

const styles: Record<Level, string> = {
  1: "text-4xl sm:text-5xl lg:text-6xl",
  2: "text-3xl sm:text-4xl",
  3: "text-xl sm:text-2xl",
};

type HeadingProps = {
  level?: Level;
  /** Small label shown above the heading. */
  eyebrow?: string;
  className?: string;
  children: ReactNode;
};

export function Heading({ level = 2, eyebrow, className = "", children }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <div className={className}>
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-600">{eyebrow}</p>
      ) : null}
      <Tag className={`font-display font-semibold uppercase leading-tight tracking-tight ${styles[level]}`}>
        {children}
      </Tag>
    </div>
  );
}
