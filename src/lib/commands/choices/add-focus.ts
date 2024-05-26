import type { CommandDefinition } from "../../command";

export const def: CommandDefinition = {
  description: "add focus to choice list.",

  available(state) {
    if (!state.focus) {
      return "No focus.";
    }
    if (state.choices.indexOf(state.focus!) !== -1) {
      return "Already added to the choice list.";
    }
    return true;
  },

  func(state) {
    state.choices.push(state.focus!);
  },
};
