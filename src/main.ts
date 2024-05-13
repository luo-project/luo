import { loadCommands } from "./lib/command/utils";
import { DEFAULT_STATE } from "./lib/constants";
import { makeCytoscape } from "./lib/cytoscape/utils";
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

const tempIndicatorHook: StateHook = {
  id: "tempindicator",
  func: async (s) => {
    const lines: string[] = [];
    lines.push(`<pre>${JSON.stringify(s, null, 2)}</pre>`);
    document.getElementById("tempindicator")!.innerHTML = lines.join("<br/>");
  },
};

const runCommand = makeRunCommand(state, [renderHook, tempIndicatorHook]);
runCommand(commands["no-op"]);

document.getElementById("tempnoop")!.addEventListener("click", () => {
  runCommand(commands["no-op"]);
});
document.getElementById("tempasdf")!.addEventListener("click", () => {
  runCommand(commands["sample-asdf"]);
});
