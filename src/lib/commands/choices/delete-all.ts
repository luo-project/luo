import type { CommandDefinition } from "../../command";

export const def: CommandDefinition = {
  available(state) {
    if (state.choices.length === 0) {
      return "No element in the choice list";
    }
    return true;
  },

  func(state) {
    state.choices.length = 0;
  },
};
