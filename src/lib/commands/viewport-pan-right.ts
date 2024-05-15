import type { CommandDefinition } from "../command";

export const def: CommandDefinition = {
  description: "changes viewport.",
  async func(state, config) {
    state.viewport.x -= config.viewport.pan.amount.x;
  },
};
