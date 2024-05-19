import type { GlobalContext } from "./state";

export type Graph = {
  elements: GraphElement[];
};

/**
 * All GraphElements have an unique id regardless of type(Vertex or Edge).
 */
export type GraphElementId = string;

export type GraphElementBase = {
  id: GraphElementId;
  label?: string;
};

export type GraphElement = Vertex | Edge;

export type Vertex = GraphElementBase & {
  t: "v";
  shape: VertexShape;
};

export type VertexShape = "rect" | "circle" | "ellipse" | "diamond";

export type Edge = GraphElementBase & {
  t: "e";
  source: GraphElementId;
  target: GraphElementId;
};

/**
 * GraphPallete stores information of GraphElement will be created next time.
 */
export type GraphPallete = {
  nextId: number;
  vertexShape: VertexShape;
};

export type GraphFocus = GraphElementId;

export function isVertex(e: GraphElement): e is Vertex {
  return e.t === "v";
}

// @TODO: 현재는 RenderInfo에 vertex만 좌표 정보가 있으므로, edge 처리는 나중에 추가.
// edge는 좌표들의 무게중심을 구해서 x, y 좌표를 정하면 될 것 같다.
export function sortGraphElementsByPosition(
  elements: GraphElement[],
  globalCtx: GlobalContext,
): GraphElement[] {
  let vertexRenderInfos = elements.filter(isVertex).map((v) => {
    const vertex = globalCtx.graphRenderInfo.vertex(v.id);
    return { ...vertex, id: v.id };
  });

  vertexRenderInfos = vertexRenderInfos.sort((a, b) => {
    let a_score = Math.floor(a.y / 100) * 10000 + a.x;
    let b_score = Math.floor(b.y / 100) * 10000 + b.x;
    return a_score - b_score;
  });
  return vertexRenderInfos.map((v) => elements.find((e) => e.id === v.id)!);
}
