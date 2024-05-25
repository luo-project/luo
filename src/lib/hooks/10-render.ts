import { render } from "../elk";
import type { HookDefinition } from "../hook";
import { setSvgAnimation, setSvgViewport } from "../svg";

export const def: HookDefinition = {
  async func(state, cfg, ctx) {
    setSvgAnimation(cfg);
    ctx.graphRenderInfo = await render(state.graph, state.focus, new Set(state.choices));
    setSvgViewport(state.viewport);
  },
};
