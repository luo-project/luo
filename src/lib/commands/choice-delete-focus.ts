import type { CommandDefinition } from "../command";

export const def: CommandDefinition = {
  description: "add focus to choice list.",

  available(state) {
    if (!state.graphFocus) {
      return "No focus.";
    }
    if (state.choice.indexOf(state.graphFocus!) === -1) {
      return "There's no element to delete in the choice list.";
    }
    return true;
  },

  func(state) {
    state.choice = state.choice.filter((id) => id !== state.graphFocus);
  },
};
