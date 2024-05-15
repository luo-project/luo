import { logger } from "./log";
import { deepCopy } from "./utils";

type KeyMap = {
  key: string;
  ctrl: boolean;
  shift: boolean;
};

export type KeyBinding = Record<string, KeyMap>;

export function initKeybinding(d: KeyBinding) {
  const data = deepCopy(d);
  const l = logger("keybinding");
  const cache = new Map<string, string>();
  for (const id in data) {
    const e = encode(data[id]);
    cache.set(e, id);
  }
  l.debug(cache);

  const set = (id: string, k?: KeyMap) => {
    if (k === undefined) {
      const encoded = encode(data[id]);
      cache.delete(encoded);
      delete data[id];
    } else {
      const encoded = encode(k);
      const existing = cache.get(encoded);
      if (existing !== undefined && existing !== id) {
        throw new Error(
          `keybinding conflict: ${id}<->${existing}: ${JSON.stringify(k)}`,
        );
      }
      data[id] = k;
      cache.set(encoded, id);
    }
    return deepCopy(data);
  };

  const find = (k: KeyMap) => {
    return cache.get(encode(k));
  };

  const get = (id: string) => {
    const k = data[id];
    if (k === undefined) {
      return null;
    }
    return k;
  };

  return { set, get, find };
}

function encode(k: KeyMap) {
  return `${k.ctrl ? "c-" : ""}${k.shift ? "s-" : ""}${k.key}`;
}
