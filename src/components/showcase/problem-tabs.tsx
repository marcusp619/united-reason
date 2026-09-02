"use client";

import { problems } from "@/content/problems";
import { cn } from "@/lib/utils";

/** The list of problems. Picking one picks the flow that gets built and run. */
export function ProblemTabs({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div data-stagger role="tablist" aria-label="Common problems">
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
