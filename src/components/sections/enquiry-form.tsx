"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { sendEnquiry } from "@/app/actions/contact";
import { site } from "@/content/site";
import { Event, record } from "@/lib/analytics";
import type { Delivery } from "@/lib/mail";
import { handOffToMailClient } from "@/lib/mailto";
import { enquirySchema, type EnquiryInput } from "@/lib/schemas/forms";

/**
 * The written route in, for people who would rather describe the problem than
 * book a call.
 *
 * Posts to a server action. Where no delivery is configured — or where it
 * fails — it falls back to composing the message in the visitor's mail client,
 * because the one thing this must never do is tell someone their enquiry
 * arrived when it did not. `enquirySchema` validates both sides.
 */
export function EnquiryForm() {
  const [outcome, setOutcome] = useState<Delivery["status"] | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({ resolver: zodResolver(enquirySchema) });

  async function onSubmit(values: EnquiryInput) {
    // A filled honeypot never reaches here — the schema rejects it.
    const delivery = await sendEnquiry(values);
    setOutcome(delivery.status);
    record(Event.EnquirySubmitted, { form: "enquiry", outcome: delivery.status });

    if (delivery.status === "sent") return;
    handOffToMailClient(
      `Enquiry from ${values.name}`,
      `${values.problem}\n\n— ${values.name}\n${values.email}`,
    );
  }

  const field =
    "caret-brand focus-visible:border-brand w-full border border-[var(--color-divider)] bg-[var(--color-surface)] px-3 py-2.5 text-[15px]";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="enquiry-name" className="mb-1.5 block text-[13px] tracking-[0.02em]">
            Your name
          </label>
          <input
            id="enquiry-name"
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "enquiry-name-error" : undefined}
            className={field}
            {...register("name")}
          />
          {errors.name && (
            <p id="enquiry-name-error" role="alert" className="text-brand-700 mt-1.5 mb-0 text-xs">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="enquiry-email" className="mb-1.5 block text-[13px] tracking-[0.02em]">
            Email
          </label>
          <input
            id="enquiry-email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "enquiry-email-error" : undefined}
            className={field}
            {...register("email")}
          />
          {errors.email && (
            <p id="enquiry-email-error" role="alert" className="text-brand-700 mt-1.5 mb-0 text-xs">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="enquiry-problem" className="mb-1.5 block text-[13px] tracking-[0.02em]">
          What&rsquo;s eating your week?
        </label>
        <textarea
          id="enquiry-problem"
          rows={4}
          placeholder="We re-type every order into two systems and it costs us a day a week."
          aria-invalid={errors.problem ? true : undefined}
          aria-describedby={errors.problem ? "enquiry-problem-error" : undefined}
          className={`${field} resize-y`}
          {...register("problem")}
        />
        {errors.problem && (
          <p id="enquiry-problem-error" role="alert" className="text-brand-700 mt-1.5 mb-0 text-xs">
            {errors.problem.message}
          </p>
        )}
      </div>

      {/* Honeypot. Hidden from people and from assistive tech, tempting to bots. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="enquiry-company">Company</label>
        <input id="enquiry-company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-brand-700 font-heading text-ground inline-flex cursor-pointer items-center px-5 py-3.5 text-sm font-extrabold transition-colors hover:bg-[var(--color-accent-800)] active:bg-[var(--color-accent-900)] disabled:cursor-not-allowed disabled:opacity-45"
        >
          Send it
        </button>
        <span className="text-muted text-sm">I reply within {site.replyWindow}.</span>
      </div>

      {outcome === "sent" && (
        <p role="status" className="text-brand-700 m-0 text-[13px]">
          Got it. I&rsquo;ll read it properly and reply within {site.replyWindow}.
        </p>
      )}
      {outcome !== null && outcome !== "sent" && (
        <p role="status" className="text-brand-700 m-0 text-[13px]">
          Your email app should open with this filled in. Send it and it reaches me. If nothing
          happened, write to {site.email} directly.
        </p>
      )}
    </form>
  );
}
