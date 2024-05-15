import type { Config } from "./config";
import type { State } from "./state";

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
  },
  graphHistory: {
    graphs: [],
  },
  graphPallete: {
    nextId: 5,
  },
  viewport: { x: 0, y: 0, zoom: 1 },
  selections: [],
};

export const DEFAULT_CONFIG: Config = {
  graph: {
    animation: 100,
  },
  viewport: {
    animation: 0,
    pan: {
      amount: {
        x: 200,
        y: 200,
      },
    },
    zoom: {
      amount: 0.4,
      min: 0.33,
      max: 3,
    },
  },
  command: {
    keybinding: {
      "1": "no-op",
      arrowleft: "viewport-pan-left",
      arrowright: "viewport-pan-right",
      arrowup: "viewport-pan-up",
      arrowdown: "viewport-pan-down",
      "c-arrowup": "viewport-zoom-in",
      "c-arrowdown": "viewport-zoom-out",
    },
  },
};

export const PROD = import.meta.env.MODE === "production";
