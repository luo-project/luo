import type { CommandDefinitionWithId } from "../command/types";
import { logger } from "../log";
import { deepCopy } from "../utils";
import type { State, StateHook } from "./types";

export function makeRunCommand(initState: State, hooks: StateHook[]) {
  let state = deepCopy(initState);
  const l = logger("runCommand");
  return async (cmd: CommandDefinitionWithId) => {
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
  };
}
