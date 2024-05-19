import type { CommandDefinition } from "../command";
import { hasTimeline, popTimeline } from "../timeline";

export const def: CommandDefinition = {
  available(state) {
    if (hasTimeline(state.timeline.graph, true)) {
      return true;
    }
    return "No history.";
  },
  func(state) {
    state.graph = popTimeline(state.graph, state.timeline.graph, true);
  },
};
