import type { CommandDefinition } from "../../../command";
import { nearestVertex } from "../../../focus";
import { isVertex, type Graph } from "../../../graph";

export const def: CommandDefinition = {
  description: "focus to the nearest vertex right the current focus",

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
    // TODO: if there is no graphFocus, set focus to top-right vertex
    const focus = state.focus!;
    const { vertex } = ctx.graphIndex(state.graph);

    const here = vertex(focus);
    const gap = cfg.graph.collisionSize;
    const { x, y, width, height } = ctx.graphRenderInfo.vertex(focus);
    const xm1 = x + width / 2;
    const ym1 = y + height / 2;

    const ray: [number, number, number, number] = [
      xm1,
      ym1 - gap,
      Number.POSITIVE_INFINITY,
      ym1 + gap,
    ];

    const nearest = nearestVertex(state.graph, ctx.graphRenderInfo, here, ray);

    if (nearest) {
      state.focus = nearest.id;
    }
  },
};
