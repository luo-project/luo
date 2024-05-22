import { render } from "../elk";
import type { HookDefinition } from "../hook";
import { setSvgAnimation, setSvgViewport } from "../svg";

export const def: HookDefinition = {
  async func(state, cfg, ctx) {
    setSvgAnimation(cfg);
    ctx.graphRenderInfo = await render(
      state.graph,
      state.graphFocus,
      new Set(state.choice),
    );
    setSvgViewport(state.viewport);
  },
};
