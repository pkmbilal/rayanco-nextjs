import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "dark" | "secondary" | "outline" | "whatsapp" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  /** Bright green pill with navy text (hero / main CTAs). */
  primary: "bg-accent-400 text-steel-900 shadow-[0_4px_12px_rgb(74_222_128/0.35)] hover:bg-[#3fd174]",
  /** Solid green pill with white text. */
  dark: "bg-accent-500 text-white hover:bg-accent-600",
  /** Outline in the current text colour (use on dark or light backgrounds). */
  secondary: "border-[1.5px] border-current bg-transparent hover:bg-current/10",
  /** Green outline, navy text. */
  outline: "border-[1.5px] border-accent-500 bg-transparent text-steel-900 hover:bg-accent-50",
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-dark",
  ghost: "bg-transparent hover:bg-steel-900/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-colors disabled:pointer-events-none disabled:opacity-50";

type StyleProps = { variant?: Variant; size?: Size; className?: string };

export function buttonClasses({ variant = "primary", size = "md", className = "" }: StyleProps = {}) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type ButtonProps = StyleProps & ComponentPropsWithoutRef<"button">;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={buttonClasses({ variant, size, className })} {...props} />;
}

type ButtonLinkProps = StyleProps & {
  href: string;
  children: ReactNode;
  /** External links open in a new tab. */
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href">;

export function ButtonLink({ variant, size, className, href, external, children, ...props }: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
