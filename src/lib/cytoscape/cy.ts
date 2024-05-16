import cytoscape from "cytoscape";
import style from "./style.txt?raw";
import { dev } from "../utils";

function initCytoscapeCore() {
  const container = document.getElementById("cy")!;
  const cy = cytoscape({
    container,
    style: style as any,
    boxSelectionEnabled: false,
    autounselectify: true,
    autoungrabify: true,
    userZoomingEnabled: false,
    userPanningEnabled: false,
  });
  cy.addListener("click", () => false);
  return cy;
}

export const cy = initCytoscapeCore();
dev(() => {
  (window as any).cy = cy;
});
