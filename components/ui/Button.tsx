import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "whatsapp" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-accent-500 text-white hover:bg-accent-600",
  secondary: "border border-current bg-transparent hover:bg-steel-900/5",
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-dark",
  ghost: "bg-transparent hover:bg-steel-900/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-13 px-7 text-lg",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50";

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
