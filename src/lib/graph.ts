/**
 * Graph stores recent changes as snapshots.
 */
export type Graph = {
  /**
   * Index of current version.
   */
  current: number;

  snapshots: GraphSnapshot[];
};

export type GraphSnapshot = {
  vertices: Vertex[];
  edges: Edge[];
};

/**
 * All GraphElements have an unique id regardless of type(Vertex or Edge).
 */
export type GraphElementId = number;

export interface GraphElement {
  id: GraphElementId;
  text?: string;
}

export interface Vertex extends GraphElement {
  parent?: GraphElementId;

  /**
   * Vertex always has well-defined body after being rendered.
   */
  body?: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  shape: VertexShape;
}

export type VertexShape =
  | "ellipse"
  | "triangle"
  | "round-triangle"
  | "round-rectangle"
  | "rectangle"
  | "diamond";

export interface Edge extends GraphElement {
  from: GraphElementId;
  to: GraphElementId;
}

/**
 * GraphPallete stores information of GraphElement will be created next time.
 */
export type GraphPallete = {
  nextId: GraphElementId;
  vertexShape: VertexShape;
};

export type GraphCursor = GraphElementId;

export function getCurrentSnapshop(g: Graph): GraphSnapshot {
  return g.snapshots[g.current];
}
