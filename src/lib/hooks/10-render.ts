import { initCytoscapeCore, render } from "../cytoscape";
import type { HookDefinition } from "../hook";
import { useRef } from "../state";

export const def: HookDefinition = {
  async func(state, config, ref) {
    const cy = await useRef(ref, "cytoscapecore", initCytoscapeCore);
    return render(cy, state, config);
  },
};
