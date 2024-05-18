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
            shape: "round-rectangle",
            text: "1Start",
            body: {
              x: 0,
              y: 0,
              w: 100,
              h: 60,
            },
          },
          {
            id: 2,
            shape: "rectangle",
            text: "2Input password",
            body: {
              x: 0,
              y: 0,
              w: 300,
              h: 60,
            },
          },
          {
            id: 3,
            shape: "rectangle",
            text: "3Create a pass_length variable that is equal to 0",
            body: {
              x: 0,
              y: 0,
              w: 300,
              h: 60,
            },
          },
          {
            id: 4,
            shape: "rectangle",
            text: "4Create a contains_number variable that is set to False",
            body: {
              x: 0,
              y: 0,
              w: 300,
              h: 60,
            },
          },
          {
            id: 5,
            shape: "diamond",
            text: "5Has the entire password been searched?",
            body: {
              x: 0,
              y: 0,
              w: 350,
              h: 200,
            },
          },
          {
            id: 6,
            shape: "rectangle",
            text: "6Iterate to the next character in password",
            body: {
              x: 0,
              y: 0,
              w: 300,
              h: 60,
            },
          },

          {
            id: 7,
            shape: "rectangle",
            text: "7Increase pass_length",
            body: {
              x: 0,
              y: 0,
              w: 300,
              h: 60,
            },
          },
          {
            id: 8,
            shape: "diamond",
            text: "8Is the current character a number?",
            body: {
              x: 0,
              y: 0,
              w: 300,
              h: 100,
            },
          },
          {
            id: 9,
            shape: "rectangle",
            text: "9Set contains_number to True",
            body: {
              x: 0,
              y: 0,
              w: 300,
              h: 100,
            },
          },
          {
            id: 10,
            shape: "diamond",
            text: "10Is pass_length greater than 8 and is contain_number equal to True?",
            body: {
              x: 0,
              y: 0,
              w: 350,
              h: 200,
            },
          },
          {
            id: 11,
            shape: "round-rectangle",
            text: "11Invalid password",
            body: {
              x: 0,
              y: 0,
              w: 300,
              h: 60,
            },
          },
          {
            id: 12,
            shape: "round-rectangle",
            text: "12Valid password",
            body: {
              x: 0,
              y: 0,
              w: 300,
              h: 60,
            },
          },
        ],
        edges: [
          { id: 20, from: 1, to: 2 },
          { id: 21, from: 2, to: 3 },
          { id: 22, from: 3, to: 4 },
          { id: 23, from: 4, to: 5 },
          { id: 24, from: 5, to: 6, text: "No", weight: 1 },
          { id: 25, from: 6, to: 7 },
          { id: 26, from: 7, to: 8 },
          { id: 27, from: 8, to: 9 },
          { id: 97, from: 5, to: 10, text: "Yes" },
          { id: 28, from: 8, to: 5, text: "No" },
          { id: 29, from: 9, to: 5, text: "Yes" },
          { id: 90, from: 10, to: 11, text: "No" },
          { id: 91, from: 10, to: 12, text: "Yes" },
        ],
        layout: "dagre",
      },
    ],
  },
  graphPallete: {
    nextId: 10,
    vertexShape: "rectangle",
  },
  viewport: { x: 0, y: 0, zoom: 0.5 },
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
