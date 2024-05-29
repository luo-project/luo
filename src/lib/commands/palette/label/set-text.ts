import type { CommandDefinition } from "../../../command";

export const def: CommandDefinition = {
  async func(state, cfg, ctx) {
    state.palette.label.text = await ctx.userInput({
      message: "palette.label.text",
    });
  },
};
