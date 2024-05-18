import type { DeepReadonly } from "ts-essentials";
import type { CommandDefinitionWithId } from "./command";
import type { Config } from "./config";
import type { GraphCursor, Graph, GraphPallete } from "./graph";
import type { GraphIndex } from "./graph-index";

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
  ctx: GlobalContext,
) => Promise<void> | void;

export type GlobalContext = {
  command: CommandDefinitionWithId;
  commands: CommandDefinitionWithId[];
  graphIndex: GraphIndex;
  graphRenderInfo: GraphRenderInfo;
};

export type GraphRenderInfo = {
  width: number;
  height: number;
  vertex: (id: string) => { x: number; y: number; width: number; height: number };
  edge: (id: string) => {};
};
