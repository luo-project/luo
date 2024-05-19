import type { CommandDefinition } from "../command";
import { isVertex } from "../graph";

export const def: CommandDefinition = {
  description: "iterates focus to next edge or vertex if focus is the last edge",

  available(state) {
    if (!state.graphFocus) {
      return "No focus.";
    }
    return true;
  },

  func(state, cfg, ctx) {
    const focus = state.graphFocus!;
    const focusElement = ctx.graphIndex(state.graph).any(focus);

    const parent = isVertex(focusElement) ? focus : focusElement.source;
    const children = state.graph.elements
      .filter((e) => !isVertex(e) && e.source === parent)
      .map((e) => e.id);

    const candidate = [parent, ...children];
    state.graphFocus = candidate[(candidate.indexOf(focus) + 1) % candidate.length];
  },
};
