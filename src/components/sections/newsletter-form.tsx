"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { newsletterSchema, type NewsletterInput } from "@/lib/schemas/forms";

export function NewsletterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  async function onSubmit(values: NewsletterInput) {
    // TODO: point at your list provider (Buttondown, Resend audiences, …).
    await new Promise((r) => setTimeout(r, 300));
    console.info("subscribe", values.email);
    reset();
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
          Subscribe
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
      {isSubmitSuccessful && !errors.email && (
        <p role="status" className="text-brand-700 mt-2 mb-0 text-[13px]">
          You&rsquo;re on the list. One note a month, nothing else.
        </p>
      )}
    </form>
  );
}
