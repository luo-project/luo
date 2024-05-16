import cytoscape from "cytoscape";
import style from "./style.txt?raw";
// @ts-ignore
import dagre from "cytoscape-dagre";

const container = document.getElementById("cy")!;

function initCytoscapeCore() {
  cytoscape.use(dagre);
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
(window as any).cy = cy;

export function getViewport() {
  const zoom = cy.zoom();
  const pan = cy.pan();
  const x1 = -pan.x / zoom;
  const y1 = -pan.y / zoom;
  const x2 = x1 + cy.width() / zoom;
  const y2 = y1 + cy.height() / zoom;
  return { x1, y1, x2, y2 };
}

export function getVertexPosition(id: number): { x: number; y: number } {
  return cy.getElementById(id.toString()).position();
}
