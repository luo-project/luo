import { loadCommands } from "./lib/command/utils";
import { DEFAULT_STATE, PROD } from "./lib/constants";
import { makeCytoscape } from "./lib/cytoscape/utils";
import { initKeyboardEvent, preventClose } from "./lib/dom";
import { logger } from "./lib/log";
import type { StateHook } from "./lib/state/types";
import { makeRunCommand } from "./lib/state/utils";
import "./style.css";

const l = logger("main");
l.info("entrypoint");

const commands = loadCommands();
const cy = makeCytoscape(document.getElementById("cy")!);
const state = DEFAULT_STATE;

const renderHook: StateHook = {
  id: "render",
  func: cy.render,
};

//////////////////////////////////////////////////// TEMP START

const tempIndicatorHook: StateHook = {
  id: "tempindicator",
  func: async (s) => {
    const lines: string[] = [
      `commands:<pre>${Object.keys(commands).join(",")}</pre>`,
    ];
    lines.push(`state:<pre>${JSON.stringify(s, null, 2)}</pre>`);
    document.getElementById("tempindicator")!.innerHTML = lines.join("<br/>");
  },
};

document.getElementById("tempnoop")!.addEventListener("click", () => {
  runCommand(commands["no-op"]);
});

document.getElementById("tempasdf")!.addEventListener("click", () => {
  runCommand(commands["sample-asdf"]);
});

//////////////////////////////////////////////////// TEMP END

initKeyboardEvent((e) => {
  return e.key === "a";
});

const runCommand = makeRunCommand(state, [renderHook, tempIndicatorHook]);
runCommand(commands["no-op"]);

if (PROD) {
  preventClose();
}
