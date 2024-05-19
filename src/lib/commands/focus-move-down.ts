import type { CommandDefinition } from "../command";
import { nearestVertex } from "../focus";
import { isVertex, type Graph } from "../graph";

export const def: CommandDefinition = {
  description: "moves focus to the nearest vertex below the current focus",

  available(state, cfg, ctx) {
    if (!state.graphFocus) {
      return "No focus.";
    }
    const { any } = ctx.graphIndex(state.graph as Graph);
    if (!isVertex(any(state.graphFocus))) {
      return "Focus is not a vertex.";
    }

    return true;
  },

  func(state, cfg, ctx) {
    // TODO: if there is no graphFocus, set focus to top-left vertex
    const focus = state.graphFocus!;
    const { vertex } = ctx.graphIndex(state.graph);

    const here = vertex(focus);
    const nearest = nearestVertex(
      state.graph,
      ctx.graphRenderInfo,
      here,
      (x1, y1, x2, y2) => y2 > x2 - x1 + y1 && y2 >= -(x2 - x1) + y1,
    );

    if (nearest) {
      state.graphFocus = nearest.id;
    }
  },
};
