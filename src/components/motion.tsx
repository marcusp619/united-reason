"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = "[data-reveal]";
const COUNT_SELECTOR = "[data-count]";

/** Counts a stat from zero to its final value, keeping the original padding. */
function countUp(element: HTMLElement, durationMs: number) {
  const target = element.dataset.count ?? "";
  const value = Number(target);
  if (!Number.isFinite(value)) return;

  const width = target.length;
  const start = performance.now();

  function frame(now: number) {
    const progress = Math.min(1, (now - start) / durationMs);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = String(Math.round(value * eased)).padStart(width, "0");
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function readDuration(name: string, fallback: number) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/**
 * The site's only motion runtime. Mounted once in the root layout.
 *
 * Adds `.motion-ready` to <html> so the CSS in globals.css arms itself only
 * when JS is running: without it, every [data-reveal] section renders at full
 * opacity rather than staying invisible. Reveals and stat counters fire once,
 * on entering the viewport, and are skipped entirely under reduced motion.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    const counters = Array.from(document.querySelectorAll<HTMLElement>(COUNT_SELECTOR));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.classList.add("motion-ready");

    if (reduced) {
      reveals.forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    const countDuration = readDuration("--motion-count", 900);
    counters.forEach((element) => {
      element.textContent = "".padStart((element.dataset.count ?? "").length, "0");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          if (element.hasAttribute("data-count")) countUp(element, countDuration);
          else element.classList.add("is-revealed");
          observer.unobserve(element);
        }
      },
      // threshold 0 + a negative bottom margin, deliberately: a percentage
      // threshold can never be satisfied by a section taller than the viewport
      // divided by that fraction, which would strand it at opacity 0 forever.
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );

    [...reveals, ...counters].forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
