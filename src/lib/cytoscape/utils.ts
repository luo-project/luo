import { logger } from "../log";
import type { Edge, GraphElement, State, Vertex } from "../state/types";
import style from "./style.css?raw";
import cytoscape from "cytoscape";

const layoutOptions: cytoscape.LayoutOptions = {
  name: "grid",
  rows: 5,
  cols: 5,
  fit: false,
  animate: true,
  animationDuration: 100,
};

export function makeCytoscape(container: HTMLElement) {
  const cy = cytoscape({
    container,
    elements: {
      nodes: [],
      edges: [],
    },
    style: style as any,
  });

  let ids = new Set<number>();
  const l = logger("cy-render");

  return {
    render: async (state: State) => {
      l.time("categorize");
      const refs = new Map<number, GraphElement>();
      const newIds = new Set<number>();
      const deletedElementIds = new Set(ids);
      const existingVertices: Vertex[] = [];
      const newVertices: Vertex[] = [];
      const existingEdges: Edge[] = [];
      const newEdges: Edge[] = [];
      state.graph.vertices.forEach((v) => {
        refs.set(v.id, v);
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
        `ids= ${ids.size}->${newIds.size}`,
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
      cy.add(newVertices.map((v) => ({ data: makeNodeData(v) })));
      cy.add(newEdges.map((e) => ({ data: makeEdgeData(e) })));
      cy.endBatch();
      l.timeEnd("batch");
      l.time("layout");
      await cy.layout(layoutOptions).run().promiseOn("layoutstop");
      ids.forEach((id) => {
        const pos = cy.getElementById(`${id}`).position();
        refs.get(id)!.position = { x: pos.x, y: pos.y };
      });
      l.timeEnd("layout");
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
    position: e.position,
  };
}
