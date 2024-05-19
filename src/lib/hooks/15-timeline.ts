import type { HookDefinition } from "../hook";
import { pushTimeline } from "../timeline";
// @ts-ignore
import _ from "lodash-es";

export const def: HookDefinition = {
  func(state, config, ctx) {
    if (ctx.command.skipTimeline) {
      return;
    }
    if (!_.isEqual(state.graph, ctx.previousState.graph)) {
      pushTimeline(ctx.previousState.graph, state.timeline.graph, true);
    }
    if (
      state.graphFocus !== undefined &&
      !_.isEqual(state.graphFocus, ctx.previousState.graphFocus)
    ) {
      pushTimeline(ctx.previousState.graphFocus, state.timeline.graphFocus, true);
    }
    if (!_.isEqual(state.choice, ctx.previousState.choice)) {
      pushTimeline(ctx.previousState.choice, state.timeline.choice, true);
    }
  },
};
