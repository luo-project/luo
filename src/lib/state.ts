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

export type StateReference = Record<string | symbol, any>;

/**
 * StateFunc is a middleware for state mutation flow.
 * StateFunc can(should) mutate `state` argument.
 */
export type StateFunc = (
  state: State,
  config: Readonly<Config>,
  ref: StateReference,
) => Promise<void> | void;

export async function useRef<T>(
  ref: StateReference,
  key: string | symbol,
  init: () => Promise<T> | T,
): Promise<T> {
  if (ref[key] === undefined) {
    ref[key] = await init();
  }
  return ref[key];
}
