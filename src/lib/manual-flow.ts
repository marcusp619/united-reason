import type { Flow, FlowEdge, FlowNode } from "@/content/flows";

/**
 * The same job as it happens today, with a person in the middle of it.
 *
 * Derived rather than authored so the two graphs can never describe different
 * work — the triggers and the outcome are lifted straight off the built flow,
 * and only the middle changes. Every run is drawn as an exception, because by
 * hand there is no happy path: all of it is somebody's afternoon.
 *
 * It keeps the built flow's shape where the shape is the point. A job fed from
 * three places is still fed from three places when a person does it, and a job
 * that goes round twice still goes round twice — it's just that the person is
 * the one going round.
 */
export function toManualFlow(flow: Flow): Flow {
  const label = (id: string) => flow.nodes.find((node) => node.id === id)?.label ?? "";
  const firstRoute = flow.routes[0];
  const finalId = firstRoute[firstRoute.length - 1];
  const sources = flow.nodes.filter((node) => node.kind === "trigger");

  const nodes: FlowNode[] = [
    ...sources.map((source) => ({ ...source, col: 0 })),
    { id: "hand-1", label: flow.manualSteps[0], kind: "human" as const, col: 1, row: 1 },
    { id: "hand-2", label: flow.manualSteps[1], kind: "human" as const, col: 2, row: 1 },
    { id: "out", label: label(finalId), kind: "outcome" as const, col: 3, row: 1 },
  ];

  const edges: FlowEdge[] = [
    ...sources.map((source) => ({ from: source.id, to: "hand-1", exception: true })),
    { from: "hand-1", to: "hand-2", exception: true },
    { from: "hand-2", to: "out", exception: true },
  ];

  if (flow.manualLoop) edges.push({ from: "hand-2", to: "hand-1", exception: true });

  const tail = flow.manualLoop
    ? ["hand-1", "hand-2", "hand-1", "hand-2", "out"]
    : ["hand-1", "hand-2", "out"];

  return {
    ...flow,
    nodes,
    edges,
    routes: sources.map((source) => [source.id, ...tail]),
    exceptionRoute: [sources[0].id, ...tail],
  };
}
