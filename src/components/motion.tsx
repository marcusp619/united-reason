"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = "[data-reveal]";

/**
 * The site's only motion runtime. Mounted once in the root layout.
 *
 * Adds `.motion-ready` to <html> so the CSS in globals.css arms itself only
 * when JS is running: without it, every [data-reveal] section renders at full
 * opacity rather than staying invisible. Reveals fire once, on entering the
 * viewport, and are skipped entirely under reduced motion.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.classList.add("motion-ready");

    if (reduced) {
      reveals.forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      // threshold 0 + a negative bottom margin, deliberately: a percentage
      // threshold can never be satisfied by a section taller than the viewport
      // divided by that fraction, which would strand it at opacity 0 forever.
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );

    reveals.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
