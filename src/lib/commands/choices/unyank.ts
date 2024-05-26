import type { CommandDefinition } from "../../command";
import { unyank } from "../../register";
import { userInput } from "../../user-input";

export const def: CommandDefinition = {
  skipTimeline: true,
  description: "Unyank choices",
  async func(state) {
    const key = await userInput({
      message: "Enter unyank key",
      type: "string",
      length: 1,
    });
    state.choices = unyank(state.register.choices, key);
  },
};
