import type { CommandDefinition } from "../../command";

export const def: CommandDefinition = {
  async func(state, config) {
    state.viewport.y -= config.viewport.pan.amount.y;
  },
};
