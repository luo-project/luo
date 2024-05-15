import type { Config } from "./config";
import type { Graph, GraphElementId, GraphHistory, GraphPallete } from "./graph";

export type Viewport = {
  x: number;
  y: number;
  zoom: number;
};

export type Selection = GraphElementId[];

export type Cursor = GraphElementId;

export type State = {
  graph: Graph;
  graphHistory: GraphHistory;
  graphPallete: GraphPallete;
  viewport: Viewport;
  selections: Selection[];
  cursor?: Cursor;
};

export type StateContext = Record<string, any>;

export type StateFunc = (
  state: State,
  config: Readonly<Config>,
  ctx: StateContext,
) => Promise<void> | void;
