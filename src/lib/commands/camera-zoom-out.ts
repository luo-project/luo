import { VIEWPORT_ZOOM_AMOUNT } from "../constants";
import type { CommandMetadata, State } from "../types";
import { clampZoom } from "../state";

export const meta: CommandMetadata = {
  description: "Change viewport.",
};

export function func(state: State) {
  state.viewport.zoom -= VIEWPORT_ZOOM_AMOUNT;
  clampZoom(state);
}
