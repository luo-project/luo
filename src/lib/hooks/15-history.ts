import { getCurrentCommand } from "../command";
import type { HookDefinition } from "../hook";
import { deepCopy } from "../utils";

export const def: HookDefinition = {
  func(state) {
    if (getCurrentCommand().dumpGraphSnapshot !== true) {
      return;
    }

    // 새롭게 snapshot을 만드는 경우.
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
