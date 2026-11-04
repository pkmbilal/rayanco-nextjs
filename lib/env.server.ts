import "server-only";
import { z } from "zod";

/** Server-only secrets. Importing this from a client component fails the build. */
const serverSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  // R2 is optional until the bucket is set up (needed from Phase 6).
  R2_ACCOUNT_ID: z.string().optional(),
  R2_ACCESS_KEY_ID: z.string().optional(),
  R2_SECRET_ACCESS_KEY: z.string().optional(),
  R2_BUCKET: z.string().optional(),
});

let cached: z.infer<typeof serverSchema> | undefined;

/** Lazily validated so builds without secrets still succeed for public pages. */
export function serverEnv() {
  cached ??= serverSchema.parse(process.env);
  return cached;
}
