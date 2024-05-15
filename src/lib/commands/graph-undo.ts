import type { CommandDefinition } from "../command";

export const def: CommandDefinition = {
  description: "undo for graph modification command",
  available: (state) => {
    if (state.graph.current > 0) {
      return { result: true };
    }
    return { reason: "There are no history for undo", result: false };
  },
  async func(state) {
    if (state.graph.current > 0) {
      state.graph.current--;
    }
  },
};
