import type { DeepReadonly } from "ts-essentials";
import type { Config } from "./config";
import type { HookDefinitionWithId } from "./hook";
import { logger } from "./log";
import type { State, StateFunc, StateReference } from "./state";
import { deepCopy, loadEagerModules } from "./utils";

/**
 * Command is a javascript modules located in `src/lib/commands/`.
 * Command has a unique identifier generated from the filename. (e.g. no-op.ts -> 'no-op')
 * Command module must have named export variable `def` with type `CommandDefinition`.
 */
export type CommandDefinition = {
  /**
   * Description starts with lowercase thrid-person singular verb.
   */
  description?: string;

  dumpGraphSnapshot?: boolean;

  /**
   * Available indicates whether the command can be executed in given state.
   */
  available?: (
    state: DeepReadonly<State>,
    config: Readonly<Config>,
  ) => {
    reason?: string;
    result: boolean;
  };

  func: StateFunc;
};

export type CommandDefinitionWithId = CommandDefinition & { id: string };

export const currentCommandRef = Symbol("currentCommand");

export function initCommandLoop(
  initState: State,
  config: Config,
  hooks: HookDefinitionWithId[],
) {
  const cfg = Object.freeze(config);
  let state = deepCopy(initState);
  const l = logger("commandLoop");
  const queue: CommandDefinitionWithId[] = [];
  const cb = async () => {
    const cmd = queue.shift();
    if (cmd !== undefined) {
      stateReference[currentCommandRef] = cmd;
      l.time("total");
      state = deepCopy(state);
      l.debug("before", cmd.id, state);
      await cmd.func(state, cfg, stateReference);
      l.debug("after", cmd.id, state);
      for (const hook of hooks) {
        state = deepCopy(state);
        l.debug("before", hook.id, state);
        await hook.func(state, cfg, stateReference);
        l.debug("after", hook.id, state);
      }
      l.timeEnd("total");
    }
    setTimeout(cb, 0);
  };
  cb();
  return (cmd: CommandDefinitionWithId) => {
    queue.push(cmd);
  };
}

export function loadCommands() {
  return loadEagerModules(
    import.meta.glob("./commands/*.ts", { eager: true }),
    (m, p) => {
      const def = m.def as CommandDefinition;
      if (typeof def !== "object" || typeof def.func !== "function") {
        throw new Error(`invalid command module: ${p}`);
      }
      return def;
    },
  );
}

const refLogger = logger("ref");
const stateReference = new Proxy(
  {},
  {
    set(target: any, p, v, r) {
      target[p] = v;
      refLogger.debug(`new '${String(p)}'`, target);
      return true;
    },
  },
);

export function getCurrentCommand(ref: StateReference) {
  return ref[currentCommandRef] as CommandDefinition;
}
