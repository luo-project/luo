import type { CommandDefinition } from "../../command";
import { isEdge, isVertex } from "../../graph";

export const def: CommandDefinition = {
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
        message: "vertex.label.text",
      });
      focusElement.label.text = newLabel;
    } else if (isEdge(focusElement)) {
      const newLabel = await ctx.userInput({
        message: "edge.label.text",
      });
      focusElement.label.text = newLabel;
    }
  },
};
