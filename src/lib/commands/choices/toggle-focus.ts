import type { CommandDefinition } from "../../command";

export const def: CommandDefinition = {
  available(state) {
    if (!state.focus) {
      return "No focus.";
    }
    return true;
  },

  func(state) {
    const focus = state.focus!;
    const focusIndex = state.choices.indexOf(focus);
    if (focusIndex === -1) {
      state.choices.push(focus);
    } else {
      state.choices.splice(focusIndex, 1);
    }
  },
};
