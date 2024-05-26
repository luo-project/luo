import type { CommandDefinition } from "../../command";
import { isExistsId } from "../../graph-index";
import { hasTimeline, popTimeline } from "../../timeline";

export const def: CommandDefinition = {
  skipTimeline: true,
  available(state) {
    if (state.focus !== undefined && hasTimeline(state.timeline.focus, false)) {
      return true;
    }
    return "No history.";
  },
  func(state) {
    let result = popTimeline(state.focus, state.timeline.focus, false);
    while (hasTimeline(state.timeline.focus, true) || isExistsId(state.graph, result)) {
      //delete last element of redo history
      state.timeline.focus[0].pop();

      result = popTimeline(state.focus, state.timeline.focus, false);
    }
    state.focus = result;
    if (state.focus === undefined) {
      state.focus = state.graph.elements[0].id;
    }
  },
};
