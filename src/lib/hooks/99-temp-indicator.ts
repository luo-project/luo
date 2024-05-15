import type { HookDefinition } from "../hook";

export const def: HookDefinition = {
  async func(state, config) {
    const lines: string[] = [];
    lines.push(`<pre>${JSON.stringify(state, null, 2)}</pre>`);
    lines.push(`<pre>${JSON.stringify(config, null, 2)}</pre>`);
    document.getElementById("tempindicator")!.innerHTML = lines.join("<br/>");
  },
};
