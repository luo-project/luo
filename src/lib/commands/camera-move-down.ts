import { VIEWPORT_PAN_AMOUNT } from "../constants";
import type { CommandMetadata, State } from "../types";

export const meta: CommandMetadata = {
  description: "Change viewport.",
};

export function func(state: State) {
  state.viewport.y -= VIEWPORT_PAN_AMOUNT;
}
