import type { CommandDefinition } from "../command";
import { hasTimeline, popTimeline } from "../timeline";

export const def: CommandDefinition = {
  skipTimeline: true,
  available(state) {
    if (state.graphFocus !== undefined && hasTimeline(state.timeline.graphFocus, false)) {
      return true;
    }
    return "No history.";
  },
  func(state) {
    state.graphFocus = popTimeline(state.graphFocus, state.timeline.graphFocus, false);
  },
};
