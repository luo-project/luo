export type GraphElementId = number;

export interface GraphElement {
  id: GraphElementId;
  text?: string;
  position?: {
    x: number;
    y: number;
  };
}

export interface Vertex extends GraphElement {
  parent?: GraphElementId;
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

export type Camera = {
  x: number;
  y: number;
  zoom: number;
};

export type Selection = GraphElementId[];

export type Cursor = GraphElementId;

export type State = {
  graph: Graph;
  camera: Camera;
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
