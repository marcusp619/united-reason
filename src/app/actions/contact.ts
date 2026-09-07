"use server";

import { z } from "zod";

import { enquirySchema } from "@/lib/schemas/forms";
import { deliver, type Delivery } from "@/lib/mail";

/**
 * The two ways someone gets in touch.
 *
 * Both validate again here rather than trusting what the client sent — the
 * client's validation is for the person filling the form in, not for us. The
 * honeypot is checked the same way it is on the client, and a filled one is
 * dropped silently: telling a bot it was caught only helps it.
 *
 * A `notConfigured` result is not a failure. It means no delivery is set up
 * yet, and the form falls back to the visitor's mail client — the same shape
 * of decision `/book` makes about the Cal embed.
 */

const newsletterSchema = z.object({
  email: z.string().min(1).email(),
});

export async function sendEnquiry(input: unknown): Promise<Delivery> {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) return { status: "failed" };

  const { name, email, problem, company } = parsed.data;
  if (company) return { status: "sent" };

  return deliver({
    subject: `Enquiry from ${name}`,
    body: `${problem}\n\n${name}\n${email}`,
    replyTo: email,
  });
}

export async function subscribe(input: unknown): Promise<Delivery> {
  const parsed = newsletterSchema.safeParse(input);
  if (!parsed.success) return { status: "failed" };

  return deliver({
    subject: "Add me to the list",
    body: `Please add ${parsed.data.email} to the monthly note.`,
    replyTo: parsed.data.email,
  });
}
