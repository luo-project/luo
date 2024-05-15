import { initCytoscape } from "../cytoscape/utils";
import type { HookDefinition } from "../hook";

const cy = initCytoscape(document.getElementById("cy")!);

export const def: HookDefinition = {
  func: cy.render,
};
