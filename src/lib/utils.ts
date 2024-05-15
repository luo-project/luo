export function deepCopy<T>(v: T): T {
  return structuredClone(v);
}

export function loadEagerModules<T>(
  modules: Record<string, unknown>,
  validate: (v: T) => boolean,
): Record<string, T & { id: string }> {
  const result: Record<string, T & { id: string }> = {};
  for (const path in modules) {
    const id = pathToId(path);
    const module = modules[path] as T;
    if (!validate(module)) {
      throw new Error(`module validation failed: ${path}`);
    }
    result[id] = { id, ...module };
  }
  return result;
}

function pathToId(path: string): string {
  return path.split("/").pop()!.replace(".ts", "");
}
