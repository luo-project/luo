import type { CommandDefinition } from "../command";

export const def: CommandDefinition = {
  description: "undo for graph modification command",
  available: (state) => {
    if (state.graph.current > 0) {
      return true;
    }
    return "There are no history for undo";
  },
  async func(state) {
    state.graph.current--;
  },
};
