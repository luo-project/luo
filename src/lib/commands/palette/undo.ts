import type { CommandDefinition } from "../../command";
import { isExistsId } from "../../graph-index";
import type { Pallete } from "../../state";
import { hasTimeline, popTimeline } from "../../timeline";

export const def: CommandDefinition = {
  skipTimeline: true,
  available(state) {
    if (hasTimeline(state.timeline.pallete, true)) {
      return true;
    }
    return "No history.";
  },
  func(state) {
    let pallete: Pallete = {
      DefaultVertex: state.defaultVertex,
      DefaultEdge: state.defaultEdge,
      DefaultLabel: state.defaultLabel,
    };
    let result = popTimeline(pallete, state.timeline.pallete, true);
    state.defaultVertex = result.DefaultVertex;
    state.defaultEdge = result.DefaultEdge;
    state.defaultLabel = result.DefaultLabel;
  },
};
