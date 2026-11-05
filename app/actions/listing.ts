"use server";

import { z } from "zod";
import { listingEnquirySchema, type EnquiryResult } from "@/lib/enquiry";
import { createPublicClient } from "@/lib/supabase/server";

/**
 * Listing-page actions. All run as anon: RLS only allows inserting enquiries against
 * public listings, and the view counter RPC only touches public listings.
 */

const clickSchema = z.object({
  listingId: z.uuid(),
  channel: z.enum(["whatsapp_click", "call_click"]),
});

/** Logs a WhatsApp / call button click. Fire-and-forget from the client. */
export async function logListingClick(listingId: string, channel: "whatsapp_click" | "call_click"): Promise<void> {
  const parsed = clickSchema.safeParse({ listingId, channel });
  if (!parsed.success) return;
  const { error } = await createPublicClient()
    .from("enquiries")
    .insert({ listing_id: parsed.data.listingId, channel: parsed.data.channel });
  if (error) console.error("logListingClick failed", error.code, error.message);
}

export async function submitListingEnquiry(raw: unknown): Promise<EnquiryResult> {
  const parsed = listingEnquirySchema.safeParse(raw);
  if (!parsed.success) return { ok: false };
  if (parsed.data.website) return { ok: true }; // honeypot

  const { error } = await createPublicClient().from("enquiries").insert({
    listing_id: parsed.data.listingId,
    name: parsed.data.name,
    phone: parsed.data.phone,
    message: parsed.data.message || null,
    channel: "form",
  });
  if (error) {
    console.error("submitListingEnquiry failed", error.code, error.message);
    return { ok: false };
  }
  // TODO(owner): notify sales on new listing enquiry (needs a mail provider).
  return { ok: true };
}

export async function recordListingView(listingId: string): Promise<void> {
  if (!z.uuid().safeParse(listingId).success) return;
  const { error } = await createPublicClient().rpc("increment_listing_view", { p_listing_id: listingId });
  if (error) console.error("recordListingView failed", error.code, error.message);
}
