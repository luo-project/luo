import { loadCommands } from "../src/lib/command/utils";
import { expect, test } from "vitest";

test("loadCommands", () => {
  const cmds = loadCommands();
  for (const id in cmds) {
    expect(id).toBeTypeOf("string");
    expect(cmds[id]).toBeTypeOf("object");
    expect(cmds[id].func).toBeTypeOf("function");
  }
});
