import type { Config } from "./config";
import type { State } from "./state";

export const DEFAULT_STATE: State = {
  graph: {
    current: 0,
    snapshots: [
      {
        vertices: [
          {
            id: 1,
            shape: "rectangle",
            body: {
              x: 60,
              y: 60,
              w: 80,
              h: 150,
            },
            text: "askdjfalksdjf laksjdflas",
          },
          {
            id: 2,
            shape: "triangle",
          },
          {
            id: 3,
            shape: "ellipse",
            body: {
              x: 3,
              y: 3,
              w: 80,
              h: 30,
            },
          },
          {
            id: 4,
            shape: "round-rectangle",
          },
          {
            id: 5,
            shape: "round-triangle",
          },
          {
            id: 10,
            shape: "diamond",
          },
        ],
        edges: [
          {
            id: 6,
            from: 1,
            to: 2,
          },
          {
            id: 7,
            from: 2,
            to: 3,
          },
          {
            id: 8,
            from: 3,
            to: 4,
          },
        ],
      },
    ],
  },
  graphPallete: {
    nextId: 10,
    vertexShape: "rectangle",
  },
  viewport: { x: 0, y: 0, zoom: 1 },
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
      "c-z": "graph-undo",
      "c-s-z": "graph-redo",
    },
  },
};

export const PROD = import.meta.env.MODE === "production";
