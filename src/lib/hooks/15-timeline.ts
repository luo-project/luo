import type { HookDefinition } from "../hook";
import { pushTimeline } from "../timeline";
import { deepEquals } from "../utils";

export const def: HookDefinition = {
  func(state, config, ctx) {
    if (ctx.command.skipTimeline) {
      return;
    }
    if (!deepEquals(state.graph, ctx.previousState.graph)) {
      pushTimeline(ctx.previousState.graph, state.timelines.graph, true);
    }
    if (state.focus !== undefined && !deepEquals(state.focus, ctx.previousState.focus)) {
      pushTimeline(ctx.previousState.focus, state.timelines.focus, true);
    }
    if (!deepEquals(state.choices, ctx.previousState.choices)) {
      pushTimeline(ctx.previousState.choices, state.timelines.choices, true);
    }

    if (!deepEquals(state.palette, ctx.previousState.palette)) {
      pushTimeline(ctx.previousState.palette, state.timelines.palette, true);
    }
  },
};
