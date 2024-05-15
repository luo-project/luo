import cytoscape from "cytoscape";
import { logger } from "./log";
import type { State } from "./state";
import type { Config } from "./config";
import { getCurrentSnapshop, type Edge, type GraphElement, type Vertex } from "./graph";
import { PROD } from "./constants";

export const cytoscapeCoreRefKey = Symbol("cytoscape.Core");

const style: cytoscape.Stylesheet[] = [
  {
    selector: "node",
    css: {
      backgroundColor: "red",
    },
  },
];

export function initCytoscapeCore() {
  const container = document.getElementById("cy")!;
  const cy = cytoscape({
    container,
    elements: {
      nodes: [],
      edges: [],
    },
    style,
    boxSelectionEnabled: false,
    autounselectify: true,
    autoungrabify: true,
    userZoomingEnabled: false,
    userPanningEnabled: false,
  });
  cy.addListener("click", () => false);
  return cy;
}

let ids = new Set<number>();
const l = logger("cy-render");
export async function render(cy: cytoscape.Core, state: State, config: Config) {
  l.time("categorize");
  const refs = new Map<number, GraphElement>();
  const sRefs = new Map<string, GraphElement>();
  const newIds = new Set<number>();
  const deletedElementIds = new Set(ids);
  const existingVertices: Vertex[] = [];
  const newVertices: Vertex[] = [];
  const existingEdges: Edge[] = [];
  const newEdges: Edge[] = [];
  const graph = getCurrentSnapshop(state.graph);
  graph.vertices.forEach((v) => {
    refs.set(v.id, v);
    sRefs.set(`${v.id}`, v);
    newIds.add(v.id);
    const exists = deletedElementIds.delete(v.id);
    if (exists) {
      existingVertices.push(v);
      return;
    }
    newVertices.push(v);
  });
  graph.edges.forEach((e) => {
    refs.set(e.id, e);
    sRefs.set(`${e.id}`, e);
    newIds.add(e.id);
    const exists = deletedElementIds.delete(e.id);
    if (exists) {
      existingEdges.push(e);
      return;
    }
    newEdges.push(e);
  });
  deletedElementIds.forEach((id) => {
    newIds.delete(id);
  });
  l.debug(
    `existing=${existingVertices.length},${existingEdges.length}`,
    `new=${newVertices.length},${newEdges.length}`,
    `deleted=${deletedElementIds.size}`,
    `ids=${ids.size}->${newIds.size}`,
  );
  ids = newIds;
  l.timeEnd("categorize");
  l.time("batch");
  cy.startBatch();
  const deletedElements = cy.filter((e) => {
    return deletedElementIds.has(parseInt(e.id(), 10));
  });
  deletedElements.remove();
  existingVertices.forEach((v) => {
    cy.getElementById(`${v.id}`).data(makeNodeData(v));
  });
  existingEdges.forEach((e) => {
    cy.getElementById(`${e.id}`).data(makeEdgeData(e));
  });
  cy.add(newVertices.map((v) => ({ group: "nodes", data: makeNodeData(v) })));
  cy.add(newEdges.map((e) => ({ group: "edges", data: makeEdgeData(e) })));
  cy.endBatch();
  l.timeEnd("batch");
  if (newVertices.length > 0 || newEdges.length > 0 || deletedElementIds.size > 0) {
    l.time("layout");
    await cy
      .layout({
        name: "grid",
        rows: 5,
        cols: 5,
        fit: false,
        animate: config.graph.animation > 0,
        animationDuration: config.graph.animation,
        animationEasing: "ease",
      })
      .run()
      .promiseOn("layoutstop");
    l.timeEnd("layout");
  }
  cy.nodes().forEach((n) => {
    const pos = n.position();
    (sRefs.get(n.id()) as Vertex).position = {
      x: pos.x,
      y: pos.y,
    };
  });
  if (config.viewport.animation > 0) {
    cy.clearQueue();
    await new Promise<void>((r) => {
      cy.animate(
        {
          zoom: state.viewport.zoom,
          pan: { x: state.viewport.x, y: state.viewport.y },
        },
        {
          duration: config.viewport.animation,
          easing: "ease",
          complete: () => {
            r();
          },
        },
      );
    });
  } else {
    cy.viewport({
      zoom: state.viewport.zoom,
      pan: { x: state.viewport.x, y: state.viewport.y },
    });
  }
  if (!PROD) {
    l.debug(cy.json());
  }
}

function makeNodeData(v: Vertex): cytoscape.NodeDataDefinition {
  return {
    id: `${v.id}`,
    parent: v.parent ? `${v.parent}` : undefined,
    position: v.position,
  };
}

function makeEdgeData(e: Edge): cytoscape.EdgeDataDefinition {
  return {
    id: `${e.id}`,
    source: `${e.from}`,
    target: `${e.to}`,
  };
}
