import type { CommandDefinition } from "../command";
import { nearestVertex } from "../focus";
import { isVertex, type Graph } from "../graph";
import { logger } from "../log";

export const def: CommandDefinition = {
  description: "moves focus to the nearest vertex above the current focus",

  available(state, cfg, ctx) {
    if (!state.focus) {
      return "No focus.";
    }
    const { any } = ctx.graphIndex(state.graph as Graph);
    if (!isVertex(any(state.focus))) {
      return "Focus is not a vertex.";
    }

    return true;
  },

  func(state, cfg, ctx) {
    // TODO: if there is no graphFocus, set focus to bottom-left vertex
    const focus = state.focus!;
    const { vertex } = ctx.graphIndex(state.graph);

    const here = vertex(focus);
    const gap = cfg.command["focus-move"].gap;
    const { x, y, width, height } = ctx.graphRenderInfo.vertex(focus);
    const xm1 = x + width / 2;
    const ym1 = y + height / 2;

    const ray: [number, number, number, number] = [
      xm1 - gap,
      Number.NEGATIVE_INFINITY,
      xm1 + gap,
      ym1,
    ];

    const nearest = nearestVertex(state.graph, ctx.graphRenderInfo, here, ray);

    if (nearest) {
      state.focus = nearest.id;
    }
  },
};
