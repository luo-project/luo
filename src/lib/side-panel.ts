import type { CommandDefinitionWithId } from "./command";
import { select } from "./dom";
import type { KeybindingData } from "./keybinding";

export function initSidePanel(options: {
  commands: CommandDefinitionWithId[];
  keybindingData: KeybindingData;
}) {
  const divCommands = select("#commands");
  const divRegisters = select("#registers");
  const divPalletes = select("#palletes");
  const divLogs = select("#logs");

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

  const listAllCommands = () => {};
  listAllCommands();

  const onKey = (currentKeys: string[], possibles: [string, string][]) => {};

  const onMatch = (id: string) => {
    listAllCommands();
  };

  return { onLog, onKey, onMatch };
}
