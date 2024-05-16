import { getCurrentSnapshop } from "../graph";
import { updateGraphIndex } from "../graph-index";
import type { HookDefinition } from "../hook";

export const def: HookDefinition = {
  func(state) {
    updateGraphIndex(getCurrentSnapshop(state.graph));
  },
};
