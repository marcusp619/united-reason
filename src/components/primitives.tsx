import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Shared Modernist primitives.
 *
 * The system's rules — flush-left labels, 2px dividers, zero radius, accent
 * used sparingly — live here so pages compose rather than restyle.
 */

/**
 * Small uppercase kicker above a heading.
 *
 * Where the kicker *is* the section's heading rather than a label above one,
 * pass `as="h2"`: it renders identically but stops the page skipping from h1
 * straight to the h3s inside the section. The explicit weight and leading are
 * what keep the two renderings identical, since the base layer styles headings.
 */
export function Kicker({
  children,
  as: Tag = "p",
  tone = "accent",
  className,
}: {
  children: ReactNode;
  as?: "p" | "h2";
  tone?: "accent" | "muted" | "deep";
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "m-0 mb-5 text-[10px] leading-normal font-normal tracking-[0.16em] uppercase md:text-[11px]",
        tone === "accent" && "text-brand",
        tone === "deep" && "text-brand-700",
        tone === "muted" && "text-muted",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * A full-bleed section with the system's 2px bottom rule.
 *
 * Reveals on scroll by default. Pass `reveal={false}` for anything above the
 * fold — a hero that starts at opacity 0 delays the largest contentful paint
 * for no visual gain, since it's on screen before there's anything to reveal.
 *
 * `tone="ink"` inverts the band onto a dark ground. It carries no rule of its
 * own by default at the call site — the tonal edge is the division.
 */
export function Band({
  children,
  className,
  rule = true,
  reveal = true,
  tone = "ground",
}: {
  children: ReactNode;
  className?: string;
  rule?: boolean;
  reveal?: boolean;
  tone?: "ground" | "ink";
}) {
  return (
    <section
      data-reveal={reveal ? "" : undefined}
      className={cn(
        "px-5 py-8 md:px-16 md:py-13",
        tone === "ink" && "tone-ink",
        rule && "rule-draw",
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

  /*
   * The primary fill is the 700 step, not the raw accent: #f3f2f2 on #ec3013
   * is 3.76:1, and a 14px bold label needs 4.5:1. #ae1800 gives 6.41:1. The
   * bright accent still runs as a field behind display type (PosterCta,
   * UrMark), where the 3:1 large-text bar applies and it clears.
   */
  const variants = {
    primary:
      "bg-brand-700 text-ground [--focus-ring:var(--color-bg)] hover:bg-[var(--color-accent-800)] active:bg-[var(--color-accent-900)]",
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
      className={cn("grid-panel text-ground flex flex-col justify-between p-6 md:p-11", className)}
    >
      <div
        className={cn("font-heading leading-[0.82] font-extrabold tracking-[-0.04em]", type[size])}
      >
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
    <section className="bg-brand text-ground flex flex-col items-start justify-between gap-6 px-5 py-9 [--focus-ring:var(--color-bg)] md:flex-row md:items-end md:gap-12 md:px-16 md:py-16">
      <h2 className="m-0 max-w-[15ch] text-[38px] leading-[0.98] tracking-[-0.04em] md:text-[60px] xl:text-[72px]">
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
        variant === "outline" && "border-brand text-brand border",
        variant === "accent" && "bg-brand-100 text-[var(--color-accent-800)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
