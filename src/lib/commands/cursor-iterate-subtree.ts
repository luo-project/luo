import type { CommandDefinition } from "../command";
import { getGraphElement, holdedIds } from "../graph-index";

export const def: CommandDefinition = {
  description: "iterate cursor to next edge or vertex if cursor is the last edge",

  available(state) {
    if (!state.graphCursor) {
      return "Cursor is not set.";
    }
    return true;
  },

  func(state) {
    const graph = state.graph.snapshots[state.graph.current];
    const cursor = state.graphCursor!;
    const cursorElement = getGraphElement(cursor, graph);

    const parent = "from" in cursorElement ? cursorElement.from : cursor;

    const children = [];
    for (const id in holdedIds) {
      const element = getGraphElement(id, graph);
      if ("from" in element && element.from === parent) {
        children.push(+id);
      }
    }

    const candidate = [parent, ...children];
    state.graphCursor = candidate[(candidate.indexOf(cursor) + 1) % candidate.length];
  },
};
