import { VALID_KEYS } from "./constants";
import { logger } from "./log";

export type Keybinding = Record<string, string>;

export type OnMatch = (id: string) => void;

export type OnKey = (
  currentKeys: string[],
  possibles: [keymap: string, id: string][],
) => void;
const l = logger("keymap");
let enabled = true;

export function enableKeymap(e: boolean) {
  if (enabled === e) {
    l.error("enabled===e", e);
  }
  enabled = e;
}

const currentKeys = [] as string[];

export function startKeymap(
  b: Keybinding,
  onMatch: OnMatch,
  onKey: OnKey,
  timeout: number,
) {
  const bindings = [] as [keymap: string, id: string][];
  for (const [km, id] of Object.entries(b)) {
    if (typeof id !== "string" || id === "") {
      throw new Error(`wrong id in keymap: ${id}`);
    }
    validate(km);
    bindings.push([km, id]);
  }
  let waitingTimeout: any = undefined;
  let waitingId: string | null = null;
  const matchAndReset = (id: string, msg: string) => {
    try {
      l.debug(`match(${msg}) '${id}'`);
      onMatch(id);
    } finally {
      currentKeys.length = 0;
      waitingId = null;
      clearTimeout(waitingTimeout);
    }
  };
  const onEncodedKey = (encodedKey: string) => {
    clearTimeout(waitingTimeout);
    currentKeys.push(encodedKey);
    const currentKey = currentKeys.join(" ");
    l.debug("onEncodedKey", currentKey);
    const matchedId = b[currentKey];
    const possibles = bindings.filter(([km]) => {
      if (currentKey === "c" && km.startsWith(CTRL)) {
        return false;
      }
      return km.startsWith(currentKey);
    });
    if (waitingId !== null && possibles.length === 0) {
      matchAndReset(waitingId, "early");
      onEncodedKey(encodedKey);
      return;
    }
    try {
      onKey([...currentKeys], possibles);
    } finally {
      if (matchedId) {
        if (possibles.length === 1) {
          matchAndReset(matchedId, "exactly");
          return;
        }
        l.debug("waiting", matchedId);
        waitingId = matchedId;
        waitingTimeout = setTimeout(() => {
          matchAndReset(matchedId, "timeouted");
        }, timeout);
        return;
      }
      if (possibles.length === 0) {
        l.debug("no possibles", currentKey);
        currentKeys.length = 0;
      }
    }
  };

  listenValidKeys((key, ctrl) => {
    onEncodedKey(encode(key, ctrl));
  });
}

const keyOverrides = new Map<string, string>([[" ", "Space"]]);

function listenValidKeys(cb: (key: string, ctrl: boolean) => void) {
  document.addEventListener("keydown", (e) => {
    if (e.repeat) {
      return;
    }
    if (enabled === false) {
      return;
    }
    let key = e.key;
    const overrided = keyOverrides.get(key);
    if (overrided) {
      key = overrided;
    }
    if (VALID_KEYS.has(key)) {
      e.preventDefault();
      e.stopPropagation();
      cb(key, e.ctrlKey);
      return;
    }
    l.debug("pass", key);
  });
}

const CTRL = "ctrl-";

function encode(key: string, ctrl: boolean) {
  if (ctrl) {
    return `${CTRL}${key}`;
  }
  return key;
}

function validate(v: string) {
  v.split(" ").forEach((p, i) => {
    let str = p;
    if (str.startsWith(CTRL)) {
      str = str.substring(CTRL.length);
    }
    if (VALID_KEYS.has(str)) {
      return;
    }
    throw new Error(`Invalid keymap format: '${v}'`);
  });
}
