import { describe, expect, it } from "vitest";

import type { Flow, FlowNode } from "@/content/flows";
import { flows } from "@/content/flows";
import { problems } from "@/content/problems";
import { toManualFlow } from "./manual-flow";
import {
  edgePoints,
  hoursSavedPerWeek,
  nodeCentre,
  routeNodeTimes,
  routePoints,
  routeTimes,
  toPathData,
  NODE_HALF_HEIGHT,
  NODE_HALF_WIDTH,
  VIEW_HEIGHT,
  VIEW_WIDTH,
  type Point,
} from "./flow-geometry";

const [readAndFile, answerQuestions, followUp] = flows;

/*
 * Both graphs a visitor can be shown. The by-hand versions are derived, so they
 * are exactly as capable of being drawn wrong as the authored ones — and they
 * have to hold the same invariants.
 */
const allGraphs: readonly Flow[] = [...flows, ...flows.map(toManualFlow)];

/** Every route a flow can send work along. */
function allRoutes(flow: Flow): readonly (readonly string[])[] {
  return [...flow.routes, flow.exceptionRoute];
}

function boxOf(node: FlowNode) {
  const { x, y } = nodeCentre(node);
  return {
    left: x - NODE_HALF_WIDTH,
    right: x + NODE_HALF_WIDTH,
    top: y - NODE_HALF_HEIGHT,
    bottom: y + NODE_HALF_HEIGHT,
  };
}

/** Axis-aligned, so an overlap is two range checks. Touching a face is fine. */
function segmentCutsBox(a: Point, b: Point, box: ReturnType<typeof boxOf>): boolean {
  const overlaps = (lo: number, hi: number, min: number, max: number) => lo < max && hi > min;
  return (
    overlaps(Math.min(a.x, b.x), Math.max(a.x, b.x), box.left, box.right) &&
    overlaps(Math.min(a.y, b.y), Math.max(a.y, b.y), box.top, box.bottom)
  );
}

describe("flow geometry", () => {
  it("keeps every node inside the canvas", () => {
    for (const flow of allGraphs) {
      for (const node of flow.nodes) {
        const box = boxOf(node);
        expect(box.left).toBeGreaterThanOrEqual(0);
        expect(box.right).toBeLessThanOrEqual(VIEW_WIDTH);
        expect(box.top).toBeGreaterThanOrEqual(0);
        expect(box.bottom).toBeLessThanOrEqual(VIEW_HEIGHT);
      }
    }
  });

  it("draws a straight run between nodes on the same row", () => {
    const points = edgePoints(readAndFile.nodes, { from: "arrive", to: "read" });
    expect(points).toHaveLength(2);
    expect(points[0].y).toBe(points[1].y);
  });

  it("drops straight down between nodes in the same column", () => {
    const points = edgePoints(answerQuestions.nodes, { from: "find", to: "source" });
    expect(points).toHaveLength(2);
    expect(points[0].x).toBe(points[1].x);
  });

  it("separates the two legs of a round trip", () => {
    const down = edgePoints(answerQuestions.nodes, { from: "find", to: "source" });
    const up = edgePoints(answerQuestions.nodes, { from: "source", to: "find" });
    expect(down[0].x).not.toBe(up[0].x);
  });

  it("sends a backward run home underneath the row", () => {
    const points = edgePoints(followUp.nodes, { from: "chase", to: "schedule" });
    const lane = points[1].y;
    const rowBottom = nodeCentre(followUp.nodes[2]).y + NODE_HALF_HEIGHT;
    expect(lane).toBeGreaterThan(rowBottom);
    expect(points[points.length - 1].x).toBeLessThan(points[0].x);
  });

  it("never draws a diagonal", () => {
    for (const flow of allGraphs) {
      for (const edge of flow.edges) {
        const points = edgePoints(flow.nodes, edge);
        for (let i = 0; i < points.length - 1; i += 1) {
          const orthogonal = points[i].x === points[i + 1].x || points[i].y === points[i + 1].y;
          expect(orthogonal, `${edge.from}→${edge.to} bends on an angle`).toBe(true);
        }
      }
    }
  });

  /*
   * The layouts are hand-placed but the runs between them are derived, so a
   * node added to the wrong cell shows up as a line drawn straight through an
   * unrelated box. That is invisible in a diff and obvious on screen.
   */
  it("routes every run around the boxes it does not connect", () => {
    for (const flow of allGraphs) {
      for (const edge of flow.edges) {
        const points = edgePoints(flow.nodes, edge);
        const others = flow.nodes.filter((n) => n.id !== edge.from && n.id !== edge.to);
        for (let i = 0; i < points.length - 1; i += 1) {
          for (const node of others) {
            const cuts = segmentCutsBox(points[i], points[i + 1], boxOf(node));
            expect(cuts, `${edge.from}→${edge.to} runs through "${node.id}"`).toBe(false);
          }
        }
      }
    }
  });

  it("throws loudly rather than drawing a broken graph", () => {
    expect(() => edgePoints(readAndFile.nodes, { from: "arrive", to: "nope" })).toThrow(/nope/);
  });

  it("spaces keyframe times by distance, so travel is constant speed", () => {
    // An L: 10 across, then 30 down. The corner must land a quarter of the way
    // through, not half — evenly spaced times would make the short leg slow.
    const times = routeTimes([
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 30 },
    ]);
    expect(times).toEqual([0, 0.25, 1]);
  });

  it("gives every route strictly rising times the animation can use", () => {
    for (const flow of allGraphs) {
      for (const route of allRoutes(flow)) {
        const times = routeTimes(routePoints(flow, route));
        expect(times[0]).toBe(0);
        expect(times[times.length - 1]).toBe(1);
        for (let i = 1; i < times.length; i += 1) {
          expect(times[i]).toBeGreaterThan(times[i - 1]);
        }
      }
    }
  });

  it("marks one arrival per node, including a node visited twice", () => {
    for (const flow of allGraphs) {
      for (const route of allRoutes(flow)) {
        const stops = routeNodeTimes(flow, route);
        expect(stops.map((stop) => stop.nodeId)).toEqual([...route]);
        expect(stops[0].t).toBe(0);
        expect(stops[stops.length - 1].t).toBe(1);
      }
    }
  });

  it("walks the loop through its repeated node twice", () => {
    const stops = routeNodeTimes(followUp, followUp.routes[0]);
    expect(stops.filter((stop) => stop.nodeId === "chase")).toHaveLength(2);
  });

  it("writes path data starting with a single move", () => {
    const data = toPathData([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
    expect(data).toBe("M1 2 L3 4");
  });
});

describe("flow content integrity", () => {
  it("gives every problem in the picker a flow to build", () => {
    expect(flows).toHaveLength(problems.length);
  });

  /*
   * The whole point of five flows is that they are five different shapes. Two
   * with the same wiring means one of them is a screensaver.
   */
  it("gives each problem a genuinely different shape", () => {
    const shapes = flows.map((flow) => {
      const at = (id: string) => {
        const node = flow.nodes.find((n) => n.id === id);
        return node ? `${node.col},${node.row}` : "?";
      };
      return flow.edges
        .map((edge) => `${at(edge.from)}>${at(edge.to)}`)
        .sort()
        .join("|");
    });
    expect(new Set(shapes).size).toBe(flows.length);
  });

  it.each(allGraphs.map((flow, i) => ({ i, flow })))("wires graph $i to real nodes", ({ flow }) => {
    const ids = new Set(flow.nodes.map((n) => n.id));
    for (const edge of flow.edges) {
      expect(ids.has(edge.from), `${edge.from} is not a node`).toBe(true);
      expect(ids.has(edge.to), `${edge.to} is not a node`).toBe(true);
    }
    for (const route of allRoutes(flow)) {
      for (const id of route) {
        expect(ids.has(id), `${id} is on a route but is not a node`).toBe(true);
      }
    }
  });

  it.each(allGraphs.map((flow, i) => ({ i, flow })))(
    "gives graph $i every run a line",
    ({ flow }) => {
      const drawn = new Set(flow.edges.map((edge) => `${edge.from}>${edge.to}`));
      for (const route of allRoutes(flow)) {
        for (let i = 0; i < route.length - 1; i += 1) {
          const step = `${route[i]}>${route[i + 1]}`;
          expect(drawn.has(step), `${step} is travelled but never drawn`).toBe(true);
        }
      }
    },
  );

  it("gives the by-hand views different shapes as well", () => {
    const shapes = flows.map((flow) => {
      const manual = toManualFlow(flow);
      return manual.edges
        .map((edge) => `${edge.from}>${edge.to}`)
        .sort()
        .join("|");
    });
    // The chase loops and the report is fed from three places; a single-source
    // straight run is the honest shape for the rest.
    expect(new Set(shapes).size).toBeGreaterThan(1);
  });

  it.each(flows.map((flow, i) => ({ i, flow })))("saves stateable time on flow $i", ({ flow }) => {
    expect(flow.minutesByHandEach).toBeGreaterThan(flow.minutesAutomatedEach);
    expect(hoursSavedPerWeek(flow)).toBeGreaterThan(0);
    expect(flow.items.length).toBeGreaterThan(3);
  });
});
