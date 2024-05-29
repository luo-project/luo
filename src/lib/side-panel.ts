import type { CommandDefinitionWithId } from "./command";
import { select } from "./dom";
import { formatKeys, type IdAndKeys, type Key, type KeybindingData } from "./keybinding";

export function initSidePanel(options: {
  commands: CommandDefinitionWithId[];
  keybindingData: KeybindingData;
}) {
  const divCommands = select("#commands");
  const divRegisters = select("#registers");
  const divPalette = select("#palettes");
  const divLogs = select("#logs");
  const root: NestedCommand = { categoryName: "", children: [], commands: [] };

  options.commands.forEach((cmd) => {
    const arr = cmd.id.split("/");
    const categories = arr.length === 1 ? [] : arr.slice(0, -1);
    const baseName = arr[arr.length - 1];

    let parent = root;
    categories.forEach((c) => {
      let nc = parent.children.find((v) => v.categoryName === c);
      if (!nc) {
        nc = { categoryName: c, children: [], commands: [] };
        parent.children.push(nc);
      }
      parent = nc;
    });
    parent.commands.push({
      id: cmd.id,
      name: baseName,
      keys: options.keybindingData.find((v) => v.id === cmd.id)?.keys,
    });
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

  const createNestedCommandDiv = (nc: NestedCommand) => {
    const container = document.createElement("div");
    container.classList.add("container");
    const category = document.createElement("div");
    category.classList.add("category");
    category.textContent = nc.categoryName;

    container.append(
      category,
      ...nc.commands.map((c) => {
        const row = document.createElement("row");
        row.classList.add("row");

        const cmd = document.createElement("div");
        cmd.classList.add("command");
        cmd.textContent = c.name;

        const key = document.createElement("div");
        key.classList.add("key");
        if (c.keys) {
          key.textContent = formatKeys(c.keys);
        }

        row.append(cmd, key);
        return row;
      }),
      ...nc.children.map(createNestedCommandDiv),
    );
    return container;
  };

  const listAllCommands = () => {
    divCommands.replaceChildren(createNestedCommandDiv(root));
  };

  listAllCommands();

  const onKey = (currentKeys: Key[], possibles: IdAndKeys[]) => {};

  const onMatch = (v: IdAndKeys | null) => {
    listAllCommands();
  };

  const onWait = (v: IdAndKeys) => {};

  return { onLog, onKey, onMatch, onWait };
}

type NestedCommand = {
  categoryName: string;
  children: NestedCommand[];
  commands: { name: string; id: string; keys?: Key[] }[];
};
