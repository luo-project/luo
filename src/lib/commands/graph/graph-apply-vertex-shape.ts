import type { CommandDefinition } from "../../command";
import { VERTEX_SHAPES } from "../../constants";
import { Edge, GraphElement, isEdge, isVertex } from "../../graph";

export const def: CommandDefinition = {
  description: "Apply vertex shape from Default Vertex.",
  available(state, config, ctx) {
    const focus = state.focus!;
    const graph = state.graph as any;
    const focusElement = ctx.graphIndex(graph).any(focus);

    if (!isVertex(focusElement)) {
      return "Focus is must be a vertex.";
    }
    return true;
  },
  func(state, config, ctx) {
    const focus = state.focus!;
    const graph = state.graph as any;
    const focusElement = ctx.graphIndex(graph).any(focus) as GraphElement;

    if (!isVertex(focusElement)) {
      return;
    }
    focusElement.shape = state.defaultVertex.shape;
  },
};
