import type { CommandDefinition } from "../command";

export const def: CommandDefinition = {
  description: "add focus to choice list.",

  available(state) {
    if (!state.graphFocus) {
      return "No focus.";
    }
    if (state.choice.indexOf(state.graphFocus!) !== -1) {
      return "Already added to the choice list.";
    }
    return true;
  },

  func(state) {
    state.choice.push(state.graphFocus!);
  },
};
