import type { CommandDefinition } from "../command";
import { hasTimeline, popTimeline } from "../timeline";

export const def: CommandDefinition = {
  skipTimeline: true,
  available(state) {
    if (hasTimeline(state.timeline.choice, true)) {
      return true;
    }
    return "No history.";
  },
  func(state) {
    state.choice = popTimeline(state.choice, state.timeline.choice, true);
  },
};
