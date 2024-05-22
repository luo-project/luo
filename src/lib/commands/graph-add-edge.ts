import type { CommandDefinition } from "../command";
import { Edge, GraphElement, isEdge, isVertex } from "../graph";

export const def: CommandDefinition = {
  description: "Add edge to graph.",
  available(state, config, ctx) {
    const focus = state.graphFocus!;
    const graph = state.graph as any;
    const focusElement = ctx.graphIndex(graph).any(focus);
    const choiceElement = ctx.graphIndex(graph).any(state.choice[0]);

    if (state.choice.length !== 1 && !isVertex(choiceElement)) {
      return "Choice is must be a vertex.";
    }

    if (!isVertex(focusElement)) {
      return "Focus is must be a vertex.";
    }
    return true;
  },
  func(state, config, ctx) {
    const focus = state.graphFocus!;
    // add edge
    const edge: Edge = {
      t: "e",
      id: ctx.nextId().toString(),
      source: state.choice[0],
      target: focus,
    };
    state.graph.elements.push(edge);
  },
};
