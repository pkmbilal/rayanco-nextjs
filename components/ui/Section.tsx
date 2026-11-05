import type { ComponentPropsWithoutRef } from "react";
import { Container } from "./Container";

type Tone = "light" | "muted" | "dark";

const tones: Record<Tone, string> = {
  light: "bg-white text-steel-900",
  muted: "bg-steel-50 text-steel-900",
  dark: "bg-steel-900 text-steel-50",
};

type SectionProps = ComponentPropsWithoutRef<"section"> & { tone?: Tone };

export function Section({ tone = "light", className = "", children, ...props }: SectionProps) {
  return (
    <section className={`py-14 sm:py-20 ${tones[tone]} ${className}`} {...props}>
      <Container>{children}</Container>
    </section>
  );
}
