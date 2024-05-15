import type { HookDefinition } from "../hook";
import { State } from "../state";
import { deepCopy } from "../utils";

export const def: HookDefinition = {
  func(state: State, config) {
    if (state.graph.current < state.graph.snapshots.length - 1) {
      // remove future snapshots
      state.graph.snapshots = state.graph.snapshots.slice(0, state.graph.current + 1);
    }
    // add new snapshot
    let currentSnapshot = deepCopy(state.graph.snapshots[state.graph.current]);
    state.graph.snapshots.push(currentSnapshot);
    state.graph.current = state.graph.snapshots.length - 1;
  },
};
