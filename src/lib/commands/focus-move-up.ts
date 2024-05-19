import type { CommandDefinition } from "../command";
import { nearestVertex } from "../focus";

export const def: CommandDefinition = {
  description: "moves focus to the nearest vertex above the current focus",

  available(state) {
    if (!state.graphFocus) {
      return "No focus.";
    }
    return true;
  },

  func(state, cfg, ctx) {
    // TODO: if there is no graphFocus, set focus to bottom-left vertex
    const focus = state.graphFocus!;
    const { vertex } = ctx.graphIndex(state.graph);

    const here = vertex(focus);
    const nearest = nearestVertex(
      state.graph,
      ctx.graphRenderInfo,
      here,
      (x1, y1, x2, y2) => y2 < x2 - x1 + y1 && y2 <= -(x2 - x1) + y1,
    );

    if (nearest) {
      state.graphFocus = nearest.id;
    }
  },
};
