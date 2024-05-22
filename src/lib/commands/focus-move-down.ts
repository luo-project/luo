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
    const gap = cfg.command["focus-move"].gap;
    const { x: xm1, y: ym1 } = ctx.graphRenderInfo.vertex(focus);

    const ray: [number, number, number, number] = [
      xm1 - gap,
      ym1,
      xm1 + gap,
      Number.POSITIVE_INFINITY,
    ];

    const nearest = nearestVertex(state.graph, ctx.graphRenderInfo, here, ray);

    if (nearest) {
      state.graphFocus = nearest.id;
    }
  },
};
