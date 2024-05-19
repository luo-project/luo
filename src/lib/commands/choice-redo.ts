import type { CommandDefinition } from "../command";
import { hasTimeline, popTimeline } from "../timeline";

export const def: CommandDefinition = {
  available(state) {
    if (hasTimeline(state.timeline.choice, false)) {
      return true;
    }
    return "No history.";
  },
  func(state) {
    state.choice = popTimeline(state.choice, state.timeline.choice, false);
  },
};
