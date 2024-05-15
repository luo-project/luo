import type { Config } from "./config";
import { logger } from "./log";
import { deepCopy } from "./utils";

export function makeFindKeybinding(config: Config) {
  const l = logger("keyfinder");
  const kb = deepCopy(config.command.keybinding);
  return (key: string, ctrl: boolean, shift: boolean) => {
    const k = encode(key, ctrl, shift);
    l.debug(k);
    return kb[k] || null;
  };
}

function encode(key: string, ctrl: boolean, shift: boolean) {
  return `${ctrl ? "c-" : ""}${shift ? "s-" : ""}${key}`;
}
