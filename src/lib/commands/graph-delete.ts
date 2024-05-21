import type { CommandDefinition } from "../command";
import { isEdge, isVertex, sortByDistance } from "../graph";
import { isExistsId } from "../graph-index";
import { def as focus_undo } from "./focus-undo";

export const def: CommandDefinition = {
  description: "Add vertex to graph.",
  available(state) {
    if (!state.graphFocus) {
      return "No focus.";
    }
    if (state.graph.elements.filter(isVertex).length === 1) {
      return "Cannot delete last vertex.";
    }
    return true;
  },
  func(state, config, ctx) {
    const focus = state.graphFocus!;
    const focusElement = ctx.graphIndex(state.graph).any(focus);
    if (isVertex(focusElement)) {
      const renderInfo = ctx.graphRenderInfo.vertex(focusElement.id);
      const inboundEdges = state.graph.elements.filter(
        (e) => isEdge(e) && e.target === focus,
      );
      const outboundEdges = state.graph.elements.filter(
        (e) => isEdge(e) && e.source === focus,
      );
      if (inboundEdges.length == 1 && outboundEdges.length == 1) {
        // Current Focus is Single Bridge Vertex.
        // So Connect existing edges for convenience.
        const inboundEdge = inboundEdges[0];
        const outboundEdge = outboundEdges[0];
        if (isEdge(inboundEdge) && isEdge(outboundEdge)) {
          inboundEdge.target = outboundEdge.target;
          state.graph.elements = state.graph.elements.filter(
            (e) => e.id !== outboundEdge.id,
          );
        }
      } else {
        // delete all edges connected to focus vertex.
        state.graph.elements = state.graph.elements.filter(
          (e) => !(isEdge(e) && (e.source === focus || e.target === focus)),
        );
      }

      // delete focus vertex.
      state.graph.elements = state.graph.elements.filter((e) => e.id !== focus);

      focus_undo.func(state, config, ctx);
      if (state.graphFocus === undefined || !isExistsId(state.graph, state.graphFocus)) {
        state.graphFocus = sortByDistance(state, ctx, focusElement)[0].id;
      }
    } else if (isEdge(focusElement)) {
    }
  },
};
