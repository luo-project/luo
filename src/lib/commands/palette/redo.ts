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
    state.pallete = popTimeline(state.pallete, state.timeline.pallete, false);
  },
};
