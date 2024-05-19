import type { HookDefinition } from "../hook";
import { pushTimeline } from "../timeline";

export const def: HookDefinition = {
  func(state, config, ctx) {
    if (ctx.command.modifyGraph === true) {
      pushTimeline(ctx.previousState.graph, state.timeline.graph, true);
    }
    if (ctx.command.modifyGraphFocus === true && state.graphFocus !== undefined) {
      pushTimeline(ctx.previousState.graphFocus, state.timeline.graphFocus, true);
    }
  },
};
