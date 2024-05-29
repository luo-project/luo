import type { CommandDefinition } from "../../command";

export const def: CommandDefinition = {
  available(state) {
    return true;
  },

  func(state) {
    state.choices = state.graph.elements.map((e) => e.id);
  },
};
