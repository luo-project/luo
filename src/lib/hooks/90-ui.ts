import type { HookDefinition } from "../hook";

export const def: HookDefinition = {
  async func(state, config, ctx) {
    const r: Record<string, string> = {};
    ctx.commands.forEach((cmd) => {
      if (!cmd.available) {
        return;
      }
      const result = ctx.availableCommands[cmd.id];
      if (result === true) {
        return;
      }
      r[cmd.id] = result;
    });
    const lines: string[] = [];
    lines.push(`<pre>${JSON.stringify(r, null, 2)}</pre>`);
    lines.push(`<pre>${JSON.stringify(state, null, 2)}</pre>`);
    lines.push(`<pre>${JSON.stringify(config, null, 2)}</pre>`);
    document.getElementById("tempindicator")!.innerHTML = lines.join("<br/>");
  },
};
