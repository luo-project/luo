import type { CommandDefinition } from "../command";
import { getCurrentSnapshop, isVertex } from "../graph";

export const def: CommandDefinition = {
  description: "iterates cursor to next edge or vertex if cursor is the last edge",

  available(state) {
    if (!state.graphCursor) {
      return "Cursor is not set.";
    }
    return true;
  },

  func(state, cfg, ctx) {
    const graph = getCurrentSnapshop(state.graph);
    const cursor = state.graphCursor!;
    const cursorElement = ctx.graphIndex(graph).any(cursor);

    const parent = isVertex(cursorElement) ? cursor : cursorElement.source;
    const children = graph.elements
      .filter((e) => !isVertex(e) && e.source === parent)
      .map((e) => e.id);

    const candidate = [parent, ...children];
    state.graphCursor = candidate[(candidate.indexOf(cursor) + 1) % candidate.length];
  },
};
