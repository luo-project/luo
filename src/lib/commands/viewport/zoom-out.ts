import type { CommandDefinition } from "../../command";

export const def: CommandDefinition = {
  async func(state, config) {
    state.viewport.zoom *= 1 + config.viewport.zoom.amount;
  },
};
