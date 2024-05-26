import type { Graph, Vertex } from "./graph";
import { isVertex } from "./graph";
import { logger } from "./log";
import type { GraphRenderInfo } from "./state";

function dist(x1: number, y1: number, x2: number, y2: number) {
  return (x1 - x2) ** 2 + (y1 - y2) ** 2;
}

// return upper left corner and lower right corner
function rectangle(x: number, y: number, width: number, height: number) {
  return [
    [x - width / 2, y - height / 2],
    [x + width / 2, y + height / 2],
  ];
}

function intersects(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number,
) {
  return x1 <= x4 && x2 >= x3 && y1 <= y4 && y2 >= y3;
}

export function nearestVertex(
  graph: Graph,
  graphRenderInfo: GraphRenderInfo,
  here: Vertex,
  ray: [number, number, number, number],
): Vertex | undefined {
  const vertex = graphRenderInfo.vertex;
  const { x, y, width, height } = vertex(here.id);
  const xm1 = x + width / 2;
  const ym1 = y + height / 2;

  const [x1, y1, x2, y2] = ray;

  const [nearest, ...rest] = graph.elements
    .filter(isVertex)
    .filter((v) => v.id !== here.id)
    .filter((v) => {
      const { x, y, width, height } = vertex(v.id);
      const xm2 = x + width / 2;
      const ym2 = y + height / 2;

      const [[x3, y3], [x4, y4]] = rectangle(xm2, ym2, width, height);

      return intersects(x1, y1, x2, y2, x3, y3, x4, y4);
    })
    .sort((a, b) => {
      const { x: x1, y: y1 } = vertex(a.id);
      const { x: x2, y: y2 } = vertex(b.id);

      const distA = dist(xm1, ym1, x1, y1);
      const distB = dist(xm1, ym1, x2, y2);

      return distA - distB;
    });

  return nearest;
}
