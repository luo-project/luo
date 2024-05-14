import { logger } from "./log";

type KeyMap = {
  key: string;
  ctrl: boolean;
  shift: boolean;
};

type Data = Record<string, KeyMap>;
type EncodedData = string;

export function initKeybinding(d: EncodedData) {
  const data = decodeData(d);
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
    return encodeData(data);
  };

  const find = (k: KeyMap) => {
    return cache.get(encode(k));
  };

  const get = (id: string) => {
    const k = data[id];
    if (k === undefined) {
      return null;
    }
    return encode(k);
  };

  return { set, get, find };
}

function encodeData(d: Data) {
  let r: EncodedData = "";
  for (const id in d) {
    r += `${id} ${encode(d[id])}\n`;
  }
  return r;
}

function decodeData(d: EncodedData) {
  const r: Data = {};
  d.trim()
    .replaceAll("\t", "")
    .replaceAll("\r\n", "\n")
    .replaceAll("   ", " ")
    .replaceAll("  ", " ")
    .split("\n")
    .forEach((l) => {
      if (l === "") {
        return;
      }
      const [id, k] = l.split(" ");
      r[id] = decode(k);
    });
  return r;
}

function encode(k: KeyMap) {
  return `${k.ctrl ? "c-" : ""}${k.shift ? "s-" : ""}${k.key}`;
}

function decode(v: string): KeyMap {
  if (v.startsWith("c-s-")) {
    const key = v.substring("c-s-".length);
    return { key, ctrl: true, shift: true };
  }
  if (v.startsWith("c-")) {
    const key = v.substring("c-".length);
    return { key, ctrl: true, shift: false };
  }
  if (v.startsWith("s-")) {
    const key = v.substring("s-".length);
    return { key, ctrl: false, shift: true };
  }
  return { key: v, ctrl: false, shift: false };
}
