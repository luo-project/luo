import { VALID_KEYS } from "./constants";
import { logger } from "./log";
import { deepCopy } from "./utils";

const l = logger("keybinding");

export type Key = {
  key: string;
  ctrl?: boolean;
};

export type IdAndKeys = { id: string; keys: Key[] };

export type KeybindingData = IdAndKeys[];

export function initKeybinding(options: {
  data: KeybindingData;
  allIds: string[];
  timeout: number;
  onMatch: (matched: IdAndKeys | null) => void;
  onWait: (waited: IdAndKeys) => void;
  onEnabled: (enabled: boolean) => void;
  onKey: (currentKeys: Key[], possibles: IdAndKeys[]) => void;
}) {
  validateData(options.data, options.allIds);
  let enabled = true;
  const setEnable = (b: boolean) => {
    if (enabled === b) {
      l.error("enabled===b", b);
    }
    enabled = b;
    options.onEnabled(b);
  };

  const currentKeys = [] as Key[];
  let waitingTimeout: any = undefined;
  let waiting: IdAndKeys | null = null;

  const match = (matched: IdAndKeys | null) => {
    try {
      options.onMatch(deepCopy(matched));
    } finally {
      if (matched) {
        l.debug("match:", matched.id);
      } else {
        l.debug("nothing matched");
      }
      clearTimeout(waitingTimeout);
      currentKeys.length = 0;
      waiting = null;
    }
  };

  const wait = (v: IdAndKeys) => {
    try {
      options.onWait(deepCopy(v));
    } finally {
      clearTimeout(waitingTimeout);
      waiting = v;
      waitingTimeout = setTimeout(() => {
        match(v);
      }, options.timeout);
    }
  };

  const handleKey = (key: Key) => {
    clearTimeout(waitingTimeout);
    currentKeys.push(key);
    const possibles = options.data.filter(({ keys }) =>
      keysStartsWith(keys, currentKeys),
    );
    if (waiting !== null && possibles.length === 0) {
      // match waiting and handle current key again.
      match(waiting);
      handleKey(key);
      return;
    }
    try {
      options.onKey(currentKeys, possibles);
    } finally {
      if (possibles.length === 0) {
        match(null);
        return;
      }

      if (possibles.length === 1) {
        match(possibles[0]);
        return;
      }

      const matched = possibles.find(({ keys }) => keysEquals(keys, currentKeys));
      if (matched) {
        wait(matched);
      }
    }
  };

  listenValidKeys((key) => {
    if (!enabled) {
      return false;
    }
    try {
      handleKey(key);
    } finally {
      return true;
    }
  });

  return { setEnable };
}

const keyOverrides = new Map<string, string>([[" ", "Space"]]);

function listenValidKeys(cb: (key: Key) => boolean) {
  document.addEventListener("keydown", (e) => {
    if (e.repeat) {
      return;
    }
    let key = e.key;
    const overrided = keyOverrides.get(key);
    if (overrided) {
      key = overrided;
    }
    if (VALID_KEYS.has(key)) {
      if (cb({ key, ctrl: e.ctrlKey })) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    }
    l.debug("pass", key);
  });
}

function validateData(data: KeybindingData, allIds: string[]) {
  try {
    data.forEach(({ id, keys }) => {
      if (typeof id !== "string" || id === "" || !allIds.includes(id)) {
        throw new Error(`invalid id: ${id}`);
      }
      if (!Array.isArray(keys) || keys.length === 0) {
        throw new Error("no keys");
      }
      keys.forEach(validateKey);
    });
  } catch (e) {
    throw new Error(`Failed to validate keybinding:\n${e}`);
  }
}

function validateKey(k: Key) {
  if (typeof k.key !== "string" || k.key === "" || !VALID_KEYS.has(k.key)) {
    throw new Error(`invalid key: ${k}`);
  }
}

function keysStartsWith(keys: Key[], prefix: Key[]) {
  if (keys.length < prefix.length) {
    return false;
  }

  for (let i = 0; i < prefix.length; i += 1) {
    if (!keyEquals(keys[i], prefix[i])) {
      return false;
    }
  }
  return true;
}

function keyEquals(a: Key, b: Key) {
  return a.key === b.key && !!a.ctrl === !!b.ctrl;
}

function keysEquals(a: Key[], b: Key[]) {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i += 1) {
    if (!keyEquals(a[i], b[i])) {
      return false;
    }
  }
  return true;
}

export function formatKey(key: Key) {
  if (key.ctrl) {
    return `ctrl-${key.key}`;
  }
  return key.key;
}

export function formatKeys(keys: Key[]) {
  return keys.map(formatKey).join(" ");
}
