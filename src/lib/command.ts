import type { DeepReadonly } from "ts-essentials";
import type { Config } from "./config";
import { PROD } from "./constants";
import { makeRecord } from "./debug";
import { type HookDefinitionWithId } from "./hook";
import { logger } from "./log";
import type { GlobalContext, State, StateFunc } from "./state";
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
  skipTimeline?: boolean;
  /**
   * Available indicates whether the command can be executed in given state.
   */
  available?: (
    state: DeepReadonly<State>,
    config: Readonly<Config>,
    ctx: GlobalContext,
  ) => true | string;

  func: StateFunc;
};

export type CommandDefinitionWithId = CommandDefinition & { id: string };

export function initCommandLoop({
  commands,
  initState,
  config,
  hooks,
  onRun,
  globalContext,
}: {
  commands: Record<string, CommandDefinitionWithId>;
  initState: State;
  config: Config;
  hooks: HookDefinitionWithId[];
  onRun: (command: CommandDefinitionWithId) => void;
  globalContext: GlobalContext;
}) {
  const record = makeRecord("commandLoop", !PROD);
  const cfg = Object.freeze(config);
  let state = deepCopy(initState);
  let previousState = deepCopy(state);
  const l = logger("commandLoop");
  const queue: CommandDefinitionWithId[] = [];

  const cb = async () => {
    try {
      const cmd = queue.shift();
      if (cmd === undefined) {
        return;
      }
      globalContext.command = cmd;
      globalContext.previousState = previousState;
      const available = globalContext.availableCommands[cmd.id];
      if (typeof available === "string") {
        l.warn(`'${cmd.id}' is unavailable: ${available}`);
        setTimeout(cb, 0);
        return;
      }

      onRun(cmd);
      l.time("total");
      state = deepCopy(state);
      record(`before command '${cmd.id}'`, state);
      await cmd.func(state, cfg, globalContext);
      for (const hook of hooks) {
        state = deepCopy(state);
        record(`before hook '${hook.id}'`, state);
        await hook.func(state, cfg, globalContext);
      }
      previousState = deepCopy(state);
      record("after all", state);
      l.timeEnd("total");
    } catch (e) {
      l.error(e);
    } finally {
      setTimeout(cb, 0);
    }
  };
  cb();
  return (id: string) => {
    const cmd = commands[id];
    if (!cmd) {
      throw new Error(`command '${id}' not found`);
    }
    queue.push(cmd);
  };
}

export function loadCommands() {
  return loadEagerModules(
    "./commands/",
    import.meta.glob("./commands/**/*.ts", { eager: true }),
    (m, p) => {
      const def = m.def as CommandDefinition;
      if (typeof def !== "object" || typeof def.func !== "function") {
        throw new Error(`invalid command module: ${p}`);
      }
      return def;
    },
  );
}
