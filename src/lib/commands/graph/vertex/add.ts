import type { CommandDefinition } from "../../../command";
import { isEdge, isVertex } from "../../../graph";
import { deepCopy } from "../../../utils";

export const def: CommandDefinition = {
  description: "Add vertex to graph.",
  func(state, config, ctx) {
    const focus = state.focus!;
    const focusElement = ctx.graphIndex(state.graph).any(focus);

    if (isVertex(focusElement)) {
      const newEdgeId = ctx.nextId().toString();
      const newVertexId = ctx.nextId().toString();
      state.graph.elements.push({
        ...deepCopy(state.pallete.defaultEdge),
        t: "e",
        id: newEdgeId,
        source: focus,
        target: newVertexId,
        label: deepCopy(state.pallete.defaultLabel),
      });
      state.graph.elements.push({
        ...deepCopy(state.pallete.defaultVertex),
        t: "v",
        id: newVertexId,
        label: deepCopy(state.pallete.defaultLabel),
      });
    } else if (isEdge(focusElement)) {
      const newVertexId = ctx.nextId().toString();
      const newEdgeId = ctx.nextId().toString();
      state.graph.elements.push({
        ...deepCopy(state.pallete.defaultEdge),
        t: "e",
        id: newEdgeId,
        source: newVertexId,
        target: focusElement.target,
        label: deepCopy(state.pallete.defaultLabel),
      });
      focusElement.target = newVertexId.toString();
      state.graph.elements.push({
        ...deepCopy(state.pallete.defaultVertex),
        t: "v",
        id: newVertexId.toString(),
        label: deepCopy(state.pallete.defaultLabel),
      });

      const focusIndex = state.graph.elements.findIndex((e) => e.id === focusElement.id);
      state.graph.elements[focusIndex] = focusElement;
    }
  },
};
