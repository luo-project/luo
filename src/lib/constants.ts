import type { Config } from "./config";
import type { Keybinding } from "./keymap";
import type { State } from "./state";

export const DEFAULT_STATE: State = {
  graph: {
    elements: [
      {
        t: "v",
        id: "1",
        shape: "rectangle",
        label: { text: "1 Start" },
      },
      {
        t: "v",
        id: "2",
        shape: "rectangle",
        label: { text: "2 Input password" },
      },
      {
        t: "v",
        id: "3",
        shape: "rectangle",
        label: { text: "3 Create a pass_length variable that is equal to 0" },
      },
      {
        t: "v",
        id: "4",
        shape: "rectangle",
        label: { text: "4 Create a contains_number variable that is set to False" },
      },
      {
        t: "v",
        id: "5",
        shape: "diamond",
        label: { text: "5 Has the entire password been searched?" },
      },
      {
        t: "v",
        id: "6",
        shape: "rectangle",
        label: { text: "6 Iterate to the next character in password" },
      },

      {
        t: "v",
        id: "7",
        shape: "rectangle",
        label: { text: "7 Increase pass_length" },
      },
      {
        t: "v",
        id: "8",
        shape: "diamond",
        label: { text: "8 Is the current character a number?" },
      },
      {
        t: "v",
        id: "9",
        shape: "rectangle",
        label: { text: "9 Set contains_number to True" },
      },
      {
        t: "v",
        id: "10",
        shape: "diamond",
        label: {
          text: "10 Is pass_length greater than 8 and is contain_number equal to True?",
        },
      },
      {
        t: "v",
        id: "11",
        shape: "rectangle",
        label: { text: "11 Invalid password" },
      },
      {
        t: "v",
        id: "12",
        shape: "rectangle",
        label: { text: "12 Valid password" },
      },
      {
        t: "e",
        id: "20",
        source: "1",
        target: "2",
        label: { text: "" },
      },
      {
        t: "e",
        id: "21",
        source: "2",
        target: "3",
        label: { text: "" },
      },
      {
        t: "e",
        id: "22",
        source: "3",
        target: "4",
        label: { text: "" },
      },
      {
        t: "e",
        id: "23",
        source: "4",
        target: "5",
        label: { text: "" },
      },
      {
        t: "e",
        id: "24",
        source: "5",
        target: "6",
        label: { text: "No" },
      },
      {
        t: "e",
        id: "25",
        source: "6",
        target: "7",
        label: { text: "" },
      },
      {
        t: "e",
        id: "26",
        source: "7",
        target: "8",
        label: { text: "" },
      },
      {
        t: "e",
        id: "27",
        source: "8",
        target: "9",
        label: { text: "" },
      },
      {
        t: "e",
        id: "97",
        source: "5",
        target: "10",
        label: { text: "Yes" },
      },
      {
        t: "e",
        id: "28",
        source: "8",
        target: "5",
        label: { text: "No" },
      },
      {
        t: "e",
        id: "29",
        source: "9",
        target: "5",
        label: { text: "Yes" },
      },
      {
        t: "e",
        id: "90",
        source: "10",
        target: "11",
        label: { text: "No" },
      },
      {
        t: "e",
        id: "91",
        source: "10",
        target: "12",
        label: { text: "Yes" },
      },
    ],
  },
  timeline: {
    graph: [[], []],
    focus: [[], []],
    choices: [[], []],
  },
  viewport: { x: 0, y: 0, zoom: 0.3 },
  focus: "5",
  choices: ["1"],
  defaultEdge: {},
  defaultLabel: {
    text: "",
  },
  defaultVertex: { shape: "rectangle" },
  register: {
    focus: {},
    choices: {},
    defaultVertex: {},
    defaultEdge: {},
    defaultLabel: {},
  },
};

export const DEFAULT_CONFIG: Config = {
  graph: {
    animation: 200,
    timelineSize: 20,
    focusTimelineSize: 10,
    choiceTimelineSize: 10,
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
      amount: 0.2,
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
      h: "focus-move-left",
      j: "focus-move-down",
      k: "focus-move-up",
      l: "focus-move-right",
      c: "choice-add-focus",
      "c-c": "choice-delete-focus",
      d: "choice-redo",
      "c-d": "choice-undo",
      z: "focus-prev",
      x: "focus-next",
      delete: "choice-clear",
      g: "graph-add-vertex",
    },
    "focus-move": {
      gap: 100,
    },
  },
};

export const DEFAULT_KEYBINDING: Keybinding = {
  H: "viewport-pan-left",
  J: "viewport-pan-down",
  K: "viewport-pan-up",
  L: "viewport-pan-right",
  "ctrl-j": "viewport-zoom-in",
  "ctrl-k": "viewport-zoom-out",
  z: "graph-undo",
  Z: "graph-redo",
  f: "no-op",
  "f z": "focus-undo",
  "f Z": "focus-redo",
  h: "focus-move-left",
  j: "focus-move-down",
  k: "focus-move-up",
  l: "focus-move-right",
  o: "focus-prev",
  O: "focus-next",
  "c f": "choice-add-focus",
  "c F": "choice-delete-focus",
  "c z": "choice-undo",
  "c Z": "choice-redo",
  "c d": "choice-clear",
  "g a": "graph-add-vertex",
  "ctrl-a": "choice-all",
  Delete: "graph-delete",
  "ctrl-Enter": "graph-edit-label",
  "ctrl-Insert": "graph-add-edge",
};

export const PROD = import.meta.env.MODE === "production";

export const VALID_KEYS = new Set([
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "Space",
  "Enter",
  "Tab",
  "Delete",
  "Insert",
  ":",
  ";",
  "'",
  '"',
  "[",
  "]",
  "{",
  "}",
  "|",
  "\\",
  "-",
  "_",
  "=",
  "+",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "/",
  "?",
  "`",
  "~",
]);
