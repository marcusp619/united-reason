import { z } from "zod";

/**
 * One schema per form, shared by the client form and the server action.
 * The inferred type is the single source of truth for both sides.
 */

export const newsletterSchema = z.object({
  email: z.string().min(1, "Email is required").email("That doesn't look like an email address"),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const enquirySchema = z.object({
  name: z.string().min(1, "Your name is required").max(120),
  email: z.string().min(1, "Email is required").email("That doesn't look like an email address"),
  problem: z
    .string()
    .min(10, "A sentence is fine — just a little more detail")
    .max(2000, "Keep it under 2000 characters"),
  /** Honeypot: real people leave this empty. */
  company: z.string().max(0).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
