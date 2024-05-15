import type { CommandDefinition } from "../command";

export const def: CommandDefinition = {
  description: "undo for graph modification command",
  async func(state) {
    if (state.graph.current > 0) {
      state.graph.current--;
    }
  },
};
