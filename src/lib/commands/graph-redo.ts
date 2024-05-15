import type { CommandDefinition } from "../command";

export const def: CommandDefinition = {
  description: "redo for graph modification command",
  async func(state) {
    if (state.graph.current < state.graph.snapshots.length - 1) {
      state.graph.current++;
    }
  },
};
