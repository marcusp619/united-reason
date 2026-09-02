"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Everything the runtime watches. One observer drives all four gestures. */
const OBSERVED =
  "[data-reveal], [data-stagger], [data-sequence], .rule-draw, .rule-draw-y-start, .rule-draw-y-end, .rule-draw-y-end-lg";
/** Containers whose direct children arrive in sequence rather than together. */
const SEQUENCED = "[data-stagger], [data-sequence]";
const REVEALED = "is-revealed";

/**
 * Stamps each direct child with its position so the CSS can stage the delays.
 *
 * Done here rather than as an inline style in JSX so components stay free of
 * style objects — and because a diagram's boxes and arrows are siblings, one
 * index running across all of them produces the alternating rhythm for free.
 */
function indexSequencedChildren(): void {
  for (const container of document.querySelectorAll(SEQUENCED)) {
    Array.from(container.children).forEach((child, i) => {
      if (child instanceof HTMLElement || child instanceof SVGElement) {
        child.style.setProperty("--i", String(i));
      }
    });
  }
}

function createRevealObserver(): IntersectionObserver {
  // threshold 0 + a negative bottom margin, deliberately: a percentage
  // threshold can never be satisfied by a section taller than the viewport
  // divided by that fraction, which would strand it invisible forever.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add(REVEALED);
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0 },
  );
  return observer;
}

/**
 * The site's only motion runtime. Mounted once in the root layout.
 *
 * Adds `.motion-ready` to <html> so the CSS in globals.css arms itself only
 * when JS is running: without it every section renders at full opacity and
 * every rule is fully drawn. Gestures fire once, on entering the viewport,
 * and resolve immediately under reduced motion.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    indexSequencedChildren();

    const targets = Array.from(document.querySelectorAll(OBSERVED));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((element) => element.classList.add(REVEALED));
      return;
    }

    const observer = createRevealObserver();
    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
