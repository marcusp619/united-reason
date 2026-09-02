"use client";

import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

import type { Flow } from "@/content/flows";
import type { LiveItem, LogEntry } from "@/types/showcase";

const EMIT_MS = 720;
const FIRST_EMIT_MS = 140;
/** Every third item is one the automation won't decide on its own. */
const EXCEPTION_EVERY = 3;
/** Long enough for the schematic to finish drawing before work enters it. */
const BUILD_MS = 1000;

export function isExceptionItem(index: number): boolean {
  return index % EXCEPTION_EVERY === EXCEPTION_EVERY - 1;
}

/**
 * Which normal route an item takes, cycling through them.
 *
 * Counted over normal items only. Cycling on the raw index would mean route 2
 * of 3 landed exclusively on indices the exception rule had already claimed, so
 * a third of a fan-in's sources would never once light up.
 */
export function routeIndexFor(index: number): number {
  return index - Math.floor(index / EXCEPTION_EVERY);
}

function outcomeLabel(flow: Flow, index: number): string {
  const route = isExceptionItem(index)
    ? flow.exceptionRoute
    : flow.routes[routeIndexFor(index) % flow.routes.length];
  const finalId = route[route.length - 1];
  return flow.nodes.find((node) => node.id === finalId)?.label ?? "Done";
}

/**
 * Owns one run of a flow: emitting work, collecting what arrives, and starting
 * itself once the panel is on screen.
 *
 * Kept out of the component so the showcase is composition and layout, and so
 * the timing rules live in one place rather than across three effects in a
 * file that also draws things.
 */
export function useFlowRun({
  flow,
  isManual,
  isVisible,
}: {
  /** Always the built flow — labels and figures come from it in both modes. */
  flow: Flow;
  isManual: boolean;
  isVisible: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const [emitted, setEmitted] = useState(0);
  const [items, setItems] = useState<readonly LiveItem[]>([]);
  const [entries, setEntries] = useState<readonly LogEntry[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasAutoRun, setHasAutoRun] = useState(false);

  const total = flow.items.length;
  const isComplete = entries.length >= total;

  const buildEntry = useCallback(
    (index: number): LogEntry => ({
      key: index,
      label: flow.items[index],
      outcome: isManual ? `${flow.minutesByHandEach} min` : outcomeLabel(flow, index),
      isException: isManual || isExceptionItem(index),
    }),
    [flow, isManual],
  );

  const clear = useCallback(() => {
    setItems([]);
    setEntries([]);
    setEmitted(0);
    setIsRunning(false);
  }, []);

  const start = useCallback(() => {
    // Claims the auto-run too, so a pending one cannot restart what you began.
    setHasAutoRun(true);
    if (prefersReduced) {
      setEntries(flow.items.map((_, i) => buildEntry(i)));
      setEmitted(total);
      setIsRunning(false);
      return;
    }
    clear();
    setIsRunning(true);
  }, [prefersReduced, flow, buildEntry, total, clear]);

  /** Wipes the run and re-arms the auto-start, for a new problem or mode. */
  const restart = useCallback(() => {
    setHasAutoRun(false);
    clear();
  }, [clear]);

  // Runs itself once on screen. The delay lets the schematic finish drawing
  // first — work arriving into a half-built graph reads as a glitch.
  useEffect(() => {
    if (!isVisible || hasAutoRun) return;
    const id = window.setTimeout(
      () => {
        setHasAutoRun(true);
        if (prefersReduced) {
          setEntries(flow.items.map((_, i) => buildEntry(i)));
          setEmitted(total);
          return;
        }
        setIsRunning(true);
      },
      prefersReduced ? 0 : BUILD_MS,
    );
    return () => window.clearTimeout(id);
  }, [isVisible, hasAutoRun, prefersReduced, flow, total, buildEntry]);

  useEffect(() => {
    if (!isRunning || emitted >= total) return;
    const id = window.setTimeout(
      () => {
        setItems((prev) => [
          ...prev,
          {
            key: emitted,
            label: flow.items[emitted],
            isException: isManual || isExceptionItem(emitted),
            routeIndex: routeIndexFor(emitted),
          },
        ]);
        setEmitted(emitted + 1);
      },
      emitted === 0 ? FIRST_EMIT_MS : EMIT_MS,
    );
    return () => window.clearTimeout(id);
  }, [isRunning, emitted, total, flow, isManual]);

  const handleArrive = useCallback(
    (item: LiveItem) => {
      setItems((prev) => prev.filter((live) => live.key !== item.key));
      setEntries((prev) => [...prev, buildEntry(item.key)]);
    },
    [buildEntry],
  );

  return { items, entries, isRunning, isComplete, total, start, restart, handleArrive };
}
