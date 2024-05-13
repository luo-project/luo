import type { CommandDefinition, CommandDefinitionWithId } from "./types";

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
