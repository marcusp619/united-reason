"use client";

import { useState } from "react";

import { subscribe } from "@/app/actions/contact";
import { site } from "@/content/site";
import { Event, record } from "@/lib/analytics";
import type { Delivery } from "@/lib/mail";
import { handOffToMailClient } from "@/lib/mailto";

/**
 * Newsletter signup.
 *
 * There is no list provider yet, so this hands the address to the visitor's
 * mail client rather than storing it. That is a real action with an honest
 * confirmation — the previous version discarded the address and told people
 * they were subscribed, which they were not. When a provider exists, replace
 * the hand-off with a server action and drop the mail-client copy.
 *
 * Validated by hand rather than through zod and react-hook-form. Those are the
 * right tools for the enquiry form, which has four fields and a honeypot and
 * shares its schema with a server action; pulling them onto /notes to check one
 * email field cost 300KB of JavaScript on the page people read.
 */

/** Deliberately loose. The only real test of an address is sending to it. */
const LOOKS_LIKE_AN_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<Delivery["status"] | null>(null);

  async function handleSubmit(submit: React.FormEvent<HTMLFormElement>) {
    submit.preventDefault();
    const address = email.trim();

    if (!LOOKS_LIKE_AN_EMAIL.test(address)) {
      setError(address ? "That doesn't look like an email address" : "Email is required");
      return;
    }

    setError(null);
    const delivery = await subscribe({ email: address });
    setOutcome(delivery.status);
    record(Event.EnquirySubmitted, { form: "newsletter", outcome: delivery.status });

    if (delivery.status === "sent") return;
    handOffToMailClient("Add me to the list", `Please add ${address} to the monthly note.`);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex gap-2.5">
        <label htmlFor="newsletter-email" className="sr-only">
          Your email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          value={email}
          onChange={(change) => setEmail(change.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "newsletter-email-error" : undefined}
          className="caret-brand focus-visible:border-brand min-h-9 w-full border border-[var(--color-divider)] bg-[var(--color-surface)] px-2.5 py-1.5 text-sm"
        />
        <button
          type="submit"
          className="bg-brand-700 font-heading text-ground shrink-0 cursor-pointer px-4 py-2 text-sm font-extrabold hover:bg-[var(--color-accent-800)]"
        >
          Add me
        </button>
      </div>

      {error && (
        <p
          id="newsletter-email-error"
          role="alert"
          className="text-brand-700 mt-2 mb-0 text-[13px]"
        >
          {error}
        </p>
      )}
      {outcome === "sent" && !error && (
        <p role="status" className="text-brand-700 mt-2 mb-0 text-[13px]">
          You&rsquo;re on the list. One note a month, nothing else.
        </p>
      )}
      {outcome !== null && outcome !== "sent" && !error && (
        <p role="status" className="text-brand-700 mt-2 mb-0 text-[13px]">
          Your email app should open. Send that message and you&rsquo;re on the list. If nothing
          happened, email {site.email} instead.
        </p>
      )}
    </form>
  );
}
