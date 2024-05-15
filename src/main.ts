import { DEFAULT_CONFIG, DEFAULT_STATE, PROD } from "./lib/constants";
import { commands, initCommandLoop } from "./lib/command";
import { initKeyboardEvent, preventClose } from "./lib/dom";
import "./style.css";
import { makeFindKeybinding } from "./lib/keybinding";

const state = DEFAULT_STATE;
const config = DEFAULT_CONFIG;

const runCommand = initCommandLoop(state, config);
const findKeybinding = makeFindKeybinding(config);

initKeyboardEvent((e) => {
  const cmdId = findKeybinding(e.key, e.ctrl, e.shift);
  if (cmdId === null) {
    return false;
  }
  const cmd = commands[cmdId];
  if (cmd === undefined) {
    throw new Error(`invalid command ${cmdId} was in keybinding`);
  }
  runCommand(cmd);
  return true;
});

runCommand(commands["no-op"]);

if (PROD) preventClose();
