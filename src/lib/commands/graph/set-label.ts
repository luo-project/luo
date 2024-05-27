import type { CommandDefinition } from "../../command";
import { isEdge, isVertex } from "../../graph";

export const def: CommandDefinition = {
  description: "Edit label of the focused element.",
  available(state) {
    if (!state.focus) {
      return "No focus.";
    }
    return true;
  },
  async func(state, config, ctx) {
    const focus = state.focus!;
    const focusElement = ctx.graphIndex(state.graph).any(focus);
    if (isVertex(focusElement)) {
      const newLabel = await ctx.userInput({
        message: "Enter new label for the vertex",
      });
      focusElement.label.text = newLabel;
    } else if (isEdge(focusElement)) {
      const newLabel = await ctx.userInput({
        message: "Enter new label for the edge",
      });
      focusElement.label.text = newLabel;
    }
  },
};
