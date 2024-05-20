import { PROD } from "./constants";
import { State } from "./state";

export function deepCopy<T>(v: T): T {
  return structuredClone(v);
}

export function loadEagerModules<T>(
  modules: Record<string, unknown>,
  selector: (v: any, path: string) => T,
): Record<string, T & { id: string }> {
  const result: Record<string, T & { id: string }> = {};
  for (const path in modules) {
    const id = pathToId(path);
    const module = modules[path] as T;
    const d = selector(module, path);
    result[id] = { id, ...d };
  }
  return result;
}

function pathToId(path: string): string {
  return path.split("/").pop()!.replace(".ts", "").replace(".js", "");
}

export function dev(cb: () => unknown) {
  if (!PROD) {
    cb();
  }
}
export function getMaxIdFromState(state: State): number {
  let allElements = state.graph.elements.concat(
    ...state.timeline.graph[0].map((e) => e.elements),
    ...state.timeline.graph[1].map((e) => e.elements),
  );
  return Math.max(...allElements.map((e) => parseInt(e.id, 10)));
}
export function newCounter(number: number): () => number {
  return () => ++number;
}
