import type { State } from "../state/types";

export type CommandFunction = (state: State) => Promise<void>;

export type CommandDefinition = {
  description?: string;
  // TODO deep readonly
  available?: (state: State) => boolean;
  func: CommandFunction;
};
