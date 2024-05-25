import type { HookDefinition } from "../hook";
import { pushTimeline } from "../timeline";
import { deepEquals } from "../utils";

export const def: HookDefinition = {
  func(state, config, ctx) {
    if (ctx.command.skipTimeline) {
      return;
    }
    if (!deepEquals(state.graph, ctx.previousState.graph)) {
      pushTimeline(ctx.previousState.graph, state.timeline.graph, true);
    }
    if (state.focus !== undefined && !deepEquals(state.focus, ctx.previousState.focus)) {
      pushTimeline(ctx.previousState.focus, state.timeline.focus, true);
    }
    if (!deepEquals(state.choices, ctx.previousState.choices)) {
      pushTimeline(ctx.previousState.choices, state.timeline.choices, true);
    }
  },
};
