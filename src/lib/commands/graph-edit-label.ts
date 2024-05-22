import type { CommandDefinition } from "../command";
import { isEdge, isVertex } from "../graph";
import { userInput } from "../user-input";

export const def: CommandDefinition = {
  description: "Edit label of the focused element.",
  available(state) {
    if (!state.graphFocus) {
      return "No focus.";
    }
    return true;
  },
  async func(state, config, ctx) {
    const focus = state.graphFocus!;
    const focusElement = ctx.graphIndex(state.graph).any(focus);
    if (isVertex(focusElement)) {
      const newLabel = await userInput({
        message: "Enter new label for the vertex",
        type: "string",
      });
      if (newLabel !== null) {
        focusElement.label = newLabel;
      }
    } else if (isEdge(focusElement)) {
      const newLabel = await userInput({
        message: "Enter new label for the edge",
        type: "string",
      });
      if (newLabel !== null) {
        focusElement.label = newLabel;
      }
    }
  },
};
