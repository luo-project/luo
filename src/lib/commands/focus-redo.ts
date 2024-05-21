import type { CommandDefinition } from "../command";
import { isExistsId } from "../graph-index";
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
    let result = popTimeline(state.graphFocus, state.timeline.graphFocus, false);
    while (
      hasTimeline(state.timeline.graphFocus, true) ||
      isExistsId(state.graph, result)
    ) {
      //delete last element of redo history
      state.timeline.graphFocus[0].pop();

      result = popTimeline(state.graphFocus, state.timeline.graphFocus, false);
    }
    state.graphFocus = result;
    if (state.graphFocus === undefined) {
      state.graphFocus = state.graph.elements[0].id;
    }
  },
};
