import type { HookDefinition } from "../hook";

export const def: HookDefinition = {
  func(state, config) {
    if (state.viewport.zoom > config.viewport.zoom.max) {
      state.viewport.zoom = config.viewport.zoom.max;
    } else if (state.viewport.zoom < config.viewport.zoom.min) {
      state.viewport.zoom = config.viewport.zoom.min;
    }
  },
};
