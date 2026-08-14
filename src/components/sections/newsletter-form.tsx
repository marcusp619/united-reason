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
    // eslint-disable-next-line no-console
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
          className="min-h-9 w-full border border-[var(--color-divider)] bg-[var(--color-surface)] px-2.5 py-1.5 text-sm caret-brand focus-visible:border-brand"
          {...register("email")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="shrink-0 cursor-pointer bg-brand px-4 py-2 font-heading text-sm font-extrabold text-ground hover:bg-[var(--color-accent-600)] disabled:cursor-not-allowed disabled:opacity-45"
        >
          Subscribe
        </button>
      </div>

      {errors.email && (
        <p id="newsletter-email-error" role="alert" className="mt-2 mb-0 text-[13px] text-brand-700">
          {errors.email.message}
        </p>
      )}
      {isSubmitSuccessful && !errors.email && (
        <p role="status" className="mt-2 mb-0 text-[13px] text-brand-700">
          You&rsquo;re on the list. One note a month, nothing else.
        </p>
      )}
    </form>
  );
}
