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
  nextId: GraphElementId;
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
  viewport: Viewport;
  selections: Selection[];
  cursor?: Cursor;
  history: History;
};

export type HistoryItem = Omit<State, "history">;

export type History = {
  index: number;
  items: HistoryItem[];
};

export type StateHookFunc = (state: State) => Promise<void>;

export type StateHook = {
  id: string;
  func: StateHookFunc;
};

export type CommandFunction = (state: State) => Promise<void>;
export type CommandMetadata = {
  description?: string;
  history?: boolean;
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
