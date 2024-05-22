import type { CommandDefinition } from "../command";
import { isEdge, isVertex, sortByDistance } from "../graph";
import { isExistsId } from "../graph-index";
import { def as focus_undo } from "./focus-undo";

export const def: CommandDefinition = {
  description: "Edit label of the focused element.",
  available(state) {
    if (!state.graphFocus) {
      return "No focus.";
    }
    return true;
  },
  func(state, config, ctx) {
    const focus = state.graphFocus!;
    const focusElement = ctx.graphIndex(state.graph).any(focus);
    if (isVertex(focusElement)) {
      const newLabel = prompt("Enter new label for the vertex", focusElement.label);
      if (newLabel !== null) {
        focusElement.label = newLabel;
      }
    } else if (isEdge(focusElement)) {
      const newLabel = prompt("Enter new label for the edge", focusElement.label);
      if (newLabel !== null) {
        focusElement.label = newLabel;
      }
    }
  },
};
