import { makeGraphIndex } from "../graph-index";
import type { HookDefinition } from "../hook";

export const def: HookDefinition = {
  func(state, cfg, ctx) {
    ctx.graphIndex = makeGraphIndex(state.graph);
    state.graphPallete.nextId =
      Math.max(...state.graph.elements.map((e) => parseInt(e.id, 10))) + 1;
  },
};
