import type { Flow, FlowEdge, FlowNode } from "@/content/flows";

/**
 * Schematic geometry for the automation canvas.
 *
 * Kept pure and away from the component so the drawing can be reasoned about
 * and tested without a DOM. Everything is expressed in the SVG's own user
 * units; the canvas renders at exactly VIEW_WIDTH × VIEW_HEIGHT, so the same
 * numbers position the HTML node boxes as percentages.
 */

export const VIEW_WIDTH = 100;
export const VIEW_HEIGHT = 72;
const COLUMNS = 4;
const ROWS = 3;

const COLUMN_WIDTH = VIEW_WIDTH / COLUMNS;
const ROW_HEIGHT = VIEW_HEIGHT / ROWS;

/** Half the node box, in user units. Edges leave and enter at these faces. */
export const NODE_HALF_WIDTH = 10.5;
export const NODE_HALF_HEIGHT = 7.5;

export type Point = { x: number; y: number };

export function nodeCentre(node: FlowNode): Point {
  return {
    x: node.col * COLUMN_WIDTH + COLUMN_WIDTH / 2,
    y: node.row * ROW_HEIGHT + ROW_HEIGHT / 2,
  };
}

function findNode(nodes: readonly FlowNode[], id: string): FlowNode {
  const node = nodes.find((candidate) => candidate.id === id);
  if (!node) throw new Error(`Flow references a node "${id}" that does not exist`);
  return node;
}

/** Keeps the two legs of a loop apart so they read as a round trip. */
const LOOP_OFFSET = 2.2;
/** How far below a row a backward run travels on its way home. */
const RETURN_LANE = 0.55;

/**
 * An orthogonal run between two nodes. Diagonals would be wrong here — nothing
 * else in this system is drawn on an angle.
 *
 * Three cases, because the flows are genuinely different shapes rather than one
 * shape with different labels:
 *
 *   forward   left to right, straight along a row or stepped through a midpoint
 *   vertical  same column, bottom face to top face — the consult that dips into
 *             your own material and comes back, offset so the two legs of the
 *             round trip do not sit on top of each other
 *   backward  right to left, dropping into a lane below the row and running
 *             home underneath — the retry that chases again
 */
export function edgePoints(nodes: readonly FlowNode[], edge: FlowEdge): readonly Point[] {
  const fromNode = findNode(nodes, edge.from);
  const toNode = findNode(nodes, edge.to);
  const from = nodeCentre(fromNode);
  const to = nodeCentre(toNode);

  if (fromNode.col === toNode.col) {
    const goingDown = to.y > from.y;
    const x = from.x + (goingDown ? -LOOP_OFFSET : LOOP_OFFSET);
    const leave = goingDown ? from.y + NODE_HALF_HEIGHT : from.y - NODE_HALF_HEIGHT;
    const meet = goingDown ? to.y - NODE_HALF_HEIGHT : to.y + NODE_HALF_HEIGHT;
    return [
      { x, y: leave },
      { x, y: meet },
    ];
  }

  if (toNode.col < fromNode.col) {
    const lane = Math.max(from.y, to.y) + ROW_HEIGHT * RETURN_LANE;
    return [
      { x: from.x, y: from.y + NODE_HALF_HEIGHT },
      { x: from.x, y: lane },
      { x: to.x, y: lane },
      { x: to.x, y: to.y + NODE_HALF_HEIGHT },
    ];
  }

  const exit = { x: from.x + NODE_HALF_WIDTH, y: from.y };
  const entry = { x: to.x - NODE_HALF_WIDTH, y: to.y };
  if (exit.y === entry.y) return [exit, entry];

  const midX = (exit.x + entry.x) / 2;
  return [exit, { x: midX, y: exit.y }, { x: midX, y: entry.y }, entry];
}

export function toPathData(points: readonly Point[]): string {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ");
}

/**
 * The full run a work item travels, centre to centre, including the corners of
 * every edge along the way. Returned as separate x and y tracks because that is
 * the shape an animation library wants for keyframes.
 */
export function routePoints(flow: Flow, route: readonly string[]): readonly Point[] {
  const points: Point[] = [nodeCentre(findNode(flow.nodes, route[0]))];

  for (let i = 0; i < route.length - 1; i += 1) {
    const edge = { from: route[i], to: route[i + 1] };
    for (const point of edgePoints(flow.nodes, edge)) points.push(point);
    points.push(nodeCentre(findNode(flow.nodes, route[i + 1])));
  }

  return points;
}

/**
 * Normalised distance along a route, one entry per point.
 *
 * Fed to the animation as keyframe `times`. Without it every segment would take
 * an equal slice of the duration, so an item would crawl along a short corner
 * and sprint down a long run — the giveaway that a diagram is animated rather
 * than running.
 */
export function routeTimes(points: readonly Point[]): readonly number[] {
  const cumulative: number[] = [0];
  let total = 0;

  for (let i = 1; i < points.length; i += 1) {
    total += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
    cumulative.push(total);
  }

  if (total === 0) return points.map(() => 0);
  return cumulative.map((distance) => distance / total);
}

/**
 * When an item reaches each node on its route, as a fraction of the journey.
 *
 * Lets a node react at the moment work actually arrives in it. Without this the
 * squares slide over a static drawing and the whole thing reads as decoration
 * rather than execution.
 */
export function routeNodeTimes(
  flow: Flow,
  route: readonly string[],
): readonly { nodeId: string; t: number }[] {
  const times = routeTimes(routePoints(flow, route));
  const stops = [{ nodeId: route[0], t: times[0] }];
  let index = 0;

  for (let i = 0; i < route.length - 1; i += 1) {
    index += edgePoints(flow.nodes, { from: route[i], to: route[i + 1] }).length + 1;
    stops.push({ nodeId: route[i + 1], t: times[index] });
  }

  return stops;
}
