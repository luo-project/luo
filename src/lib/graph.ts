import type { GlobalContext, State } from "./state";

export type Graph = {
  elements: GraphElement[];
};

/**
 * All GraphElements have an unique id regardless of type(Vertex or Edge).
 */
export type GraphElementId = string;

export type GraphElementBase = {
  id: GraphElementId;
  label: Label;
};

export type GraphElement = Vertex | Edge;

export type Vertex = GraphElementBase & {
  t: "v";
  shape: VertexShape;
};

export type VertexShape = "rectangle" | "circle" | "ellipse" | "diamond";

export type DefaultVertex = {
  shape: VertexShape;
};

export type Edge = GraphElementBase & {
  t: "e";
  source: GraphElementId;
  target: GraphElementId;
};

export type Label = {
  text: string;
};

export type DefaultEdge = {};

export type DefaultLabel = {
  text: string;
};

export type Focus = GraphElementId;

export function isVertex(e: GraphElement): e is Vertex {
  return e.t === "v";
}
export function isEdge(e: GraphElement): e is Edge {
  return e.t === "e";
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
    let a_score = Math.floor(a.y / 80) * 10000 + a.x;
    let b_score = Math.floor(b.y / 80) * 10000 + b.x;
    return a_score - b_score;
  });
  return vertexRenderInfos.map((v) => elements.find((e) => e.id === v.id)!);
}

export function getMaxIdFromState(state: State): number {
  let allElements = state.graph.elements.concat(
    ...state.timeline.graph[0].map((e) => e.elements),
    ...state.timeline.graph[1].map((e) => e.elements),
  );
  return Math.max(...allElements.map((e) => parseInt(e.id, 10)));
}

export function sortByDistance(
  state: State,
  ctx: GlobalContext,
  vertex: Vertex,
): Vertex[] {
  const vertexRenderInfo = ctx.graphRenderInfo.vertex(vertex.id);
  const allVertex = state.graph.elements.filter(isVertex);
  const vertexWithDistance = allVertex.map((v) => {
    const renderInfo = ctx.graphRenderInfo.vertex(v.id);
    const distance = Math.sqrt(
      Math.pow(vertexRenderInfo.x - renderInfo.x, 2) +
        Math.pow(vertexRenderInfo.y - renderInfo.y, 2),
    );
    return { vertex: v, distance };
  });
  return vertexWithDistance.sort((a, b) => a.distance - b.distance).map((v) => v.vertex);
}
