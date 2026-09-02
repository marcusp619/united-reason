"use client";

import type { ShowcaseMode } from "@/types/showcase";
import { cn } from "@/lib/utils";

const OPTIONS: readonly { value: ShowcaseMode; label: string }[] = [
  { value: "byHand", label: "By hand, today" },
  { value: "automated", label: "Once it's built" },
];

/** Switches between the job as it happens now and the job once it's built. */
export function ModeSwitch({
  mode,
  onChange,
}: {
  mode: ShowcaseMode;
  onChange: (next: ShowcaseMode) => void;
}) {
  return (
    <div className="flex border-2 border-[var(--color-divider)]" role="group" aria-label="Compare">
      {OPTIONS.map((option, i) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={mode === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "font-heading cursor-pointer px-3.5 py-2 text-[12px] font-extrabold tracking-[0.04em] transition-colors",
            i > 0 && "border-l-2 border-[var(--color-divider)]",
            mode === option.value
              ? "bg-ink text-ground"
              : "hover:bg-[color-mix(in_srgb,var(--color-text)_7%,transparent)]",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
