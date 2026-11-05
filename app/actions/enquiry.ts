"use server";

import { composeMessage, enquirySchema, type EnquiryResult } from "@/lib/enquiry";
import { createPublicClient } from "@/lib/supabase/server";

/** Stores a general enquiry. Runs as anon, so RLS limits it to inserts only. */
export async function submitEnquiry(raw: unknown): Promise<EnquiryResult> {
  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) return { ok: false };

  // Honeypot filled: pretend success so bots don't retry.
  if (parsed.data.website) return { ok: true };

  const supabase = createPublicClient();
  const { error } = await supabase.from("enquiries").insert({
    listing_id: null,
    name: parsed.data.name,
    phone: parsed.data.phone,
    message: composeMessage(parsed.data),
    channel: "form",
  });

  if (error) {
    console.error("submitEnquiry failed", error.code, error.message);
    return { ok: false };
  }
  // TODO(owner): email/WhatsApp notification to sales on new enquiry (needs a mail provider).
  return { ok: true };
}
