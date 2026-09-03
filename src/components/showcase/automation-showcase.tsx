"use client";

import { useMemo, useRef, useState } from "react";
import { useInView } from "motion/react";

import { Button, Kicker } from "@/components/primitives";
import { flows } from "@/content/flows";
import { problems } from "@/content/problems";
import { cta } from "@/content/site";
import { flowAtVolume, oneInHowMany, timeSavedPerWeek, timeSpentPerWeek } from "@/lib/flow-figures";
import { clampWorthInputs, defaultWorthInputs, type WorthInputs } from "@/lib/flow-worth";
import { toManualFlow } from "@/lib/manual-flow";
import type { RunStat, ShowcaseMode } from "@/types/showcase";
import { AutomationCanvas } from "./automation-canvas";
import { ModeSwitch } from "./mode-switch";
import { ProblemTabs } from "./problem-tabs";
import { RunLog } from "./run-log";
import { RunStats } from "./run-stats";
import { useFlowRun } from "./use-flow-run";
import { WorthPanel } from "./worth-panel";

const TRAVEL_AUTOMATED = 2.4;
/** Slower by hand, because it is. */
const TRAVEL_BY_HAND = 3.6;

const MANUAL_NOTE =
  "That's the version running today. Every one of those went through a person, and it will again tomorrow.";

export function AutomationShowcase() {
  const panelRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(panelRef, { once: true, amount: 0.3 });

  const [selected, setSelected] = useState(0);
  const [mode, setMode] = useState<ShowcaseMode>("automated");
  /*
   * Volume is a fact about the job, so it follows the tab; the hourly cost is
   * a fact about the visitor's business, so it survives one. `null` means
   * "whatever this flow says".
   */
  const [hourlyCost, setHourlyCost] = useState<number | null>(null);
  const [itemsPerWeek, setItemsPerWeek] = useState<number | null>(null);

  const builtFlow = flows[selected];
  const problem = problems[selected];
  const isManual = mode === "byHand";

  // Memoised: the manual graph is derived, and a fresh object every render
  // would restart every item mid-journey each time a node flashes.
  const drawnFlow = useMemo(
    () => (isManual ? toManualFlow(builtFlow) : builtFlow),
    [isManual, builtFlow],
  );

  const run = useFlowRun({ flow: builtFlow, isManual, isVisible });

  function handleSelect(index: number) {
    setSelected(index);
    setItemsPerWeek(null);
    run.restart();
  }

  function handleWorth(next: WorthInputs) {
    setHourlyCost(next.hourlyCost);
    setItemsPerWeek(next.itemsPerWeek);
  }

  function handleMode(next: ShowcaseMode) {
    setMode(next);
    run.restart();
  }

  const defaults = defaultWorthInputs(builtFlow);
  const worthInputs = clampWorthInputs(builtFlow, {
    hourlyCost: hourlyCost ?? defaults.hourlyCost,
    itemsPerWeek: itemsPerWeek ?? defaults.itemsPerWeek,
  });
  /*
   * The hours in the stat row are re-based on the visitor's volume too. Two
   * bases on one screen is how the figures start disagreeing with each other.
   */
  const basisFlow = flowAtVolume(builtFlow, worthInputs.itemsPerWeek);

  const flagged = run.entries.filter((entry) => entry.isException).length;

  const stats: readonly RunStat[] = isManual
    ? [
        { value: run.total, unit: "done", label: "All of it, by a person" },
        { value: builtFlow.minutesByHandEach, unit: "min", label: "Each one, every time" },
        { ...timeSpentPerWeek(basisFlow), label: "Gone, every week" },
      ]
    : [
        { value: run.total - flagged, unit: "done", label: "Handled by itself" },
        { value: flagged, unit: "you", label: "Sent to a person" },
        { ...timeSavedPerWeek(basisFlow), label: "Back, every week" },
      ];

  const status = run.isComplete ? "Complete" : run.isRunning ? "Running" : "Ready";

  return (
    <section id="showcase">
      <ProblemTabs selected={selected} onSelect={handleSelect} />

      <div
        ref={panelRef}
        id="showcase-panel"
        role="tabpanel"
        aria-labelledby={`showcase-tab-${selected}`}
        className="bg-brand-100 rule-draw"
      >
        <div className="flex flex-wrap items-end justify-between gap-5 px-5 pt-8 pb-6 md:px-16 md:pt-11">
          <div>
            <Kicker tone="deep">
              {isManual ? "How that happens today" : "What I’d build for that"}
            </Kicker>
            <h3 className="m-0 mb-3 max-w-[20ch] text-[26px] tracking-[-0.03em] md:text-[36px]">
              {isManual ? problem.title : problem.build}
            </h3>
            <p className="m-0 max-w-[46ch] text-[15px] leading-[1.55]">{problem.blurb}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ModeSwitch mode={mode} onChange={handleMode} />
            <span className="text-muted text-[11px] tracking-[0.16em] uppercase">{status}</span>
            <button
              type="button"
              onClick={run.start}
              disabled={run.isRunning && !run.isComplete}
              className="bg-brand-700 font-heading text-ground cursor-pointer px-4 py-2.5 text-sm font-extrabold transition-colors hover:bg-[var(--color-accent-800)] disabled:cursor-default disabled:opacity-40"
            >
              Run it
            </button>
          </div>
        </div>

        <div className="px-5 pb-6 md:px-16">
          <AutomationCanvas
            flow={drawnFlow}
            flowKey={`${selected}-${mode}`}
            items={run.items}
            travelSeconds={isManual ? TRAVEL_BY_HAND : TRAVEL_AUTOMATED}
            onArrive={run.handleArrive}
          />
          {!isManual && (
            <p className="text-muted m-0 mt-3 max-w-[70ch] text-[12px] leading-[1.5]">
              It flags every third one here so you can watch it happen. A real run of this is nearer
              one in {oneInHowMany(builtFlow)} &mdash; and the ones it flags are the ones worth your
              judgement anyway.
            </p>
          )}
        </div>

        <div className="grid gap-5 px-5 pb-8 md:grid-cols-2 md:px-16 md:pb-11">
          <RunLog entries={run.entries} isRunning={run.isRunning} />
          {run.isComplete ? (
            <RunStats stats={stats} note={isManual ? MANUAL_NOTE : builtFlow.note} />
          ) : (
            <div className="flex flex-col justify-center border-2 border-dashed border-[var(--color-divider)] px-4.5 py-6">
              <p className="text-muted m-0 text-[13px] leading-[1.55]">
                The figures land when the run finishes.
              </p>
            </div>
          )}
        </div>

        {!isManual && run.isComplete && (
          <WorthPanel flow={builtFlow} inputs={worthInputs} onChange={handleWorth} />
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-[var(--color-divider)] px-5 py-4 md:px-16">
          <p className="text-muted m-0 max-w-[58ch] text-[12px] leading-[1.5]">
            A demonstration, not a measurement &mdash; the shape of a typical week, with
            illustrative figures. The hours above already have the flagged ones taken back out.
            Yours get worked out on the call, in writing, before you commit to anything.
          </p>
          <div className="flex items-center gap-3">
            <Button href={cta.href}>Book a call about this</Button>
            <span className="text-muted text-sm">{problem.timeline} &middot; fixed quote</span>
          </div>
        </div>
      </div>
    </section>
  );
}
