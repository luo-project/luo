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

export type GraphCursor = GraphElementId;

export function getCurrentSnapshop(g: Graph): GraphSnapshot {
  const s = g.snapshots[g.current];
  if (s === undefined) {
    throw new Error(
      `GraphSnapshot undefined: current=${g.current} snapshopts.length=${g.snapshots.length}`,
    );
  }
  return s;
}

export function isVertex(e: GraphElement): e is Vertex {
  return e.t === "v";
}
