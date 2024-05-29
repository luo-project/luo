import type { CommandDefinition } from "../../command";
import {
  deleteElement,
  findElementById,
  isEdge,
  isVertex,
  sortByDistance,
} from "../../graph";
import { isExistsId } from "../../graph-index";
import { deepCopy } from "../../utils";

export const def: CommandDefinition = {
  available(state) {
    if (state.choices.length === 0) {
      return "There's no choices to delete.";
    }
    return true;
  },
  func(state, config, ctx) {
    let focus = state.focus!;
    let focusElement = findElementById(state.graph, state.focus!)!;
    let lastRenderInfo;
    if (isVertex(focusElement)) {
      lastRenderInfo = ctx.graphRenderInfo.vertex(focus);
    } else if (isEdge(focusElement)) {
      lastRenderInfo = ctx.graphRenderInfo.vertex(focusElement.target);
    }

    for (let choice of state.choices) {
      let element = findElementById(state.graph, choice);
      if (!element) {
        continue;
      }
      deleteElement(state.graph, element);
    }
    if (ctx.graphRenderInfo.edges().has(focus) && isEdge(focusElement)) {
      state.focus = focusElement.source;
    } else if (ctx.graphRenderInfo.vertices().has(focus) && isVertex(focusElement)) {
      if (lastRenderInfo === undefined) {
        state.focus = undefined;
        return;
      }
      const sortedResult = sortByDistance(state.graph, ctx, lastRenderInfo);
      for (const element of sortedResult) {
        if (isVertex(element) && isExistsId(state.graph, element.id)) {
          state.focus = element.id;
          return;
        }
      }
    } else {
      state.focus = undefined;
    }
  },
};
