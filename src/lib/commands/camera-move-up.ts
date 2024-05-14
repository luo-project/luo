import { VIEWPORT_PAN_AMOUNT } from "../constants";
import type { State } from "../types";
import type { CommandMetadata } from "../types";

export const meta: CommandMetadata = {
  description: "Change viewport.",
};

export function func(state: State) {
  state.viewport.y += VIEWPORT_PAN_AMOUNT;
}
