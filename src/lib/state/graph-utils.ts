import type { Graph, GraphElement, Vertex } from "./types";

export function sampleGraphUtilityFunction(g: Graph): Vertex {
  return { id: Date.now() };
}
