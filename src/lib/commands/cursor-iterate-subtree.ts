import type { CommandDefinition } from "../command";
import { getCurrentSnapshop, isVertex } from "../graph";
import { getGraphElement, holdedIds } from "../graph-index";

export const def: CommandDefinition = {
  description: "iterates cursor to next edge or vertex if cursor is the last edge",

  available(state) {
    if (!state.graphCursor) {
      return "Cursor is not set.";
    }
    return true;
  },

  func(state) {
    const graph = getCurrentSnapshop(state.graph);
    const cursor = state.graphCursor!;
    const cursorElement = getGraphElement(cursor, graph);

    const parent = isVertex(cursorElement) ? cursor : cursorElement.from;
    const children = graph.edges.filter((e) => e.from === parent).map((e) => e.id);

    const candidate = [parent, ...children];
    state.graphCursor = candidate[(candidate.indexOf(cursor) + 1) % candidate.length];
  },
};
