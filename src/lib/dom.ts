import { logger } from "./log";

type KeyEvent = {
  key: string;
  ctrl: boolean;
  shift: boolean;
};

type KeyEventListener = (e: KeyEvent) => boolean;

export function initKeyboardEvent(listener: KeyEventListener) {
  document.addEventListener("keydown", (e) => {
    if (e.repeat) {
      return;
    }
    const ke = { key: e.key.toLowerCase(), ctrl: e.ctrlKey, shift: e.shiftKey };
    if (ke.key === " ") {
      ke.key = "space";
    }
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
