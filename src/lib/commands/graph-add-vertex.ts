import type { CommandDefinition } from "../command";
import { Edge, isEdge, isVertex } from "../graph";

export const def: CommandDefinition = {
  description: "Add vertex to graph.",
  available(state) {
    //always available
    return true;
  },
  func(state, config, ctx) {
    const nextId = state.graphPallete.nextId;
    const focus = state.graphFocus!;
    const focusElement = ctx.graphIndex(state.graph).any(focus);

    if (isVertex(focusElement)) {
      state.graph.elements.push({
        t: "e",
        id: nextId.toString(),
        source: focus,
        target: (nextId + 1).toString(),
      });
      state.graph.elements.push({
        t: "v",
        id: (nextId + 1).toString(),
        shape: state.graphPallete.vertexShape,
        label: state.graphPallete.vertexLabel,
      });
    } else if (isEdge(focusElement)) {
      state.graph.elements.push({
        t: "e",
        id: nextId.toString(),
        source: (nextId + 1).toString(),
        target: focusElement.target,
      });
      focusElement.target = (nextId + 1).toString();
      state.graph.elements.push({
        t: "v",
        id: (nextId + 1).toString(),
        shape: state.graphPallete.vertexShape,
        label: state.graphPallete.vertexLabel,
      });

      const focusIndex = state.graph.elements.findIndex((e) => e.id === focusElement.id);
      state.graph.elements[focusIndex] = focusElement;
    }
  },
};
