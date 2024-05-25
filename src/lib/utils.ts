import { PROD } from "./constants";

export function deepCopy<T>(v: T): T {
  return structuredClone(v);
}

export function deepEquals<T>(a: T, b: T): boolean {
  if (a === b) return true;

  if (a && b && typeof a == "object" && typeof b == "object") {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      // @ts-ignore
      if (length != b.length) return false;
      // @ts-ignore
      for (i = length; i-- !== 0; ) if (!deepEquals(a[i], b[i])) return false;
      return true;
    }

    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0; ) {
      var key = keys[i];

      // @ts-ignore
      if (!deepEquals(a[key], b[key])) return false;
    }

    return true;
  }

  return a !== a && b !== b;
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

export function newCounter(number: number): () => number {
  return () => ++number;
}
