import type { CommandDefinition } from "../command";

export const def: CommandDefinition = {
  description: "redo for graph modification command",
  available: (state) => {
    if (state.graph.current < state.graph.snapshots.length - 1) {
      return true;
    }
    return "There are no history for redo";
  },
  async func(state) {
    if (state.graph.current < state.graph.snapshots.length - 1) {
      state.graph.current++;
    }
  },
};
