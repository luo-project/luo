import { renderD3, renderViewport, setAnimation } from "../dagred3";
import type { HookDefinition } from "../hook";

export const def: HookDefinition = {
  async func(state, cfg, ctx) {
    setAnimation(cfg);
    ctx.graphRenderInfo = renderD3({
      graph: state.graph,
      focus: state.graphFocus,
      choices: state.choice,
    });
    renderViewport(state.viewport);
  },
};
