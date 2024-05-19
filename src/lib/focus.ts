import type { Graph, Vertex } from "./graph";
import { isVertex } from "./graph";
import type { GraphRenderInfo } from "./state";

function dist(x1: number, y1: number, x2: number, y2: number) {
  return (x1 - x2) ** 2 + (y1 - y2) ** 2;
}

export function nearestVertex(
  graph: Graph,
  graphRenderInfo: GraphRenderInfo,
  here: Vertex,
  condition: (x1: number, y1: number, x2: number, y2: number) => boolean,
): Vertex | undefined {
  const vertex = graphRenderInfo.vertex;
  const { x: x1, y: y1 } = vertex(here.id);

  const [nearest, ...rest] = graph.elements
    .filter(isVertex)
    .filter((v) => v.id !== here.id)
    .filter((v) => {
      const { x: x2, y: y2 } = vertex(v.id);
      return condition(x1, y1, x2, y2);
    })
    .sort((a, b) => {
      const { x: x2, y: y2 } = vertex(a.id);
      const { x: x3, y: y3 } = vertex(b.id);

      const distA = dist(x1, y1, x2, y2);
      const distB = dist(x1, y1, x3, y3);

      return distA - distB;
    });

  return nearest;
}
