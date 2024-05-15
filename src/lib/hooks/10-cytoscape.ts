import { render } from "../cytoscape";
import type { HookDefinition } from "../hook";

export const def: HookDefinition = {
  async func(state, config) {
    return render(state, config);
  },
};
