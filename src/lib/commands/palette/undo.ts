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
    state.pallete = popTimeline(state.pallete, state.timeline.pallete, true);
  },
};
