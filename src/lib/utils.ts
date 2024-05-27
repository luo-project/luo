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
  prefix: string,
  modules: Record<string, unknown>,
  selector: (v: any, path: string) => T,
): Record<string, T & { id: string }> {
  const result: Record<string, T & { id: string }> = {};
  for (const path in modules) {
    if (!path.startsWith(prefix)) {
      throw new Error(`invalid module path: ${path}`);
    }
    const id = path.substring(prefix.length).replace(".ts", "");
    const module = modules[path] as T;
    const d = selector(module, path);
    result[id] = { id, ...d };
  }
  return result;
}

export function dev(cb: () => unknown) {
  if (!PROD) {
    cb();
  }
}

export function newCounter(number: number): () => number {
  return () => ++number;
}

export function useEventListeners(element: Element) {
  const listeners = [] as [string, any][];
  const add = (event: string, listener: any) => {
    element.addEventListener(event, listener);
    listeners.push([event, listener]);
  };
  const done = () => {
    listeners.forEach(([e, l]) => {
      element.removeEventListener(e, l);
    });
  };
  return { add, done };
}
