import { logger } from "./log";

type KeyEvent = {
  key: string;
  ctrl: boolean;
  shift: boolean;
};

type KeyEventListener = (e: KeyEvent) => boolean;

export function initKeyboardEvent(listener: KeyEventListener) {
  const l = logger("keydown");
  document.addEventListener("keydown", (e) => {
    const ke = { key: e.key.toLowerCase(), ctrl: e.ctrlKey, shift: e.shiftKey };
    if (listener(ke)) {
      l.debug("consume", formatKeyEvent(ke));
      e.preventDefault();
      e.stopPropagation();
    }
  });
}

function formatKeyEvent(ke: KeyEvent) {
  return `${ke.ctrl ? "ctrl-" : ""}${ke.shift ? "shift-" : ""}${ke.key}`;
}

export function preventClose() {
  window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
    return "confirm";
  });
}
