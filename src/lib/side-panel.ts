import type { CommandDefinitionWithId } from "./command";
import { select } from "./dom";
import type { Keybinding } from "./keymap";
import { deepCopy } from "./utils";

export function initSidePanel(
  commands: Record<string, CommandDefinitionWithId>,
  keybinding: Keybinding,
) {
  const divCommands = select("#commands");
  const divRegisters = select("#registers");
  const divPalletes = select("#palletes");
  const divLogs = select("#logs");

  const reversedKeybinding: Record<string, string | null> = {};
  Object.values(commands).forEach((cmd) => {
    reversedKeybinding[cmd.id] = null;
  });
  Object.entries(keybinding).forEach(([kb, id]) => {
    reversedKeybinding[id] = kb;
  });

  const onLog = (level: string, args: any[]) => {
    const msg = args.join(" ");
    const l = document.createElement("span");
    l.classList.add("log", level);
    l.textContent = msg;
    let fontSize = 12;
    if (msg.length > 40) {
      fontSize = 10;
    }
    l.style.fontSize = `${fontSize}px`;
    divLogs.append(l);
    divLogs.scrollBy({ behavior: "smooth", left: 0, top: 9999999999 });
  };

  const listAllCommands = () => {
    divCommands.replaceChildren(
      ...Object.entries(reversedKeybinding).map(([cmdId, kb]) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        const divKb = document.createElement("div");
        divKb.classList.add("kb");
        divKb.textContent = kb;

        const divId = document.createElement("div");
        divId.classList.add("id");
        divId.textContent = cmdId;
        wrapper.append(divId, divKb);
        return wrapper;
      }),
    );
  };
  listAllCommands();

  const onKey = (currentKeys: string[], possibles: [string, string][]) => {};

  const onMatch = (id: string) => {
    listAllCommands();
  };

  return { onLog, onKey, onMatch };
}
