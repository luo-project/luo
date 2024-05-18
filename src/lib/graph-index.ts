import type { Edge, GraphElement, GraphSnapshot, Vertex } from "./graph";

export type GraphIndex = (s: GraphSnapshot) => {
  any: (id: string) => GraphElement;
  vertex: (id: string) => Vertex;
  edge: (id: string) => Edge;
};

export function makeGraphIndex(gs: GraphSnapshot): GraphIndex {
  const m = new Map<string, number>();
  for (let i = 0; i < gs.elements.length; i += 1) {
    const e = gs.elements[i];
    if (m.has(e.id)) {
      throw new Error(`GraphIndex conflcit: ${e.id}`);
    }
    m.set(e.id, i);
  }
  return (snapshot: GraphSnapshot) => {
    const any = (id: string, typeAssert?: string) => {
      const i = m.get(id);
      if (i === undefined) {
        throw new Error(`GraphIndex not found: ${id}`);
      }
      const e = snapshot.elements[i];
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
