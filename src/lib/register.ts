import type { CommandDefinition } from "./command";
import type { State } from "./state";
import { deepCopy } from "./utils";

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
      state.registers[name][key] = deepCopy(state[name]);
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
      const register = state.registers[name][key];
      if (register === undefined) {
        throw new Error(`register not found: '${name}.${key}'`);
      }
      state[name] = deepCopy(register) as any;
    },
  };
}
