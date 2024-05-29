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
    if (!state.focus) {
      return "No focus.";
    }
    return true;
  },
  func(state, config, ctx) {
    const focus = state.focus!;
    const focusElement = deepCopy(findElementById(state.graph, state.focus!));
    if (!focusElement) {
      return;
    }
    const lastVertexRenderInfo = ctx.graphRenderInfo.vertex(focus);

    deleteElement(state.graph, focusElement);

    if (ctx.graphRenderInfo.edges().has(focus) && isEdge(focusElement)) {
      state.focus = focusElement.target;
    } else if (ctx.graphRenderInfo.vertices().has(focus) && isVertex(focusElement)) {
      const sortedResult = sortByDistance(state.graph, ctx, lastVertexRenderInfo);
      for (const element of sortedResult) {
        if (isVertex(element) && isExistsId(state.graph, element.id)) {
          state.focus = element.id;
          return;
        }
      }
    }
    state.focus = undefined;
  },
};
