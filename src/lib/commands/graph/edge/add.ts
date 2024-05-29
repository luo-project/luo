import type { CommandDefinition } from "../../../command";
import { Edge, isVertex } from "../../../graph";
import { deepCopy } from "../../../utils";

export const def: CommandDefinition = {
  available(state, config, ctx) {
    const focus = state.focus!;
    if (!focus) {
      return "No focus.";
    }
    const graph = state.graph as any;
    const focusElement = ctx.graphIndex(graph).any(focus);

    if (state.choices.length !== 1) {
      return "Choices must be 1.";
    }
    const choiceElement = ctx.graphIndex(graph).any(state.choices[0]);

    if (state.choices.length !== 1 && !isVertex(choiceElement)) {
      return "Choice is must be a vertex.";
    }

    if (!isVertex(focusElement)) {
      return "Focus is must be a vertex.";
    }
    return true;
  },
  func(state, config, ctx) {
    const focus = state.focus!;
    // add edge
    const edge: Edge = {
      t: "e",
      id: ctx.nextId().toString(),
      source: state.choices[0],
      target: focus,
      label: { text: "" },
    };
    state.graph.elements.push(edge);
  },
};
