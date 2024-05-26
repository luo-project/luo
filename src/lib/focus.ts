import type { Graph, Vertex } from "./graph";
import { isVertex } from "./graph";
import type { GraphRenderInfo, VertexRenderInfo } from "./state";

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

function center({ x, y, width, height }: VertexRenderInfo) {
  return [x + width / 2, y + height / 2];
}

export function nearestVertex(
  graph: Graph,
  graphRenderInfo: GraphRenderInfo,
  here: Vertex,
  ray: [number, number, number, number],
): Vertex | undefined {
  const vertex = graphRenderInfo.vertex;
  const [sx, sy] = center(vertex(here.id));

  const [x1, y1, x2, y2] = ray;

  const [nearest, ...rest] = graph.elements
    .filter(isVertex)
    .filter((v) => v.id !== here.id)
    .filter((v) => {
      const { width, height } = vertex(v.id);
      const [xm2, ym2] = center(vertex(v.id));

      const [[x3, y3], [x4, y4]] = rectangle(xm2, ym2, width, height);

      return intersects(x1, y1, x2, y2, x3, y3, x4, y4);
    })
    .sort((a, b) => {
      const [x1, y1] = center(vertex(a.id));
      const [x2, y2] = center(vertex(b.id));

      const distA = dist(sx, sy, x1, y1);
      const distB = dist(sx, sy, x2, y2);

      return distA - distB;
    });

  return nearest;
}
