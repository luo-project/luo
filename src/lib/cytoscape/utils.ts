import { ANIMATION_DURATION, PROD } from "../constants";
import { logger } from "../log";
import type { Edge, GraphElement, State, Vertex } from "../types";
import style from "./style.css?raw";
import cytoscape from "cytoscape";

const layoutOptions: cytoscape.LayoutOptions = {
  name: "grid",
  rows: 5,
  cols: 5,
  fit: false,
  animate: true,
  animationDuration: ANIMATION_DURATION,
};

export function makeCytoscape(container: HTMLElement) {
  const cy = cytoscape({
    container,
    elements: {
      nodes: [],
      edges: [],
    },
    style: style as any,
    boxSelectionEnabled: false,
    autounselectify: true,
    autoungrabify: true,
    userZoomingEnabled: false,
    userPanningEnabled: false,
  });
  cy.addListener("click", () => false);

  let ids = new Set<number>();
  const l = logger("cy-render");

  return {
    render: async (state: State) => {
      l.time("categorize");
      const refs = new Map<number, GraphElement>();
      const sRefs = new Map<string, GraphElement>();
      const newIds = new Set<number>();
      const deletedElementIds = new Set(ids);
      const existingVertices: Vertex[] = [];
      const newVertices: Vertex[] = [];
      const existingEdges: Edge[] = [];
      const newEdges: Edge[] = [];
      state.graph.vertices.forEach((v) => {
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
      state.graph.edges.forEach((e) => {
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
      cy.add(
        newVertices.map((v) => ({ group: "nodes", data: makeNodeData(v) })),
      );
      cy.add(newEdges.map((e) => ({ group: "edges", data: makeEdgeData(e) })));
      cy.endBatch();
      l.timeEnd("batch");
      l.time("layout");
      await cy.layout(layoutOptions).run().promiseOn("layoutstop");
      l.timeEnd("layout");
      cy.nodes().forEach((n) => {
        const pos = n.position();
        (sRefs.get(n.id()) as Vertex).position = {
          x: pos.x,
          y: pos.y,
        };
      });
      cy.clearQueue();
      await new Promise<void>((r) => {
        cy.animate(
          {
            zoom: state.viewport.zoom,
            pan: { x: state.viewport.x, y: state.viewport.y },
          },
          {
            duration: ANIMATION_DURATION,
            complete: () => {
              r();
            },
          },
        );
      });
      if (!PROD) {
        l.debug(cy.json());
      }
    },
  };
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
