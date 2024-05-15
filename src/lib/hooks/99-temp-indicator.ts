import type { State } from "../types";

export async function func(state: State) {
  const lines: string[] = [];
  lines.push(`<pre>${JSON.stringify(state, null, 2)}</pre>`);
  document.getElementById("tempindicator")!.innerHTML = lines.join("<br/>");
}
