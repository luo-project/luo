import type { CommandDefinition } from "../../command";
import { VERTEX_SHAPES } from "../../constants";
import { Edge, GraphElement, isEdge, isVertex } from "../../graph";

export const def: CommandDefinition = {
  available(state, config, ctx) {
    if (!state.focus) {
      return "No focus.";
    }
    const graph = state.graph as any;
    try {
      const focusElement = ctx.graphIndex(graph).any(state.focus);
    } catch (e) {
      return "No focus.";
    }
    return true;
  },
  func(state, config, ctx) {
    const focus = state.focus!;
    const graph = state.graph as any;
    const focusElement: GraphElement = ctx.graphIndex(graph).any(focus);

    if (isVertex(focusElement)) {
      focusElement.label = state.palette.label;
    } else if (isEdge(focusElement)) {
      focusElement.label = state.palette.label;
    }
  },
};
