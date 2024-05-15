import type { State } from "../types";
import type { CommandMetadata } from "../types";

export const meta: CommandMetadata = {
  description: "Do nothing.",
};

export function func(state: State) {}
