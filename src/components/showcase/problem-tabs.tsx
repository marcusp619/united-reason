"use client";

import { useRef } from "react";

import { problems } from "@/content/problems";
import { cn } from "@/lib/utils";

/** Arrow keys move between tabs; Home and End jump the ends. */
const STEP: Record<string, number> = {
  ArrowDown: 1,
  ArrowRight: 1,
  ArrowUp: -1,
  ArrowLeft: -1,
};

/**
 * The list of problems. Picking one picks the flow that gets built and run.
 *
 * It declares the tablist pattern, so it has to honour it: a screen reader
 * announces "tab 1 of 5" and the reader then expects Left and Right to move
 * between them, and expects one stop in the tab order rather than five.
 */
export function ProblemTabs({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (index: number) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const last = problems.length - 1;
    const step = STEP[event.key];
    const moved =
      step === undefined
        ? { Home: 0, End: last }[event.key as "Home" | "End"]
        : (selected + step + problems.length) % problems.length;

    if (moved === undefined) return;

    event.preventDefault();
    onSelect(moved);
    // Focus follows selection, which is the automatic-activation form of the
    // pattern — and the one that matches what a click already does here.
    listRef.current?.querySelectorAll("button")[moved]?.focus();
  }

  return (
    <div
      ref={listRef}
      data-stagger
      role="tablist"
      aria-label="Common problems"
      onKeyDown={handleKeyDown}
    >
      {problems.map((problem, i) => {
        const on = i === selected;
        return (
          <button
            key={problem.title}
            type="button"
            role="tab"
            id={`showcase-tab-${i}`}
            aria-selected={on}
            aria-controls="showcase-panel"
            // One stop in the page's tab order, per the pattern.
            tabIndex={on ? 0 : -1}
            onClick={() => onSelect(i)}
            className={cn(
              "flex w-full cursor-pointer items-center gap-5 border-b-2 border-[var(--color-divider)] px-5 py-4.5 text-left transition-colors md:gap-7 md:px-16 md:py-5.5",
              on
                ? "bg-brand text-ground [--focus-ring:var(--color-bg)]"
                : "text-ink hover:bg-brand-100 bg-transparent",
            )}
          >
            <span
              className={cn(
                "w-8.5 shrink-0 text-[11px] tracking-[0.16em]",
                on ? "text-ground" : "text-brand",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-heading flex-1 text-[19px] font-extrabold tracking-[-0.03em] md:text-[27px]">
              {problem.title}
            </span>
            <span aria-hidden="true" className={cn("text-2xl", on ? "opacity-100" : "opacity-35")}>
              →
            </span>
          </button>
        );
      })}
    </div>
  );
}
