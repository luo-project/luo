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

export type GraphHistory = {
  index?: number;
  graphs: Graph[];
};

export type GraphPallete = {
  nextId: GraphElementId;
};
