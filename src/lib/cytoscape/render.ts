import type { EdgeSingular, NodeSingular } from "cytoscape";
import type { Config } from "../config";
import {
  getCurrentSnapshop,
  type Edge,
  type GraphElement,
  type GraphSnapshot,
  type Vertex,
} from "../graph";
import { createdIds, deletedIds, getGraphElement, holdedIds } from "../graph-index";
import { logger } from "../log";
import type { State } from "../state";
import { deepCopy, dev } from "../utils";
import { cy } from "./cy";

const l = logger("cyRender");

export async function cyRender(state: State, config: Config) {
  const graph = getCurrentSnapshop(state.graph);

  l.time("batch");
  batch(graph);
  l.timeEnd("batch");

  l.time("layout");
  await layout(config);
  l.timeEnd("layout");

  updateNodesBody(graph);
  classCursor(state);
  await viewport(state, config);

  dev(() => {
    l.debug(cy.json());
  });
}

function deleteDeletedIds() {
  deletedIds.forEach((id) => {
    cy.getElementById(id).remove();
  });
}

function isVertex(e: GraphElement): e is Vertex {
  if (typeof (e as Vertex).shape === "string") {
    return true;
  }
  return false;
}

function updateNode(a: NodeSingular, b: Vertex) {
  if (b.body) {
    a.position({ x: b.body.x, y: b.body.y });
  }
}

function updateEdge(a: EdgeSingular, b: Edge) {}

function nodeData(e: Vertex) {
  const r: any = {};
  if (e.parent) {
    r.parent = `${e.parent}`;
  }
  return r;
}

function edgeData(e: Edge) {
  const r: any = {
    source: `${e.from}`,
    target: `${e.to}`,
  };
  return r;
}

function batch(graph: GraphSnapshot) {
  cy.startBatch();
  deleteDeletedIds();
  createdIds.forEach((id) => {
    const e = getGraphElement(id, graph);
    const v = isVertex(e);
    let data: any;
    if (v) {
      data = nodeData(e);
    } else {
      data = edgeData(e as Edge);
    }
    const ee = cy.add({
      group: v ? "nodes" : "edges",
      data: {
        id,
        ...data,
        element: deepCopy(e),
      },
    });
    if (v) {
      updateNode(ee, e);
    } else {
      updateEdge(ee, e as Edge);
    }
  });
  holdedIds.forEach((id) => {
    const e = getGraphElement(id, graph);
    const v = isVertex(e);
    let data: any;
    if (v) {
      data = nodeData(e);
    } else {
      data = edgeData(e as Edge);
    }
    const ee = cy.getElementById(id);
    ee.data({ id, ...data, element: deepCopy(e) });
    if (v) {
      updateNode(ee, e);
    } else {
      updateEdge(ee, e as Edge);
    }
  });
  cy.endBatch();
}

async function layout(config: Config) {
  if (createdIds.size > 0) {
    await cy
      .layout({
        name: "grid",
        rows: 10,
        cols: 2,
        fit: false,
        animate: config.graph.animation > 0,
        animationDuration: config.graph.animation,
        animationEasing: "ease",
      })
      .run()
      .promiseOn("layoutstop");
  }
}

function updateNodesBody(graph: GraphSnapshot) {
  cy.nodes().forEach((n) => {
    const pos = n.position();
    const e = getGraphElement(n.id(), graph) as Vertex;
    e.body = {
      x: pos.x,
      y: pos.y,
      w: n.width(),
      h: n.height(),
    };
  });
}

async function viewport(state: State, config: Config) {
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
}

function classCursor(state: State) {
  if (state.graphCursor) {
    cy.getElementById(`${state.graphCursor}`).addClass("cursor");
  }
}
