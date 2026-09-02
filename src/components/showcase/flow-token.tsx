"use client";

import { useEffect, useMemo } from "react";
import { motion } from "motion/react";

import type { Flow } from "@/content/flows";
import { routeNodeTimes, routePoints, routeTimes } from "@/lib/flow-geometry";
import type { LiveItem } from "@/types/showcase";

const TOKEN_SIZE = 3;

/**
 * A single piece of work, moving. It reports each node it reaches so the
 * schematic can react at the moment work actually arrives.
 */
export function FlowToken({
  flow,
  item,
  travelSeconds,
  onArrive,
  onReachNode,
}: {
  flow: Flow;
  item: LiveItem;
  travelSeconds: number;
  onArrive: () => void;
  onReachNode: (nodeId: string) => void;
}) {
  // Resolved against the graph currently drawn, so switching to the by-hand
  // version re-routes work through the person instead of hunting for node ids
  // that only exist on the built flow.
  const route = item.isException
    ? flow.exceptionRoute
    : flow.routes[item.routeIndex % flow.routes.length];

  // Memoised because the canvas re-renders on every node flash. Fresh keyframe
  // arrays on each of those renders would restart the journey mid-flight.
  const { points, times } = useMemo(() => {
    const walked = routePoints(flow, route);
    return { points: walked, times: [...routeTimes(walked)] };
  }, [flow, route]);

  useEffect(() => {
    const timers = routeNodeTimes(flow, route).map((stop) =>
      window.setTimeout(() => onReachNode(stop.nodeId), stop.t * travelSeconds * 1000),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [flow, route, travelSeconds, onReachNode]);

  const offset = TOKEN_SIZE / 2;

  return (
    <motion.rect
      width={TOKEN_SIZE}
      height={TOKEN_SIZE}
      fill={item.isException ? "var(--color-neutral-600)" : "var(--color-accent)"}
      initial={{ x: points[0].x - offset, y: points[0].y - offset }}
      animate={{
        x: points.map((point) => point.x - offset),
        y: points.map((point) => point.y - offset),
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: travelSeconds, ease: "linear", times }}
      onAnimationComplete={onArrive}
    />
  );
}
