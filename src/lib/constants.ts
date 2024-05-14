import type { State } from "./types";

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
  viewport: { x: 0, y: 0, zoom: 1 },
  history: {
    index: -1,
    items: [],
  },
  selections: [],
};

export const PROD = import.meta.env.MODE === "production";

export const ANIMATION_DURATION = 20;
export const VIEWPORT_PAN_AMOUNT = 200;
export const VIEWPORT_ZOOM_AMOUNT = 0.4;
export const MIN_ZOOM = 0.3;
export const MAX_ZOOM = 3;
