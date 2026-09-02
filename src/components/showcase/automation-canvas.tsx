"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import type { Flow } from "@/content/flows";
import { edgePoints, toPathData, VIEW_HEIGHT, VIEW_WIDTH } from "@/lib/flow-geometry";
import type { LiveItem } from "@/types/showcase";
import { FlowToken } from "./flow-token";
import { NodeBox } from "./node-box";

const EASE_OUT = [0.2, 0, 0, 1] as const;

function EdgeLine({ flow, index }: { flow: Flow; index: number }) {
  const edge = flow.edges[index];
  const common = {
    d: toPathData(edgePoints(flow.nodes, edge)),
    fill: "none",
    strokeWidth: 2,
    vectorEffect: "non-scaling-stroke" as const,
  };

  // Exception runs animate opacity only: motion drives pathLength through
  // stroke-dasharray, which would silently overwrite the dashes that make an
  // exception path read as an exception.
  if (edge.exception) {
    return (
      <motion.path
        {...common}
        stroke="var(--color-neutral-500)"
        strokeDasharray="4 3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 + index * 0.08, duration: 0.4 }}
      />
    );
  }

  return (
    <motion.path
      {...common}
      stroke="var(--color-accent)"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.5, ease: EASE_OUT }}
    />
  );
}

/**
 * The schematic: nodes, the runs between them, and the work moving through.
 *
 * Nodes are HTML positioned over the SVG rather than drawn inside it, so their
 * type stays crisp and selectable while the connectors keep the exactness of a
 * drawing. Every position comes from `flow-geometry`, never a hand-tuned number.
 */
export function AutomationCanvas({
  flow,
  flowKey,
  items,
  travelSeconds,
  onArrive,
}: {
  flow: Flow;
  /** Changing this rebuilds the whole schematic rather than morphing it. */
  flowKey: string;
  items: readonly LiveItem[];
  travelSeconds: number;
  onArrive: (item: LiveItem) => void;
}) {
  const [pulses, setPulses] = useState<Record<string, number>>({});

  // Scoped by flow: several flows share node ids ("find", "you"), and an
  // unscoped tally would hand a freshly mounted node a non-zero count and flash
  // it the instant you switched problems.
  const handleReachNode = useCallback(
    (nodeId: string) => {
      const scoped = `${flowKey}:${nodeId}`;
      setPulses((prev) => ({ ...prev, [scoped]: (prev[scoped] ?? 0) + 1 }));
    },
    [flowKey],
  );

  return (
    <div className="overflow-x-auto">
      <div className="relative aspect-[100/72] min-w-[620px]">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <g key={flowKey}>
            {flow.edges.map((edge, i) => (
              <EdgeLine key={`${edge.from}-${edge.to}`} flow={flow} index={i} />
            ))}
          </g>
          <AnimatePresence>
            {items.map((item) => (
              <FlowToken
                key={item.key}
                flow={flow}
                item={item}
                travelSeconds={travelSeconds}
                onArrive={() => onArrive(item)}
                onReachNode={handleReachNode}
              />
            ))}
          </AnimatePresence>
        </svg>

        <AnimatePresence mode="popLayout">
          {flow.nodes.map((node, i) => (
            <NodeBox
              key={`${flowKey}-${node.id}`}
              node={node}
              index={i}
              pulse={pulses[`${flowKey}:${node.id}`] ?? 0}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
