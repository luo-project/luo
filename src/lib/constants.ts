import type { Config } from "./config";
import type { VertexShape } from "./graph";
import type { KeybindingData } from "./keybinding";
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
  timelines: {
    graph: [[], []],
    focus: [[], []],
    choices: [[], []],
    pallete: [[], []],
  },
  viewport: { x: 0, y: 0, zoom: 0.3 },
  focus: "5",
  choices: [],
  pallete: {
    defaultVertex: { shape: "rectangle" },
    defaultEdge: {},
    defaultLabel: {
      text: "",
    },
  },
  registers: {
    focus: {},
    choices: {},
    viewport: {},
    pallete: {},
  },
};

export const DEFAULT_CONFIG: Config = {
  graph: {
    animation: 300,
    timelineSize: 20,
    focusTimelineSize: 10,
    choiceTimelineSize: 10,
    collisionSize: 50,
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
      amount: 0.5,
      min: 0.1,
      max: 3,
    },
  },
  keyTimeout: 800,
};

export const VERTEX_SHAPES: VertexShape[] = ["rectangle", "circle", "ellipse", "diamond"];

export const DEFAULT_KEYBINDING_Data: KeybindingData = [
  { keys: [{ key: "h" }], id: "focus/vertex/left" },
  { keys: [{ key: "j" }], id: "focus/vertex/down" },
  { keys: [{ key: "k" }], id: "focus/vertex/up" },
  { keys: [{ key: "l" }], id: "focus/vertex/right" },
  { keys: [{ key: "H" }], id: "viewport/pan-left" },
  { keys: [{ key: "J" }], id: "viewport/pan-down" },
  { keys: [{ key: "K" }], id: "viewport/pan-up" },
  { keys: [{ key: "L" }], id: "viewport/pan-right" },
  { keys: [{ key: "p" }], id: "viewport/zoom-out" },
  { keys: [{ key: "P" }], id: "viewport/zoom-in" },
  { keys: [{ key: "y" }], id: "focus/vertex/iterate-choices" },
  { keys: [{ key: "Y" }], id: "focus/iterate-subtree" },
  { keys: [{ key: "u" }], id: "focus/edge/target" },
  { keys: [{ key: "U" }], id: "focus/edge/source" },
  { keys: [{ key: "Enter" }], id: "graph/set-label" },
  { keys: [{ key: "f" }], id: "choices/toggle-focus" },
  { keys: [{ key: "g" }], id: "choices/add-all" },
  { keys: [{ key: "G" }], id: "choices/delete-all" },
  { keys: [{ key: "t" }], id: "graph/delete-focus" },
  { keys: [{ key: "T" }], id: "graph/delete-choices" },
  { keys: [{ key: "a" }], id: "graph/vertex/add" },
  { keys: [{ key: "s" }], id: "graph/vertex/iterate-shape" },
  { keys: [{ key: "A" }], id: "graph/edge/add" },
  { keys: [{ key: "Enter", ctrl: true }], id: "pallete/set-label" },
  { keys: [{ key: "z" }, { key: "q" }], id: "viewport/yank" },
  { keys: [{ key: "z" }, { key: "w" }], id: "viewport/unyank" },
  { keys: [{ key: "x" }, { key: "q" }], id: "focus/yank" },
  { keys: [{ key: "x" }, { key: "w" }], id: "focus/unyank" },
  { keys: [{ key: "x" }, { key: "e" }], id: "focus/undo" },
  { keys: [{ key: "x" }, { key: "r" }], id: "focus/redo" },
  { keys: [{ key: "c" }, { key: "q" }], id: "choices/yank" },
  { keys: [{ key: "c" }, { key: "w" }], id: "choices/unyank" },
  { keys: [{ key: "c" }, { key: "e" }], id: "choices/undo" },
  { keys: [{ key: "c" }, { key: "r" }], id: "choices/redo" },
  { keys: [{ key: "v" }, { key: "e" }], id: "graph/undo" },
  { keys: [{ key: "v" }, { key: "r" }], id: "graph/redo" },
  { keys: [{ key: "b" }, { key: "q" }], id: "pallete/yank" },
  { keys: [{ key: "b" }, { key: "w" }], id: "pallete/unyank" },
  { keys: [{ key: "b" }, { key: "e" }], id: "pallete/undo" },
  { keys: [{ key: "g" }, { key: "r" }], id: "pallete/redo" },
];

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

export const UNREACHABLE = "unreachable" as any;
