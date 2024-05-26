import type { CommandDefinition } from "../../command";
import { hasTimeline, popTimeline } from "../../timeline";

export const def: CommandDefinition = {
  skipTimeline: true,
  available(state) {
    if (hasTimeline(state.timeline.choices, true)) {
      return true;
    }
    return "No history.";
  },
  func(state) {
    state.choices = popTimeline(state.choices, state.timeline.choices, true);
  },
};
