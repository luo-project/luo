import { HookDefinition, type HookDefinitionWithId } from "./types";
import { loadEagerModules } from "./utils";

export function loadHooks(): HookDefinitionWithId[] {
  const hooks = Object.values(
    loadEagerModules<HookDefinition>(
      import.meta.glob("./hooks/*.ts", { eager: true }),
      (h) => {
        return typeof h.func === "function";
      },
    ),
  );
  return hooks.sort((a, b) => a.id.localeCompare(b.id));
}
