import type { CommandDefinition } from "../../command";
import { isExistsId } from "../../graph-index";
import { hasTimeline, popTimeline } from "../../timeline";
import { Pallete } from "../../state";

export const def: CommandDefinition = {
  skipTimeline: true,
  available(state) {
    if (hasTimeline(state.timeline.pallete, false)) {
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
    let result = popTimeline(pallete, state.timeline.pallete, false);
    state.defaultVertex = result.DefaultVertex;
    state.defaultEdge = result.DefaultEdge;
    state.defaultLabel = result.DefaultLabel;
  },
};
