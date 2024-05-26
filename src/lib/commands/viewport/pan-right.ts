import type { CommandDefinition } from "../../command";

export const def: CommandDefinition = {
  async func(state, config) {
    state.viewport.x -= config.viewport.pan.amount.x;
  },
};
