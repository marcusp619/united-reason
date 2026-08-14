import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Shared Modernist primitives.
 *
 * The system's rules — flush-left labels, 2px dividers, zero radius, accent
 * used sparingly — live here so pages compose rather than restyle.
 */

/** Small uppercase kicker above a heading. */
export function Kicker({
  children,
  tone = "accent",
  className,
}: {
  children: ReactNode;
  tone?: "accent" | "muted" | "deep";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "m-0 mb-5 text-[10px] uppercase tracking-[0.16em] md:text-[11px]",
        tone === "accent" && "text-brand",
        tone === "deep" && "text-brand-700",
        tone === "muted" && "text-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** A full-bleed section with the system's 2px bottom rule. */
export function Band({
  children,
  className,
  rule = true,
}: {
  children: ReactNode;
  className?: string;
  rule?: boolean;
}) {
  return (
    <section
      className={cn(
        "px-5 py-8 md:px-16 md:py-13",
        rule && "border-b-2 border-[var(--color-divider)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "inverse";
  size?: "md" | "lg";
  className?: string;
};

/**
 * Labels are flush left by system rule — a button wider than its label starts
 * the text at the left padding edge, never centred.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: ButtonProps) {
  const base =
    "inline-flex cursor-pointer items-center gap-1.5 font-heading font-extrabold leading-tight no-underline transition-colors";

  const variants = {
    primary: "bg-brand text-ground hover:bg-[var(--color-accent-600)] active:bg-[var(--color-accent-700)]",
    secondary:
      "border border-[var(--color-divider)] text-ink hover:bg-[color-mix(in_srgb,var(--color-text)_7%,transparent)]",
    ghost: "text-brand hover:bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)]",
    inverse: "bg-ground text-ink hover:bg-[var(--color-neutral-200)]",
  } as const;

  const sizes = {
    md: "px-5 py-3.5 text-sm",
    lg: "px-6 py-4 text-base",
  } as const;

  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>
  );
}

/** The gridded accent panel carrying the UR mark. */
export function UrMark({
  size = "lg",
  children,
  className,
}: {
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
  className?: string;
}) {
  const type = {
    sm: "text-[64px]",
    md: "text-[84px]",
    lg: "text-[72px] md:text-[120px]",
  } as const;

  return (
    <div
      className={cn(
        "grid-panel flex flex-col justify-between p-6 text-ground md:p-11",
        className,
      )}
    >
      <div className={cn("font-heading font-extrabold leading-[0.82] tracking-[-0.04em]", type[size])}>
        UR
      </div>
      {children}
    </div>
  );
}

/**
 * The closing poster — the one place red runs as a field. Display-grade type,
 * the accent carries the block.
 */
export function PosterCta({
  headline,
  label,
  href,
}: {
  headline: string;
  label: string;
  href: string;
}) {
  return (
    <section className="flex flex-col items-start justify-between gap-6 bg-brand px-5 py-9 text-ground md:flex-row md:items-end md:gap-12 md:px-16 md:py-16">
      <h2 className="m-0 max-w-[15ch] text-[32px] leading-[1.02] tracking-[-0.025em] md:text-[52px]">
        {headline}
      </h2>
      <Button href={href} variant="inverse" size="lg" className="shrink-0">
        {label}
      </Button>
    </section>
  );
}

/** Small tinted label from the ramps. */
export function Tag({
  children,
  variant = "neutral",
  className,
}: {
  children: ReactNode;
  variant?: "neutral" | "outline" | "accent";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1.5 text-[13px] tracking-[0.02em]",
        variant === "neutral" && "bg-[var(--color-neutral-100)] text-[var(--color-neutral-800)]",
        variant === "outline" && "border border-brand text-brand",
        variant === "accent" && "bg-brand-100 text-[var(--color-accent-800)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
