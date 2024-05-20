import type { CommandDefinition } from "../command";
import { Edge, isEdge, isVertex } from "../graph";

export const def: CommandDefinition = {
  description: "Add vertex to graph.",
  available(state) {
    //always available
    return true;
  },
  func(state, config, ctx) {
    const focus = state.graphFocus!;
    const focusElement = ctx.graphIndex(state.graph).any(focus);

    if (isVertex(focusElement)) {
      const newEdgeId = ctx.nextId().toString();
      const newVertexId = ctx.nextId().toString();
      state.graph.elements.push({
        t: "e",
        id: newEdgeId,
        source: focus,
        target: newVertexId,
      });
      state.graph.elements.push({
        t: "v",
        id: newVertexId,
        shape: state.graphPallete.vertexShape,
        label: state.graphPallete.vertexLabel,
      });
    } else if (isEdge(focusElement)) {
      const newVertexId = ctx.nextId().toString();
      const newEdgeId = ctx.nextId().toString();
      state.graph.elements.push({
        t: "e",
        id: newEdgeId,
        source: newVertexId,
        target: focusElement.target,
      });
      focusElement.target = newVertexId.toString();
      state.graph.elements.push({
        t: "v",
        id: newVertexId.toString(),
        shape: state.graphPallete.vertexShape,
        label: state.graphPallete.vertexLabel,
      });

      const focusIndex = state.graph.elements.findIndex((e) => e.id === focusElement.id);
      state.graph.elements[focusIndex] = focusElement;
    }
  },
};
