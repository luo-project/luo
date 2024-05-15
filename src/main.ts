import { DEFAULT_CONFIG, DEFAULT_STATE, PROD } from "./lib/constants";
import { loadCommands, initCommandLoop } from "./lib/command";
import { initKeyboardEvent, preventClose } from "./lib/dom";
import { logger } from "./lib/log";
import "./style.css";
import { makeFindKeybinding } from "./lib/keybinding";
import { loadHooks } from "./lib/hook";

const l = logger("main");

const commands = loadCommands();
const hooks = loadHooks();
l.debug("entrypoint", commands, hooks);

const state = DEFAULT_STATE;
const config = DEFAULT_CONFIG;

const runCommand = initCommandLoop(state, config, hooks);
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
