import type { CommandDefinition } from "../command";
import { isExistsId } from "../graph-index";
import { hasTimeline, popTimeline } from "../timeline";

export const def: CommandDefinition = {
  skipTimeline: true,
  available(state) {
    if (state.focus !== undefined && hasTimeline(state.timeline.focus, true)) {
      return true;
    }
    return "No history.";
  },
  func(state) {
    let result = popTimeline(state.focus, state.timeline.focus, true);
    while (hasTimeline(state.timeline.focus, true) || isExistsId(state.graph, result)) {
      //delete last element of redo history
      state.timeline.focus[1].pop();

      result = popTimeline(state.focus, state.timeline.focus, true);
    }
    state.focus = result;
    if (state.focus === undefined) {
      state.focus = state.graph.elements[0].id;
    }
  },
};
