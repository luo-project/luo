import type { State } from "../../state/types";
import { sampleGraphUtilityFunction } from "../../state/graph-utils";

export const description = "This is sample command with id `smaple-asdf`";

export async function func(state: State) {
  state.graph.vertices.push(sampleGraphUtilityFunction(state.graph));
}
