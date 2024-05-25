import type { CommandDefinition } from "../command";
import { sortGraphElementsByPosition, GraphElement, isVertex } from "../graph";
import { isExistsId } from "../graph-index";
import { deepCopy } from "../utils";

export const def: CommandDefinition = {
  description: "Move focus to the prev element in the choice list.",

  available(state, config, ctx) {
    let graph = deepCopy(state.graph) as any;

    if (
      state.choices.filter((id) => {
        let element = ctx.graphIndex(graph).any(id);
        return isVertex(element);
      }).length === 0
    ) {
      return "No element to move focus to. because the choice list is empty.";
    }

    const focus = state.focus;
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
    let elements = sortGraphElementsByPosition(
      state.choices.map((id) => ctx.graphIndex(state.graph).any(id)),
      ctx,
    );
    let focus = state.focus!;
    let focusIndex = elements.findIndex((element) => element.id === focus);
    if (focusIndex === -1) {
      state.focus = elements[0].id;
    }
    state.focus = elements[(focusIndex - 1 + elements.length) % elements.length].id;
  },
};
