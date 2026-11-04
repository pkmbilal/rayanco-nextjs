import { z } from "zod";

/**
 * Public env vars (safe in the browser). Accessed with literal `process.env.X`
 * so Next.js can inline them at build time.
 */
const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default("https://www.rayanco.com"),
  NEXT_PUBLIC_INDEXABLE: z.enum(["true", "false"]).default("false"),
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_MEDIA_URL: z.url().default("https://media.rayanco.com"),
  // TODO(owner): confirm WhatsApp number.
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().regex(/^\d*$/).default(""),
});

export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  NEXT_PUBLIC_INDEXABLE: process.env.NEXT_PUBLIC_INDEXABLE || undefined,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_MEDIA_URL: process.env.NEXT_PUBLIC_MEDIA_URL || undefined,
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || undefined,
});

export const isIndexable = publicEnv.NEXT_PUBLIC_INDEXABLE === "true";
