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
  const cache = new Map<string, string>();
  const l = logger("keybinding");
  const updateCache = () => {
    cache.clear();
    for (const id in data) {
      const e = encode(data[id]);
      cache.set(e, id);
    }
    l.debug("cache", cache);
  };
  updateCache();

  const set = (id: string, k?: KeyMap) => {
    if (k === undefined) {
      delete data[id];
    } else {
      data[id] = k;
    }
    updateCache();
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
