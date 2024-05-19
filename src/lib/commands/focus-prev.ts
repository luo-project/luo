import type { CommandDefinition } from "../command";
import { sortGraphElementsByPosition, GraphElement, isVertex } from "../graph";
import { deepCopy } from "../utils";

export const def: CommandDefinition = {
  description: "Move focus to the prev element in the choice list.",
  modifyGraphFocus: true,

  available(state, config, ctx) {
    let graph = deepCopy(state.graph) as any;

    if (
      state.choice.filter((id) => {
        let element = ctx.graphIndex(graph).any(id);
        return isVertex(element);
      }).length === 0
    ) {
      return "No element to move focus to. because the choice list is empty.";
    }
    if (state.graphFocus === undefined) {
      return "No focus.";
    }

    const focus = state.graphFocus!;
    const focusElement = ctx.graphIndex(graph).any(focus);
    if (!isVertex(focusElement)) {
      return "Edge is not supported Temporary.";
    }
    return true;
  },

  func(state, config, ctx) {
    let elements = sortGraphElementsByPosition(state.graph.elements, ctx);
    let focus = state.graphFocus!;
    let focusIndex = elements.findIndex((element) => element.id === focus);
    if (focusIndex === -1) {
      state.graphFocus = elements[0].id;
    }
    state.graphFocus = elements[(focusIndex - 1 + elements.length) % elements.length].id;
  },
};