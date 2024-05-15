import type { CommandDefinitionWithId, HookDefinitionWithId } from "./types";
import { logger } from "./log";
import { deepCopy, loadEagerModules } from "./utils";
import type { State } from "./types";

export function initCommandLoop(
  initState: State,
  hooks: HookDefinitionWithId[],
) {
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
  return loadEagerModules(
    import.meta.glob("./commands/*.ts", { eager: true }),
    (v) => {
      return typeof v.func === "function";
    },
  );
}
