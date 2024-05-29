import type { CommandDefinition } from "../../../command";
import { isEdge, isVertex } from "../../../graph";

export const def: CommandDefinition = {
  func(state, config, ctx) {
    const focus = state.focus;
    if (!focus) {
      state.graph.elements.push({
        t: "v",
        id: ctx.nextId().toString(),
        label: { text: "" },
        shape: "rectangle",
      });
      return;
    }
    const focusElement = ctx.graphIndex(state.graph).any(focus);

    if (isVertex(focusElement)) {
      const newEdgeId = ctx.nextId().toString();
      const newVertexId = ctx.nextId().toString();
      state.graph.elements.push({
        t: "e",
        id: newEdgeId,
        source: focus,
        target: newVertexId,
        label: { text: "" },
      });
      state.graph.elements.push({
        t: "v",
        id: newVertexId,
        label: { text: "" },
        shape: "rectangle",
      });
    } else if (isEdge(focusElement)) {
      const newVertexId = ctx.nextId().toString();
      const newEdgeId = ctx.nextId().toString();
      state.graph.elements.push({
        t: "e",
        id: newEdgeId,
        source: newVertexId,
        target: focusElement.target,
        label: { text: "" },
      });
      focusElement.target = newVertexId.toString();
      state.graph.elements.push({
        t: "v",
        id: newVertexId.toString(),
        label: { text: "" },
        shape: "rectangle",
      });

      const focusIndex = state.graph.elements.findIndex((e) => e.id === focusElement.id);
      state.graph.elements[focusIndex] = focusElement;
    }
  },
};
