import type { CommandDefinition } from "../../command";

export const def: CommandDefinition = {
  description: "choice all.",

  available(state) {
    return true;
  },

  func(state) {
    state.choices = state.graph.elements.map((e) => e.id);
  },
};
