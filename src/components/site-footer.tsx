import Link from "next/link";

import { cta, nav, site } from "@/content/site";

/**
 * Site footer.
 *
 * Carries the 2px top rule that every other section boundary uses, and the
 * legal notice. The year is resolved at build time, which is correct for a
 * statically prerendered site: every deploy refreshes it.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-[var(--color-divider)]">
      <div className="grid gap-8 px-5 py-10 md:grid-cols-[1fr_auto] md:gap-16 md:px-16 md:py-12">
        <div>
          <p className="font-heading m-0 mb-2 text-[19px] font-extrabold tracking-[0.04em]">
            {site.wordmark}
          </p>
          {/* The tagline is lowercase by design, so it's used mid-sentence
              rather than opening one, where it would read as a typo. */}
          <p className="text-muted m-0 mb-5 max-w-[34ch] text-[15px] leading-[1.5]">
            One person, start to finish, building {site.tagline}.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="text-ink hover:text-brand text-[15px] no-underline transition-colors"
          >
            {site.email}
          </a>
        </div>

        <nav className="flex flex-col gap-2.5 md:items-end">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink hover:text-brand text-sm no-underline transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={cta.href}
            className="text-brand text-sm font-extrabold no-underline transition-colors hover:text-[var(--color-accent-700)]"
          >
            {cta.short}
          </Link>
        </nav>
      </div>

      <div className="text-muted flex flex-col gap-1.5 border-t-2 border-[var(--color-divider)] px-5 py-5 text-[13px] md:flex-row md:items-center md:justify-between md:px-16">
        <span>
          © {year} {site.legalName}. All rights reserved.
        </span>
        <span className="flex items-center gap-5">
          <Link
            href="/privacy"
            className="text-muted hover:text-brand no-underline transition-colors"
          >
            Privacy
          </Link>
          <span>Built and run by {site.owner}.</span>
        </span>
      </div>
    </footer>
  );
}
