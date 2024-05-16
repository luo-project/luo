import { type Edge, type GraphElement, type GraphSnapshot, type Vertex } from "./graph";
import { logger } from "./log";
import { dev } from "./utils";

type GraphIndex = [vertex: boolean, idx: number];
const indexes = new Map<string, GraphIndex>();
export const deletedIds = new Set<string>();
export const holdedIds = new Set<string>();
export const createdIds = new Set<string>();
const l = logger("graph-index");

export function updateGraphIndex(graph: GraphSnapshot) {
  l.time("update");
  const oldIds = new Set(indexes.keys());
  indexes.clear();
  graph.vertices.forEach(makeIndexer(true));
  graph.edges.forEach(makeIndexer(false));

  holdedIds.clear();
  createdIds.clear();
  deletedIds.clear();
  for (const id of indexes.keys()) {
    if (oldIds.has(id)) {
      holdedIds.add(id);
    } else {
      createdIds.add(id);
    }
  }
  for (const id of oldIds) {
    if (!indexes.has(id)) {
      deletedIds.add(id);
    }
  }
  l.timeEnd("update");
  dev(() => {
    const r = [] as any;
    for (const [id, idx] of indexes) {
      r.push(`${id.padEnd(3)}${idx[0] ? "v" : "e"}${idx[1]}`);
    }
    l.debug(`${holdedIds.size}/${createdIds.size}/${deletedIds.size}`, r);
  });
}

export function getGraphElement(
  id: number | string,
  graph: GraphSnapshot,
): Vertex | Edge {
  const i = indexes.get(`${id}`);
  if (i === undefined) {
    throw new Error(`GraphIndex not found: ${id}`);
  }
  let arr: (Vertex | Edge)[];
  if (i[0] === true) {
    arr = graph.vertices;
  } else {
    arr = graph.edges;
  }
  const r = arr[i[1]];
  if (r === undefined) {
    throw new Error(`GraphIndex found but no element in GraphSnapshot: ${id} ${i}`);
  }
  return r;
}

function makeIndexer(vertex: boolean) {
  return (e: GraphElement, i: number) => {
    const id = `${e.id}`;
    if (indexes.has(id)) {
      throw new Error(`GraphElement.id conflict: ${e.id}`);
    }
    indexes.set(id, [vertex, i]);
  };
}
