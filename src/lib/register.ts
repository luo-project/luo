import type { CommandDefinition } from "./command";
import type { State } from "./state";

export type Register<T> = Record<string, T>;

export function makeYankCommand(name: keyof State["registers"]): CommandDefinition {
  return {
    skipTimeline: true,
    async func(state, cfg, ctx) {
      const key = await ctx.userInput({
        message: `Register name for ${name}`,
        length: 1,
      });

      // @ts-ignore
      state.registers[name][key] = state[name];
    },
  };
}

export function makeUnyankCommand(name: keyof State["registers"]): CommandDefinition {
  return {
    skipTimeline: true,
    async func(state, cfg, ctx) {
      const key = await ctx.userInput({
        message: `Register name for ${name}`,
        length: 1,
      });

      // @ts-ignore
      state[name] = state.registers[name][key];
    },
  };
}
