import { cyRender } from "../cytoscape/render";
import type { HookDefinition } from "../hook";

export const def: HookDefinition = {
  async func(state, config) {
    return cyRender(state, config);
  },
};
