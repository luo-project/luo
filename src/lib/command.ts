import type { CommandDefinition, CommandDefinitionWithId } from "./types";
import { logger } from "./log";
import { deepCopy } from "./utils";
import type { State, StateHook } from "./types";

export function initCommandLoop(initState: State, hooks: StateHook[]) {
  let state = deepCopy(initState);
  const l = logger("commandLoop");
  const buffer: CommandDefinitionWithId[] = [];
  const cb = async () => {
    const cmd = buffer.shift();
    if (cmd !== undefined) {
      l.time("total");
      state = deepCopy(state);
      l.debug("before", cmd.id, state);
      await cmd.func(state);
      l.debug("after", cmd.id, state);
      for (const hook of hooks) {
        state = deepCopy(state);
        l.debug("before", hook.id, state);
        await hook.func(state);
        l.debug("after", hook.id, state);
      }
      l.timeEnd("total");
    }
    setTimeout(cb, 0);
  };
  cb();
  return (cmd: CommandDefinitionWithId) => {
    buffer.push(cmd);
  };
}

export function loadCommands(): Record<string, CommandDefinitionWithId> {
  const commands: Record<string, CommandDefinitionWithId> = {};
  const modules = import.meta.glob("./commands/*.ts", { eager: true });
  for (const path in modules) {
    const id = pathToId(path);
    const cmd = modules[path] as CommandDefinition;
    if (typeof cmd.func !== "function") {
      throw new Error(`failed to load command ${id}: no func`);
    }
    commands[id] = { id, ...cmd };
  }
  return commands;
}

function pathToId(path: string): string {
  return path.split("/").pop()!.replace(".ts", "");
}
