import type { KeyBinding } from "./keybinding";
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
  graphHistory: {
    graphs: [],
  },
  viewport: { x: 0, y: 0, zoom: 1 },
  selections: [],
};

export const DEFAULT_KEYBINDING: KeyBinding = {
  "no-op": { key: "1", ctrl: false, shift: false },
  "camera-move-left": { key: "arrowleft", ctrl: false, shift: false },
  "camera-move-right": { key: "arrowright", ctrl: false, shift: false },
  "camera-move-up": { key: "arrowup", ctrl: false, shift: false },
  "camera-move-down": { key: "arrowdown", ctrl: false, shift: false },
  "camera-zoom-in": { key: "arrowup", ctrl: true, shift: false },
};

export const PROD = import.meta.env.MODE === "production";

export const ANIMATION_DURATION = 20;
export const VIEWPORT_PAN_AMOUNT = 200;
export const VIEWPORT_ZOOM_AMOUNT = 0.4;
export const MIN_ZOOM = 0.3;
export const MAX_ZOOM = 3;
