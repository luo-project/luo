import type { Config } from "./config";
import type { State } from "./state";

export const DEFAULT_STATE: State = {
  graph: {
    elements: [
      {
        t: "v",
        id: "1",
        shape: "rect",
        label: "1 Start",
      },
      {
        t: "v",
        id: "2",
        shape: "rect",
        label: "2 Input password",
      },
      {
        t: "v",
        id: "3",
        shape: "rect",
        label: "3 Create a pass_length variable that is equal to 0",
      },
      {
        t: "v",
        id: "4",
        shape: "rect",
        label: "4 Create a contains_number variable that is set to False",
      },
      {
        t: "v",
        id: "5",
        shape: "diamond",
        label: "5 Has the entire password been searched?",
      },
      {
        t: "v",
        id: "6",
        shape: "rect",
        label: "6 Iterate to the next character in password",
      },

      {
        t: "v",
        id: "7",
        shape: "rect",
        label: "7 Increase pass_length",
      },
      {
        t: "v",
        id: "8",
        shape: "diamond",
        label: "8 Is the current character a number?",
      },
      {
        t: "v",
        id: "9",
        shape: "rect",
        label: "9 Set contains_number to True",
      },
      {
        t: "v",
        id: "10",
        shape: "diamond",
        label: "10 Is pass_length greater than 8 and is contain_number equal to True?",
      },
      {
        t: "v",
        id: "11",
        shape: "rect",
        label: "11 Invalid password",
      },
      {
        t: "v",
        id: "12",
        shape: "rect",
        label: "12 Valid password",
      },
      {
        t: "e",
        id: "20",
        source: "1",
        target: "2",
      },
      {
        t: "e",
        id: "21",
        source: "2",
        target: "3",
      },
      {
        t: "e",
        id: "22",
        source: "3",
        target: "4",
      },
      {
        t: "e",
        id: "23",
        source: "4",
        target: "5",
      },
      {
        t: "e",
        id: "24",
        source: "5",
        target: "6",
        label: "No",
      },
      {
        t: "e",
        id: "25",
        source: "6",
        target: "7",
      },
      {
        t: "e",
        id: "26",
        source: "7",
        target: "8",
      },
      {
        t: "e",
        id: "27",
        source: "8",
        target: "9",
      },
      {
        t: "e",
        id: "97",
        source: "5",
        target: "10",
        label: "Yes",
      },
      {
        t: "e",
        id: "28",
        source: "8",
        target: "5",
        label: "No",
      },
      {
        t: "e",
        id: "29",
        source: "9",
        target: "5",
        label: "Yes",
      },
      {
        t: "e",
        id: "90",
        source: "10",
        target: "11",
        label: "No",
      },
      {
        t: "e",
        id: "91",
        source: "10",
        target: "12",
        label: "Yes",
      },
    ],
  },
  timeline: {
    graph: [[], []],
    graphFocus: [[], []],
  },
  graphPallete: {
    nextId: 10,
    vertexShape: "rect",
  },
  viewport: { x: 100, y: 50, zoom: 0.5 },
  graphFocus: "5",
};

export const DEFAULT_CONFIG: Config = {
  graph: {
    animation: 200,
    timelineSize: 100,
    focusTimelineSize: 100,
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
      q: "focus-iterate-subtree",
      w: "focus-undo",
      e: "focus-redo",
    },
  },
};

export const PROD = import.meta.env.MODE === "production";
