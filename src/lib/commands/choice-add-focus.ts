import type { CommandDefinition } from "../command";

export const def: CommandDefinition = {
  description: "add focus to choice list.",
  modifyGraphFocus: true,

  available(state) {
    if (!state.graphFocus) {
      return "No focus.";
    }
    return true;
  },

  func(state) {
    state.choice.push(state.graphFocus!);
  },
};