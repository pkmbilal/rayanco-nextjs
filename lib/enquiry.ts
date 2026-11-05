import { z } from "zod";

/** General enquiry (contact page, sell-your-equipment page). Shared by the client form and the Server Action. */
export const enquirySchema = z.object({
  kind: z.enum(["contact", "sell"]),
  name: z.string().trim().min(2).max(200),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(/^\+?[\d\s()-]{7,}$/),
  email: z.union([z.literal(""), z.email().max(200)]).optional(),
  company: z.string().trim().max(200).optional(),
  location: z.string().trim().max(200).optional(),
  items: z.string().trim().max(1000).optional(),
  message: z.string().trim().max(2500).optional(),
  /** Honeypot: real users never fill this. */
  website: z.string().max(0).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export type EnquiryResult = { ok: true } | { ok: false };

/** Folds the optional fields into the single `message` column (the enquiries table has no extra columns). */
export function composeMessage(input: EnquiryInput): string {
  const lines = [
    input.kind === "sell" ? "[Sell to Rayanco]" : "[Contact form]",
    input.email ? `Email: ${input.email}` : null,
    input.company ? `Company: ${input.company}` : null,
    input.location ? `Location: ${input.location}` : null,
    input.items ? `Items: ${input.items}` : null,
    input.message ? `Message: ${input.message}` : null,
  ];
  return lines.filter(Boolean).join("\n");
}
