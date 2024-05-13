import type { DeepReadonly } from "ts-essentials";
import type { State } from "../state/types";

export type CommandFunction = (state: State) => Promise<void>;

export type CommandDefinition = {
  description?: string;
  available?: (state: DeepReadonly<State>) =>
    | {
        reason?: string;
        result: boolean;
      }
    | boolean;
  func: CommandFunction;
};
