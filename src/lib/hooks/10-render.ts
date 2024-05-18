import { renderD3, renderViewport, setAnimation } from "../dagred3";
import { getCurrentSnapshop } from "../graph";
import type { HookDefinition } from "../hook";

export const def: HookDefinition = {
  async func(state, cfg, ctx) {
    setAnimation(cfg);
    ctx.graphRenderInfo = renderD3({
      gs: getCurrentSnapshop(state.graph),
      cursor: state.graphCursor,
    });
    renderViewport(state.viewport);
  },
};
