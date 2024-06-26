import "./css/main.css";
import "./css/side-panel.css";
import "./css/svg.css";
import { initCommandLoop, loadCommands } from "./lib/command";
import {
  DEFAULT_CONFIG,
  DEFAULT_KEYBINDING_Data,
  DEFAULT_STATE,
  PROD,
  UNREACHABLE,
} from "./lib/constants";
import { preventClose } from "./lib/dom";
import { getMaxIdFromState } from "./lib/graph";
import { loadHooks } from "./lib/hook";
import { formatKeys, initKeybinding } from "./lib/keybinding";
import { logger, setOnLog } from "./lib/log";
import { initSidePanelCommands } from "./lib/side-panel";
import type { GlobalContext } from "./lib/state";
import { initUserInput } from "./lib/user-input";
import { newCounter } from "./lib/utils";

const state = DEFAULT_STATE;
const config = DEFAULT_CONFIG;
const keybindingData = DEFAULT_KEYBINDING_Data;
const l = logger("main");

window.addEventListener("unhandledrejection", (e) => {
  l.error("unhandled:", e.reason);
});

window.addEventListener("error", (e) => {
  l.error("error", e.error);
  e.preventDefault();
});

const commands = loadCommands();
const hooks = loadHooks().filter((v) => (PROD ? !v.dev : true));
const flatCommands = Object.values(commands);

const globalContext: GlobalContext = {
  commands: flatCommands,
  availableCommands: UNREACHABLE,
  command: UNREACHABLE,
  graphIndex: UNREACHABLE,
  graphRenderInfo: UNREACHABLE,
  nextId: newCounter(getMaxIdFromState(state)),
  previousState: UNREACHABLE,
  userInput: UNREACHABLE,
};

const runCommand = initCommandLoop({
  commands,
  initState: state,
  config,
  hooks,
  onRun: (cmd) => {},
  globalContext,
});

const sidePanel = initSidePanelCommands({ commands: flatCommands, keybindingData });
setOnLog(sidePanel.onLog);

const keybinding = initKeybinding({
  data: keybindingData,
  allIds: flatCommands.map((v) => v.id),
  timeout: config.keyTimeout,
  onEnabled: (enabled) => {
    l.debug("keybinding", enabled ? "enabled" : "disabled");
  },
  onMatch: (matched, keys) => {
    sidePanel.onMatch(matched);
    if (matched) {
      l.info(`[${formatKeys(matched.keys)}]: ${matched.id} `);
      runCommand(matched.id);
    } else {
      l.warn(`[${formatKeys(keys)}]: nothing`);
    }
  },
  onWait: (waited) => {
    sidePanel.onWait(waited);
  },
  onKey: (currentKeys, possibles) => {
    sidePanel.onKey(currentKeys, possibles);
  },
});

globalContext.userInput = initUserInput({
  onEnabled: (e) => {
    keybinding.setEnable(!e!);
  },
});

runCommand("no-op");

if (PROD) preventClose();
