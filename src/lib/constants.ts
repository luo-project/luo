import type { State } from "./state/types";

export const DEFAULT_STATE: State = {
  graph: {
    vertices: [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
    edges: [
      {
        id: 3,
        from: 1,
        to: 2,
      },
    ],
    nextId: 100,
  },
  camera: { x: 0, y: 0, zoom: 1 },
  history: {
    index: -1,
    items: [],
  },
  selections: [],
};

export const PROD = import.meta.env.MODE === "production";
