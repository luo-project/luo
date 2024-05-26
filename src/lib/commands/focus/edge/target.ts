import type { CommandDefinition } from "../../../command";
import { isVertex, type Graph } from "../../../graph";

export const def: CommandDefinition = {
  description: "moves focus to the target vertex of current edge",

  available(state, cfg, ctx) {
    if (!state.focus) {
      return "No focus.";
    }
    const { any } = ctx.graphIndex(state.graph as Graph);
    if (isVertex(any(state.focus))) {
      return "Focus is not a edge.";
    }

    return true;
  },

  func(state, cfg, ctx) {
    const focus = state.focus!;
    const { edge } = ctx.graphIndex(state.graph);

    const here = edge(focus);
    state.focus = here.target;
  },
};
