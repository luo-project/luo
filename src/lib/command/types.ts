import type { State } from "../state/types";

export type CommandFunction = (state: State) => Promise<void>;
export type CommandCondition = "never";

export type CommandDefinition = {
  description?: string;
  conditions?: CommandCondition[];
  func: CommandFunction;
};
