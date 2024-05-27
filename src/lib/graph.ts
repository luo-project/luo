import type { GlobalContext, State, VertexRenderInfo } from "./state";

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
    ...state.timelines.graph[0].map((e) => e.elements),
    ...state.timelines.graph[1].map((e) => e.elements),
  );
  return Math.max(...allElements.map((e) => parseInt(e.id, 10)));
}

export function sortByDistance(
  graph: Graph,
  ctx: GlobalContext,
  vertexRenderInfo: VertexRenderInfo,
): Vertex[] {
  const allVertex = graph.elements.filter(isVertex);
  const vertexWithDistance = allVertex.map((v) => {
    const renderInfo = ctx.graphRenderInfo.vertex(v.id);
    const distance =
      Math.pow(vertexRenderInfo.x - renderInfo.x, 2) +
      Math.pow(vertexRenderInfo.y - renderInfo.y, 2);

    return { vertex: v, distance };
  });
  return vertexWithDistance.sort((a, b) => a.distance - b.distance).map((v) => v.vertex);
}

export function findElementById(
  graph: Graph,
  id: GraphElementId,
): GraphElement | undefined {
  return graph.elements.find((e) => e.id === id);
}

export function deleteElement(graph: Graph, element: GraphElement) {
  const targetId = element.id;
  const targetElement = element;
  if (isVertex(targetElement)) {
    const inboundEdges = graph.elements.filter((e) => isEdge(e) && e.target === targetId);
    const outboundEdges = graph.elements.filter(
      (e) => isEdge(e) && e.source === targetId,
    );
    if (inboundEdges.length == 1 && outboundEdges.length == 1) {
      // Current Focus is Single Bridge Vertex.
      // So Connect existing edges for convenience.
      const inboundEdge = inboundEdges[0];
      const outboundEdge = outboundEdges[0];
      if (isEdge(inboundEdge) && isEdge(outboundEdge)) {
        inboundEdge.target = outboundEdge.target;
        graph.elements = graph.elements.filter((e) => e.id !== outboundEdge.id);
      }
    } else {
      // delete all edges connected to focus vertex.
      graph.elements = graph.elements.filter(
        (e) => !(isEdge(e) && (e.source === targetId || e.target === targetId)),
      );
    }

    // delete focus vertex.
    graph.elements = graph.elements.filter((e) => e.id !== targetId);
  } else if (isEdge(targetElement)) {
    // delete focus edge.
    graph.elements = graph.elements.filter((e) => e.id !== targetId);
  }
}
