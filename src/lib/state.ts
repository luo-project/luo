import type { DeepReadonly } from "ts-essentials";
import type { CommandDefinitionWithId } from "./command";
import type { Config } from "./config";
import type { Focus, Graph, DefaultVertex, DefaultEdge, DefaultLabel } from "./graph";
import type { GraphIndex } from "./graph-index";
import type { Timeline } from "./timeline";
import type { Choices } from "./choices";
import type { Register } from "./register";

export type Viewport = {
  x: number;
  y: number;
  zoom: number;
};

export type Pallete = {
  defaultVertex: DefaultVertex;
  defaultEdge: DefaultEdge;
  defaultLabel: DefaultLabel;
};
/**
 * State is serializable object for load/mutate/save entire application state.
 */
export type State = {
  graph: Graph;
  focus?: Focus;
  choices: Choices;
  viewport: Viewport;
  pallete: Pallete;

  register: {
    focus: Register<Focus>;
    choices: Register<Choices>;
    viewport: Register<Viewport>;
    defaultVertex: Register<DefaultVertex>;
    defaultEdge: Register<DefaultEdge>;
    defaultLabel: Register<DefaultLabel>;
  };

  timeline: {
    graph: Timeline<Graph>;
    focus: Timeline<Focus>;
    choices: Timeline<Choices>;
    pallete: Timeline<Pallete>;
  };
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
  nextId: () => number;
  graphRenderInfo: GraphRenderInfo;
  previousState: DeepReadonly<State>;
  availableCommands: Record<string, string | true>;
};

export type GraphRenderInfo = {
  width: number;
  height: number;

  vertex: (id: string) => VertexRenderInfo;
  vertices: () => Map<string, VertexRenderInfo>;

  edge: (id: string) => EdgeRenderInfo;
  edges: () => Map<string, EdgeRenderInfo>;
};

export type VertexRenderInfo = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type EdgeRenderInfo = {};
