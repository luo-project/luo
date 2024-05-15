import type { DeepReadonly } from "ts-essentials";

export type GraphElementId = number;

export interface GraphElement {
  id: GraphElementId;
  text?: string;
}

export interface Vertex extends GraphElement {
  parent?: GraphElementId;
  position?: {
    x: number;
    y: number;
  };
}

export interface Edge extends GraphElement {
  from: GraphElementId;
  to: GraphElementId;
}

export type Graph = {
  vertices: Vertex[];
  edges: Edge[];
};

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

export type GraphHistory = {
  index?: number;
  graphs: Graph[];
};

export type GraphPallete = {
  nextId: GraphElementId;
};

export type CommandFunction = (state: State) => Promise<void>;
export type CommandMetadata = {
  description?: string;
};
export type CommandDefinition = {
  meta?: CommandMetadata;
  available?: (state: DeepReadonly<State>) =>
    | {
        reason?: string;
        result: boolean;
      }
    | boolean;
  func: CommandFunction;
};
export type CommandDefinitionWithId = CommandDefinition & { id: string };

export type HookFunc = (state: State) => Promise<void>;
export type HookDefinition = {
  func: HookFunc;
};
export type HookDefinitionWithId = HookDefinition & { id: string };
