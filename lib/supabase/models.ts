import type { Enums, Tables } from "./types";

/** Friendly aliases over the generated types. Edit this file, not types.ts. */
export type Profile = Tables<"profiles">;
export type Category = Tables<"categories">;
export type ListingImage = Tables<"listing_images">;
export type ListingPrivate = Tables<"listing_private">;
export type Redirect = Tables<"redirects">;

export type ListingStatus = Enums<"listing_status">;
export type UserRole = Enums<"user_role">;

// Text columns with CHECK constraints are typed as `string` by the generator; narrow them here.
export const LISTING_CONDITIONS = ["working", "needs_repair", "for_scrap"] as const;
export type ListingCondition = (typeof LISTING_CONDITIONS)[number];

export const ENQUIRY_CHANNELS = ["form", "whatsapp_click", "call_click"] as const;
export type EnquiryChannel = (typeof ENQUIRY_CHANNELS)[number];

export type Listing = Omit<Tables<"listings">, "condition"> & {
  condition: ListingCondition | null;
};
export type Enquiry = Omit<Tables<"enquiries">, "channel"> & { channel: EnquiryChannel };

/** Statuses visible on the public site (mirrors the RLS policy). */
export const PUBLIC_STATUSES = ["available", "reserved", "sold"] as const satisfies readonly ListingStatus[];
