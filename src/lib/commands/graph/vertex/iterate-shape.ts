import type { CommandDefinition } from "../../../command";
import { VERTEX_SHAPES } from "../../../constants";
import { Edge, GraphElement, isEdge, isVertex } from "../../../graph";

export const def: CommandDefinition = {
  description: "Change focused vertex's shape.",
  available(state, config, ctx) {
    const focus = state.focus!;
    if (!focus) {
      return "No focus.";
    }
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
    const shapeIndex = VERTEX_SHAPES.indexOf(focusElement.shape);
    const nextShapeIndex = (shapeIndex + 1) % VERTEX_SHAPES.length;
    focusElement.shape = VERTEX_SHAPES[nextShapeIndex];
  },
};
