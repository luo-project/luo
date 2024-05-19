import type { CommandDefinition } from "../command";

export const def: CommandDefinition = {
  description: "clear choice list.",

  available(state) {
    if (state.choice.length === 0) {
      return "No element in the choice list";
    }
    return true;
  },

  func(state) {
    state.choice.length = 0;
  },
};
