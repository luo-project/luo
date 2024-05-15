import type { DeepReadonly } from "ts-essentials";
import type { CommandDefinitionWithId } from "./command";
import type { Config } from "./config";
import type { GraphCursor, Graph, GraphPallete } from "./graph";

export type Viewport = {
  x: number;
  y: number;
  zoom: number;
};

/**
 * State is serializable object for load/mutate/save entire application state.
 */
export type State = {
  graph: Graph;
  graphPallete: GraphPallete;
  graphCursor?: GraphCursor;
  viewport: Viewport;
};

/**
 * StateFunc is a middleware for state mutation flow.
 * StateFunc can(should) mutate `state` argument.
 */
export type StateFunc = (
  state: State,
  config: DeepReadonly<Config>,
  ctx: DeepReadonly<StateFuncContext>,
) => Promise<void> | void;

export type StateFuncContext = {
  command: CommandDefinitionWithId;
  commands: CommandDefinitionWithId[];
};
