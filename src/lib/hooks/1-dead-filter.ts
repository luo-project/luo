import type { HookDefinition } from "../hook";

export const def: HookDefinition = {
  func(state, config, ctx) {
    const graphIndex = ctx.graphIndex(state.graph);
    state.choices = state.choices.filter((id) => {
      return graphIndex.has(id);
    });
    if (!state.focus || !graphIndex.has(state.focus)) {
      state.focus = state.graph.elements.find((element) => element.t === "v")?.id;
    }
  },
};
