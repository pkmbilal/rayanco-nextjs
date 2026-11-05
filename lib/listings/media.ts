import { publicEnv } from "@/lib/env";

/** Public URL of an object in the R2 media bucket. */
export function mediaUrl(key: string): string {
  return `${publicEnv.NEXT_PUBLIC_MEDIA_URL.replace(/\/+$/, "")}/${key.replace(/^\/+/, "")}`;
}

type AltSource = {
  title_en: string;
  year?: number | null;
  make?: string | null;
  model?: string | null;
  location?: string | null;
};

/** Alt text pattern from CLAUDE.md §8: `{year} {make} {model} {title} — {location}`. */
export function listingAlt(l: AltSource): string {
  const base = [l.year, l.make, l.model, l.title_en].filter(Boolean).join(" ");
  return l.location ? `${base} — ${l.location}` : base;
}
