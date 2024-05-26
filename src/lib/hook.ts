import type { StateFunc } from "./state";
import { loadEagerModules } from "./utils";

export type HookDefinition = {
  func: StateFunc;
  dev?: boolean;
};

export type HookDefinitionWithId = HookDefinition & { id: string };

export function loadHooks() {
  const hooks = Object.values(
    loadEagerModules<HookDefinition>(
      "./hooks/",
      import.meta.glob("./hooks/*.ts", { eager: true }),
      (h, p) => {
        const def = h.def as HookDefinition;
        if (typeof def !== "object" || typeof def.func !== "function") {
          throw new Error(`invalid hook: ${p}`);
        }
        return def;
      },
    ),
  );
  return hooks.sort((a, b) => a.id.localeCompare(b.id));
}
