import { DEFAULT_STATE, PROD } from "./lib/constants";
import type { StateHook } from "./lib/types";
import { loadCommands, initCommandLoop } from "./lib/command";
import { makeCytoscape } from "./lib/cytoscape/utils";
import { initKeyboardEvent, preventClose } from "./lib/dom";
import { logger } from "./lib/log";
import "./style.css";
import { initKeybinding } from "./lib/keybinding";

const l = logger("main");
l.info("entrypoint");

const commands = loadCommands();
const cy = makeCytoscape(document.getElementById("cy")!);
const state = DEFAULT_STATE;

const renderHook: StateHook = {
  id: "render",
  func: cy.render,
};

const tempIndicatorHook: StateHook = {
  id: "tempindicator",
  func: async (s) => {
    const lines: string[] = [];
    lines.push(`<pre>${JSON.stringify(s, null, 2)}</pre>`);
    document.getElementById("tempindicator")!.innerHTML = lines.join("<br/>");
  },
};

const runCommand = initCommandLoop(state, [renderHook, tempIndicatorHook]);

// init
runCommand(commands["no-op"]);

const keybinding = initKeybinding(
  `no-op 1
camera-move-left arrowleft
camera-move-right arrowright
camera-move-up arrowup
camera-move-down arrowdown
camera-zoom-in c-arrowup`,
);

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

document.getElementById("temptemp")!.innerHTML =
  `<pre>${keybinding.set("camera-zoom-out", { ctrl: true, shift: false, key: "arrowdown" })}</pre>`;
