"use client";

import { useEffect } from "react";

import { Band, Button, Kicker } from "@/components/primitives";
import { site } from "@/content/site";

/**
 * The route-level error boundary. It never shows the visitor the raw error —
 * that goes to the console for whoever is looking — but it does give them the
 * two things that actually help: a retry, and an address that reaches a person.
 */
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Band reveal={false} rule={false}>
      <Kicker>Something broke</Kicker>
      <h1 className="m-0 mb-5 max-w-[18ch] text-[40px] leading-none tracking-[-0.03em] md:text-[64px]">
        That&rsquo;s my fault, not yours.
      </h1>
      <p className="m-0 mb-8 max-w-[52ch] text-base md:text-lg">
        Something on this page failed to load. Try again, and if it keeps happening, tell me at{" "}
        {site.email} and I&rsquo;ll fix it.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="bg-brand-700 font-heading text-ground inline-flex cursor-pointer items-center px-6 py-4 text-base font-extrabold transition-colors hover:bg-[var(--color-accent-800)]"
        >
          Try again
        </button>
        <Button href="/" variant="secondary" size="lg">
          Back to the homepage
        </Button>
      </div>
    </Band>
  );
}
