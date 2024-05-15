import { logger } from "./log";

type KeyEvent = {
  key: string;
  ctrl: boolean;
  shift: boolean;
};

type KeyEventListener = (e: KeyEvent) => boolean;

const patch = new Map<string, string | null>([
  [" ", "space"],
  ["control", null],
  ["shift", null],
  ["alt", null],
  ["meta", null],
]);

const l = logger("keyevent");
export function initKeyboardEvent(listener: KeyEventListener) {
  document.addEventListener("keydown", (e) => {
    if (e.repeat) {
      return;
    }
    let key = e.key.toLowerCase();
    const patchedKey = patch.get(key);
    if (patchedKey === null) {
      l.debug(`ignore '${key}'`);
      return;
    }
    if (patchedKey !== undefined) {
      l.debug(`patch '${key}'->'${patchedKey}'`);
      key = patchedKey;
    }
    const ke = { key, ctrl: e.ctrlKey, shift: e.shiftKey };
    if (listener(ke)) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
}

export function preventClose() {
  window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
    return "confirm";
  });
}
