"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { site } from "@/content/site";
import { newsletterSchema, type NewsletterInput } from "@/lib/schemas/forms";

/**
 * Newsletter signup.
 *
 * There is no list provider yet, so this hands the address to the visitor's
 * mail client rather than storing it. That is a real action with an honest
 * confirmation — the previous version discarded the address and told people
 * they were subscribed, which they were not. When a provider exists, replace
 * `handOff` with a server action and drop the mail-client copy.
 */
export function NewsletterForm() {
  const [handedOff, setHandedOff] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  function onSubmit(values: NewsletterInput) {
    const subject = encodeURIComponent("Add me to the list");
    const body = encodeURIComponent(`Please add ${values.email} to the monthly note.`);
    window.location.assign(`mailto:${site.email}?subject=${subject}&body=${body}`);
    setHandedOff(true);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex gap-2.5">
        <label htmlFor="newsletter-email" className="sr-only">
          Your email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "newsletter-email-error" : undefined}
          className="caret-brand focus-visible:border-brand min-h-9 w-full border border-[var(--color-divider)] bg-[var(--color-surface)] px-2.5 py-1.5 text-sm"
          {...register("email")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-brand font-heading text-ground shrink-0 cursor-pointer px-4 py-2 text-sm font-extrabold hover:bg-[var(--color-accent-600)] disabled:cursor-not-allowed disabled:opacity-45"
        >
          Add me
        </button>
      </div>

      {errors.email && (
        <p
          id="newsletter-email-error"
          role="alert"
          className="text-brand-700 mt-2 mb-0 text-[13px]"
        >
          {errors.email.message}
        </p>
      )}
      {handedOff && !errors.email && (
        <p role="status" className="text-brand-700 mt-2 mb-0 text-[13px]">
          Your email app should open. Send that message and you&rsquo;re on the list. If nothing
          happened, email {site.email} instead.
        </p>
      )}
    </form>
  );
}
