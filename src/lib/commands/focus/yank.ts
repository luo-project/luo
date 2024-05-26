import type { CommandDefinition } from "../../command";
import { yank } from "../../register";
import { userInput } from "../../user-input";

export const def: CommandDefinition = {
  skipTimeline: true,
  available(state) {
    if (!state.focus) {
      return "No focus.";
    }
    return true;
  },
  description: "Yank focus",
  async func(state) {
    const key = await userInput({
      message: "Enter yank key",
      type: "string",
      length: 1,
    });
    yank(state.register.focus, key, state.focus);
  },
};
