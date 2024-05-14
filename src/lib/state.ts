import { MAX_ZOOM, MIN_ZOOM } from "./constants";
import type { State } from "./types";

export function clampZoom(state: State) {
  if (state.viewport.zoom < MIN_ZOOM) {
    state.viewport.zoom = MIN_ZOOM;
  }
  if (state.viewport.zoom > MAX_ZOOM) {
    state.viewport.zoom = MAX_ZOOM;
  }
}
