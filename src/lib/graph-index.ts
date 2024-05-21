import type { Edge, GraphElement, Graph, Vertex } from "./graph";

export type GraphIndex = (graph: Graph) => {
  any: (id: string) => GraphElement;
  vertex: (id: string) => Vertex;
  edge: (id: string) => Edge;
};

export function makeGraphIndex(g: Graph): GraphIndex {
  const m = new Map<string, number>();
  for (let i = 0; i < g.elements.length; i += 1) {
    const e = g.elements[i];
    if (m.has(e.id)) {
      throw new Error(`GraphIndex conflcit: ${e.id}`);
    }
    m.set(e.id, i);
  }
  return (graph: Graph) => {
    const any = (id: string, typeAssert?: string) => {
      const i = m.get(id);
      if (i === undefined) {
        throw new Error(`GraphIndex not found: ${id}`);
      }
      const e = graph.elements[i];
      if (e === undefined) {
        throw new Error(`GraphIndex invalid: ${id}`);
      }
      if (typeAssert !== undefined && typeAssert !== e.t) {
        throw new Error(`GraphIndex type assertion failed: ${typeAssert}!=${e.t}`);
      }
      return e;
    };
    const vertex = (id: string) => any(id, "v") as Vertex;
    const edge = (id: string) => any(id, "e") as Edge;
    return { any, vertex, edge };
  };
}

export function isExistsId(graph: Graph, id: string): boolean {
  return graph.elements.some((e) => e.id === id);
}
