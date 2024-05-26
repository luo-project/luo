import type { CommandDefinition } from "../../command";
import { hasTimeline, popTimeline } from "../../timeline";

export const def: CommandDefinition = {
  skipTimeline: true,
  available(state) {
    if (hasTimeline(state.timeline.graph, false)) {
      return true;
    }
    return "No history.";
  },
  func(state) {
    state.graph = popTimeline(state.graph, state.timeline.graph, false);
  },
};
