import type { Config } from "./config";
import type { State } from "./state";

export const DEFAULT_STATE: State = {
  graph: {
    current: 0,
    snapshots: [
      {
        elements: [
          {
            t: "v",
            id: "1",
            shape: "rect",
            label: "Vertex 1",
          },
          {
            t: "v",
            id: "2",
            shape: "circle",
            label: "22222222222222222",
          },
          {
            t: "e",
            id: "3",
            source: "1",
            target: "2",
            label: "1->2 edge",
          },
        ],
      },
    ],
  },
  graphPallete: {
    nextId: 10,
    vertexShape: "rect",
  },
  viewport: { x: 100, y: 50, zoom: 0.5 },
  graphCursor: "3",
};

export const DEFAULT_CONFIG: Config = {
  graph: {
    animation: 200,
  },
  viewport: {
    animation: 200,
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
      "c-z": "graph-undo",
      "c-s-z": "graph-redo",
      q: "cursor-iterate-subtree",
    },
  },
};

export const PROD = import.meta.env.MODE === "production";
