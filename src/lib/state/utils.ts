import type { CommandDefinitionWithId } from "../command/types";
import { log } from "../log";
import { deepCopy } from "../utils";
import type { State, StateHook } from "./types";

export function makeRunCommand(initState: State, hooks: StateHook[]) {
  log("trace", "makeRunCommand");
  let state = deepCopy(initState);
  return async (cmd: CommandDefinitionWithId) => {
    state = deepCopy(state);
    log("trace", "runCommand", "before", cmd.id, state);
    await cmd.func(state);
    log("trace", "runCommand", "after", cmd.id, state);
    for (const hook of hooks) {
      state = deepCopy(state);
      log("trace", "runCommand-hook", "before", hook.id, state);
      await hook.func(state);
      log("trace", "runCommand-hook", "after", hook.id, state);
    }
  };
}
