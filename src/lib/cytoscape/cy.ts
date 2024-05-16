import cytoscape from "cytoscape";
import style from "./style.txt?raw";
import { dev } from "../utils";
// @ts-ignore
import dagre from "cytoscape-dagre";

function initCytoscapeCore() {
  cytoscape.use(dagre);
  const container = document.getElementById("cy")!;
  const cy = cytoscape({
    container,
    boxSelectionEnabled: false,
    autounselectify: true,
    autoungrabify: true,
    userZoomingEnabled: false,
    userPanningEnabled: false,
  });
  cy.style().clear().fromString(style);
  cy.addListener("click", () => false);
  return cy;
}

export const cy = initCytoscapeCore();
dev(() => {
  (window as any).cy = cy;
});
