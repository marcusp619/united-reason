"use client";

import { useEffect } from "react";

import { cta } from "@/content/site";
import { Event, record } from "@/lib/analytics";

/**
 * Records a click on the booking CTA, wherever it is.
 *
 * One delegated listener rather than an onClick on `Button`: the CTA appears
 * in a dozen places, and giving the primitive a handler would turn every page
 * that composes it into a client component to measure one link.
 */
export function FunnelEvents() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest(`a[href="${cta.href}"]`);
      if (!link) return;

      record(Event.BookClicked, { from: window.location.pathname });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
