import type { CommandDefinition } from "../../../command";
import { nearestVertex } from "../../../focus";
import { isVertex, type Graph } from "../../../graph";

export const def: CommandDefinition = {
  description: "moves focus to the nearest vertex left the current focus",

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
    const gap = cfg.graph.collisionSize;
    const { x, y, width, height } = ctx.graphRenderInfo.vertex(focus);
    const xm1 = x + width / 2;
    const ym1 = y + height / 2;

    const ray: [number, number, number, number] = [
      Number.NEGATIVE_INFINITY,
      ym1 - gap,
      xm1,
      ym1 + gap,
    ];

    const nearest = nearestVertex(state.graph, ctx.graphRenderInfo, here, ray);

    if (nearest) {
      state.focus = nearest.id;
    }
  },
};
