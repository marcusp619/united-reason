"use client";

import { useEffect, useRef, useState } from "react";

const COUNT_MS = 900;

/** Ease-out cubic: fast start, settling finish. Counting should decelerate. */
function easeOut(progress: number): number {
  return 1 - Math.pow(1 - progress, 3);
}

/**
 * Counts up to a figure when it scrolls into view.
 *
 * Renders the true number on the server and without JS, so the figure is never
 * wrong for a reader who has scripting off or motion turned down — it only
 * drops to zero to start counting once the browser has taken over.
 */
export function CountUp({ to, unit }: { to: number; unit: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [counted, setCounted] = useState<number | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setCounted(0));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();
          if (reduced) {
            setCounted(to);
            return;
          }
          const started = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - started) / COUNT_MS, 1);
            setCounted(Math.round(to * easeOut(progress)));
            if (progress < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to]);

  return (
    <span ref={ref} className="font-heading tabular-nums">
      {counted ?? to}
      <span className="ml-1.5 text-[0.42em] tracking-[0.16em] uppercase">{unit}</span>
    </span>
  );
}
