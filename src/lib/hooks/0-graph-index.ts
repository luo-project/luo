import { getCurrentSnapshop } from "../graph";
import { makeGraphIndex } from "../graph-index";
import type { HookDefinition } from "../hook";

export const def: HookDefinition = {
  func(state, cfg, ctx) {
    ctx.graphIndex = makeGraphIndex(getCurrentSnapshop(state.graph));
  },
};
