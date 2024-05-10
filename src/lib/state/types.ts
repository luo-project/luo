export type GraphElementId = number;

export interface GraphElement {
  id: GraphElementId;
  text?: string;
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

export type History = State[];
