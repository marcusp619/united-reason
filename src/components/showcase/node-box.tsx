"use client";

import { useEffect } from "react";
import { motion, useAnimate } from "motion/react";

import type { FlowNode } from "@/content/flows";
import {
  nodeCentre,
  NODE_HALF_HEIGHT,
  NODE_HALF_WIDTH,
  VIEW_HEIGHT,
  VIEW_WIDTH,
} from "@/lib/flow-geometry";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.2, 0, 0, 1] as const;

/** Percentage of the canvas, from a geometry value in SVG user units. */
function percentX(value: number): string {
  return `${(value / VIEW_WIDTH) * 100}%`;
}

function percentY(value: number): string {
  return `${(value / VIEW_HEIGHT) * 100}%`;
}

/**
 * One box on the schematic, which flashes as work reaches it.
 *
 * The flash lives on its own overlay rather than on the box's own colours:
 * every node kind then returns to the same known resting state, opacity 0,
 * instead of needing a per-kind restore value.
 */
export function NodeBox({
  node,
  index,
  pulse,
}: {
  node: FlowNode;
  index: number;
  /** Increments each time an item reaches this node. */
  pulse: number;
}) {
  const centre = nodeCentre(node);
  const [wash, animateWash] = useAnimate();

  useEffect(() => {
    if (pulse === 0 || !wash.current) return;
    animateWash(wash.current, { opacity: [0, 0.34, 0] }, { duration: 0.52, ease: "easeOut" });
  }, [pulse, wash, animateWash]);

  return (
    <motion.div
      // Derived from the schematic geometry, so these can only be computed
      // values — the one case the project's ban on style objects allows.
      style={{
        left: percentX(centre.x - NODE_HALF_WIDTH),
        top: percentY(centre.y - NODE_HALF_HEIGHT),
        width: percentX(NODE_HALF_WIDTH * 2),
        height: percentY(NODE_HALF_HEIGHT * 2),
      }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.07, duration: 0.36, ease: EASE_OUT }}
      className={cn(
        "absolute flex flex-col justify-center gap-1 overflow-hidden px-2.5 py-2",
        node.kind === "outcome" && "bg-brand text-ground border-brand border-2",
        (node.kind === "trigger" || node.kind === "step") &&
          "bg-ground border-2 border-[var(--color-divider)]",
        node.kind === "human" && "border-2 border-dashed border-[var(--color-neutral-500)]",
      )}
    >
      <span
        ref={wash}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0",
          node.kind === "outcome" ? "bg-ground" : "bg-brand",
        )}
      />
      <span
        className={cn(
          "relative text-[9px] font-bold tracking-[0.16em]",
          node.kind === "outcome" ? "text-ground" : "text-brand",
          node.kind === "human" && "text-[var(--color-neutral-600)]",
        )}
      >
        {String(index + 1).padStart(3, "0")}
      </span>
      <span className="font-heading relative text-[11px] leading-[1.15] font-extrabold md:text-[13px]">
        {node.label}
      </span>
    </motion.div>
  );
}
