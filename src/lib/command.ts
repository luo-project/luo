import type { DeepReadonly } from "ts-essentials";
import type { Config } from "./config";
import { type HookDefinitionWithId } from "./hook";
import { logger } from "./log";
import type { State, StateFunc, StateFuncContext } from "./state";
import { deepCopy, dev, loadEagerModules } from "./utils";
import { PROD } from "./constants";

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
  available?: (state: DeepReadonly<State>, config: Readonly<Config>) => true | string;

  func: StateFunc;
};

export type CommandDefinitionWithId = CommandDefinition & { id: string };

export function initCommandLoop(
  initState: State,
  config: Config,
  commands: CommandDefinitionWithId[],
  hooks: HookDefinitionWithId[],
) {
  const cfg = Object.freeze(config);
  let state = deepCopy(initState);
  const l = logger("commandLoop");
  const queue: CommandDefinitionWithId[] = [];
  const cb = async () => {
    const cmd = queue.shift();
    if (cmd === undefined) {
      setTimeout(cb, 0);
      return;
    }

    if (cmd.available) {
      const a = cmd.available(state, config);
      if (typeof a === "string") {
        l.warn(`unavailable '${cmd.id}': ${a}`);
        setTimeout(cb, 0);
        return;
      }
    }

    const ctx: DeepReadonly<StateFuncContext> = Object.freeze({
      commands: Object.freeze(commands),
      command: Object.freeze(cmd),
    });
    l.time("total");
    state = deepCopy(state);
    l.debug("before", cmd.id, state);
    await cmd.func(state, cfg, ctx);
    l.debug("after", cmd.id, state);
    for (const hook of hooks) {
      state = deepCopy(state);
      l.debug("before", hook.id, state);
      await hook.func(state, cfg, ctx);
      l.debug("after", hook.id, state);
    }
    l.timeEnd("total");
    dev(() => {
      (window as any).state = state;
    });
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
