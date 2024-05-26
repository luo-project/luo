import type { CommandDefinition } from "../../command";
import { yank } from "../../register";
import { userInput } from "../../user-input";

export const def: CommandDefinition = {
  skipTimeline: true,
  description: "Yank viewport",
  async func(state) {
    const key = await userInput({
      message: "Enter yank key",
      type: "string",
      length: 1,
    });
    yank(state.register.viewport, key, state.viewport);
  },
};
