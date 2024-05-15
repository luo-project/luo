import { DEFAULT_KEYBINDING, DEFAULT_STATE, PROD } from "./lib/constants";
import { loadCommands, initCommandLoop } from "./lib/command";
import { initKeyboardEvent, preventClose } from "./lib/dom";
import { logger } from "./lib/log";
import "./style.css";
import { initKeybinding } from "./lib/keybinding";
import { loadHooks } from "./lib/hook";

const l = logger("main");
l.info("entrypoint");

const commands = loadCommands();
const hooks = loadHooks();
l.debug(commands, hooks);

const runCommand = initCommandLoop(DEFAULT_STATE, hooks);
const keybinding = initKeybinding(DEFAULT_KEYBINDING);
initKeyboardEvent((e) => {
  const cmdId = keybinding.find(e);
  if (cmdId === undefined) {
    return false;
  }
  runCommand(commands[cmdId]);
  return true;
});

if (PROD) {
  preventClose();
}

runCommand(commands["no-op"]);

// TEMP
document.getElementById("temptemp")!.innerHTML =
  `<pre>${JSON.stringify(keybinding.set("camera-zoom-out", { ctrl: true, shift: false, key: "arrowdown" }), null, 2)}</pre>`;
