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
            text: "Vertex no.1",
            body: {
              x: 0,
              y: 0,
              w: 200,
              h: 200,
            },
          },
          {
            id: 2,
            shape: "triangle",
            text: "2",
            body: {
              x: 0,
              y: 0,
              w: 100,
              h: 100,
            },
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
            text: "3",
          },
          {
            id: 4,
            shape: "round-rectangle",
            text: "I have a very very very very very very very very very very very very long single line text.",
          },
          {
            id: 5,
            shape: "round-triangle",
          },
          {
            id: 10,
            shape: "diamond",
            text: "First line.\nSecond line\nLine 3\n444444444444444444444444",
          },
        ],
        edges: [
          {
            id: 6,
            from: 1,
            to: 2,
            text: "1-2",
          },
          {
            id: 7,
            from: 2,
            to: 3,
            text: "2-3",
          },
          {
            id: 8,
            from: 3,
            to: 4,
            text: "3-4",
          },
        ],
        layout: "dagre",
      },
    ],
  },
  graphPallete: {
    nextId: 10,
    vertexShape: "rectangle",
  },
  viewport: { x: 0, y: 0, zoom: 1 },
  graphCursor: 3,
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
      q: "cursor-iterate-subtree",
    },
  },
};

export const PROD = import.meta.env.MODE === "production";
