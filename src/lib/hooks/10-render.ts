import { makeCytoscape } from "../cytoscape/utils";
import type { State } from "../types";

const cy = makeCytoscape(document.getElementById("cy")!);

export function func(state: State) {
  return cy.render(state);
}
