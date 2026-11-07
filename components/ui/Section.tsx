import type { ComponentPropsWithoutRef } from "react";
import { Container } from "./Container";

type Tone = "light" | "muted" | "dark";

const tones: Record<Tone, string> = {
  light: "bg-page text-steel-900",
  muted: "bg-steel-50 text-steel-900",
  dark: "bg-steel-800 text-white",
};

type SectionProps = ComponentPropsWithoutRef<"section"> & { tone?: Tone };

export function Section({ tone = "light", className = "", children, ...props }: SectionProps) {
  return (
    <section className={`py-10 sm:py-14 ${tones[tone]} ${className}`} {...props}>
      <Container>{children}</Container>
    </section>
  );
}
