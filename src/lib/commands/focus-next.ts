import type { CommandDefinition } from "../command";
import { sortGraphElementsByPosition, GraphElement, isVertex } from "../graph";
import { isExistsId } from "../graph-index";
import { deepCopy } from "../utils";

export const def: CommandDefinition = {
  description: "Move focus to the next element in the choice list.",

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

    const focus = state.graphFocus;
    if (focus === undefined || isExistsId(graph, focus) === false) {
      return true;
    }
    const focusElement = ctx.graphIndex(graph).any(focus);
    if (!isVertex(focusElement)) {
      return "Edge is not supported Temporary.";
    }
    return true;
  },

  func(state, config, ctx) {
    if (
      state.graphFocus === undefined ||
      isExistsId(state.graph, state.graphFocus) === false
    ) {
      state.graphFocus = state.choice[0];
      return;
    }
    let elements = sortGraphElementsByPosition(
      state.choice.map((id) => ctx.graphIndex(state.graph).any(id)),
      ctx,
    );
    let focus = state.graphFocus!;
    let focusIndex = elements.findIndex((element) => element.id === focus);
    if (focusIndex === -1) {
      state.graphFocus = elements[0].id;
    }
    state.graphFocus = elements[(focusIndex + 1) % elements.length].id;
  },
};
