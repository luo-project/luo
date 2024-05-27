import { DEFAULT_CONFIG, DEFAULT_KEYBINDING, DEFAULT_STATE, PROD } from "./lib/constants";
import { initCommandLoop, loadCommands } from "./lib/command";
import { preventClose } from "./lib/dom";
import "./css/main.css";
import "./css/side-panel.css";
import "./css/svg.css";
import { loadHooks } from "./lib/hook";
import { startKeymap } from "./lib/keymap";
import { logger, setOnLog } from "./lib/log";
import { initSidePanel } from "./lib/side-panel";

const state = DEFAULT_STATE;
const config = DEFAULT_CONFIG;
const keybinding = DEFAULT_KEYBINDING;
const l = logger("main");

const commands = loadCommands();
const hooks = loadHooks().filter((v) => (PROD ? !v.dev : true));

const runCommand = initCommandLoop(
  state,
  config,
  Object.values(commands),
  hooks,
  (cmd) => {
    const kb = Object.entries(keybinding).find(([km, id]) => id === cmd.id) ?? [""];
    l.info(`run '${cmd.id}' [${kb[0]}]`);
  },
);

const sidePanel = initSidePanel(commands, keybinding);
setOnLog(sidePanel.onLog);

startKeymap(
  keybinding,
  (id) => {
    sidePanel.onMatch(id);
    const cmd = commands[id];
    if (cmd === undefined) {
      throw new Error(`invalid command ${id} is in keybinding`);
    }
    runCommand(cmd);
  },
  (current, possibles) => {
    sidePanel.onKey(current, possibles);
    if (possibles.length === 0) {
      l.error(`no keybinding for [${current}]`);
    }
  },
  1000,
);

runCommand(commands["no-op"]);

if (PROD) preventClose();

window.addEventListener("unhandledrejection", (e) => {
  l.error("unhandled:", e.reason);
});

window.addEventListener("error", (e) => {
  l.error("error", e.error);
  e.preventDefault();
});
