"use client";

import { AnimatePresence, motion } from "motion/react";

import type { LogEntry } from "@/types/showcase";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.2, 0, 0, 1] as const;

/** The running record. Every item that moves through the graph lands here. */
export function RunLog({ entries }: { entries: readonly LogEntry[] }) {
  return (
    <div className="flex h-full min-h-[190px] flex-col border-2 border-[var(--color-divider)]">
      <div className="flex items-center justify-between border-b-2 border-[var(--color-divider)] px-4 py-2.5">
        <span className="text-[11px] tracking-[0.16em] uppercase">Run log</span>
        <span className="text-muted text-[11px] tracking-[0.16em]">
          {String(entries.length).padStart(2, "0")}
        </span>
      </div>

      <ol className="m-0 flex-1 list-none overflow-y-auto p-0" aria-live="polite">
        <AnimatePresence initial={false}>
          {entries.map((entry) => (
            <motion.li
              key={entry.key}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, ease: EASE_OUT }}
              className="flex items-baseline justify-between gap-4 border-b border-[var(--color-divider)] px-4 py-2.5 text-[13px]"
            >
              <span className="truncate">{entry.label}</span>
              <span
                className={cn(
                  "shrink-0 text-[11px] font-bold tracking-[0.14em] uppercase",
                  entry.isException ? "text-[var(--color-neutral-600)]" : "text-brand",
                )}
              >
                {entry.outcome}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>

      {entries.length === 0 && (
        <p className="text-muted m-0 px-4 py-4 text-[13px]">Nothing has run yet.</p>
      )}
    </div>
  );
}
