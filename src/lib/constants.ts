import type { Config } from "./config";
import type { VertexShape } from "./graph";
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
    viewport: {},
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
    collisionSize: 50,
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
};
export const VERTEX_SHAPES: VertexShape[] = ["rectangle", "circle", "ellipse", "diamond"];

export const DEFAULT_KEYBINDING: Keybinding = {
  h: "focus/vertex/left",
  j: "focus/vertex/down",
  k: "focus/vertex/up",
  l: "focus/vertex/right",
  H: "viewport/pan-left",
  J: "viewport/pan-down",
  K: "viewport/pan-up",
  L: "viewport/pan-right",
  p: "viewport/zoom-out",
  P: "viewport/zoom-in",
  Enter: "graph/set-label",
  "ctrl-Enter": "pallete/set-label",
  f: "choices/toogle-focus",
  g: "choices/add-all",
  G: "choices/delete-all",
  t: "graph/delete-focus",
  a: "graph/vertex/add",
  A: "graph/edge/add",
  s: "graph/iterate-subtree",
  "z q": "viewport/yank",
  "z w": "viewport/unyank",

  "x q": "focus/yank",
  "x w": "focus/unyank",
  "x e": "focus/undo",
  "x r": "focus/redo",

  "c q": "choices/yank",
  "c w": "choices/unyank",
  "c e": "choices/undo",
  "c r": "choices/redo",

  "v e": "graph/undo",
  "v r": "graph/redo",

  "b q": "pallete/yank",
  "b w": "pallete/unyank",
  "b e": "pallete/undo",
  "g r": "pallete/redo",

  y: "focus/iterate-choices",
  Y: "focus/iterate-subtree",
  u: "focus/edge/target",
  U: "focus/edge/source",
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
