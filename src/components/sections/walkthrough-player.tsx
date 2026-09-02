"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { RunStep, ScriptedRun } from "@/content/demos";

type StepState = "pending" | "running" | "done";

const NOT_STARTED = -1;

/** Squares, never dots — nothing in this system is round. */
function StatusMark({ state }: { state: StepState }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "size-2 shrink-0",
        state === "pending" && "border-2 border-[var(--color-divider)]",
        state === "running" && "thinking-dot",
        state === "done" && "bg-brand",
      )}
    />
  );
}

function RunRow({ step, state }: { step: RunStep; state: StepState }) {
  return (
    <li className="flex gap-4 border-t-2 border-[var(--color-divider)] px-4.5 py-4 first:border-t-0">
      <span className="text-brand w-7 shrink-0 pt-1 text-[11px] font-bold tracking-[0.16em]">
        {step.n}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "font-heading text-[15px] font-extrabold transition-opacity duration-500",
              state === "pending" ? "opacity-30" : "opacity-100",
            )}
          >
            {step.label}
          </span>
          <StatusMark state={state} />
        </div>
        <p
          className={cn(
            "text-muted m-0 mt-1.5 text-[13px] leading-[1.5] transition-opacity duration-700",
            state === "pending" ? "opacity-0" : "opacity-100",
          )}
        >
          {step.detail}
        </p>
      </div>
    </li>
  );
}

function stateOf(index: number, activeStep: number): StepState {
  if (index < activeStep) return "done";
  if (index === activeStep) return "running";
  return "pending";
}

/**
 * Plays a scripted run, one step at a time, starting when it scrolls into view.
 *
 * The page promised a process "broken down step by step" and then showed three
 * static boxes. This performs the run instead: an owner who does not know what
 * "automation" means watches work happen with nobody touching it.
 */
export function WalkthroughPlayer({ run }: { run: ScriptedRun }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(NOT_STARTED);
  const total = run.steps.length;

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          // Under reduced motion the run is already finished — the information
          // is the point, the sequencing is the flourish.
          setActiveStep(reduced ? total : 0);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [total]);

  useEffect(() => {
    if (activeStep < 0 || activeStep >= total) return;
    const id = window.setTimeout(() => setActiveStep((step) => step + 1), run.steps[activeStep].ms);
    return () => window.clearTimeout(id);
  }, [activeStep, total, run.steps]);

  const isComplete = activeStep >= total;

  return (
    <div ref={containerRef} className="border-2 border-[var(--color-divider)] bg-[var(--color-bg)]">
      <div className="flex items-center justify-between gap-4 border-b-2 border-[var(--color-divider)] px-4.5 py-3.5">
        <span className="text-[13px] tracking-[0.1em] uppercase">{run.title}</span>
        <span className="text-muted text-[11px] tracking-[0.14em] uppercase">
          {isComplete ? "Complete" : "Running"}
        </span>
      </div>

      <ol className="m-0 list-none p-0" aria-live="polite" aria-busy={!isComplete}>
        {run.steps.map((step, i) => (
          <RunRow key={step.n} step={step} state={stateOf(i, activeStep)} />
        ))}
      </ol>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-[var(--color-divider)] px-4.5 py-3.5">
        <p
          className={cn(
            "m-0 max-w-[46ch] text-[13px] leading-[1.5] transition-opacity duration-500",
            isComplete ? "opacity-100" : "opacity-0",
          )}
        >
          {run.done}
        </p>
        <button
          type="button"
          onClick={() => setActiveStep(0)}
          disabled={!isComplete}
          className="font-heading shrink-0 cursor-pointer border-2 border-[var(--color-divider)] px-3.5 py-2 text-[13px] font-extrabold transition-colors hover:bg-[color-mix(in_srgb,var(--color-text)_7%,transparent)] disabled:cursor-default disabled:opacity-35"
        >
          Run it again
        </button>
      </div>

      <p className="text-muted m-0 border-t-2 border-[var(--color-divider)] px-4.5 py-3 text-[12px]">
        {run.caption}
      </p>
    </div>
  );
}
