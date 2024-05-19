import type { HookDefinition } from "../hook";

export const def: HookDefinition = {
  async func(state, config, ctx) {
    const result: Record<string, string | true> = {};
    ctx.commands.forEach((cmd) => {
      if (!cmd.available) {
        return;
      }
      result[cmd.id] = cmd.available(state, config, ctx);
    });
    ctx.availableCommands = result;
  },
};
