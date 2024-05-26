import type { CommandDefinition } from "../../command";

export const def: CommandDefinition = {
  description: "add focus to choice list.",

  available(state) {
    if (!state.focus) {
      return "No focus.";
    }
    if (state.choices.indexOf(state.focus!) === -1) {
      return "There's no element to delete in the choice list.";
    }
    return true;
  },

  func(state) {
    state.choices = state.choices.filter((id) => id !== state.focus);
  },
};
