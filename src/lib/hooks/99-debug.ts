import type { HookDefinition } from "../hook";

const id = "____DEUBG___POS";
export const def: HookDefinition = {
  dev: true,
  async func(state, config, ctx) {
    let g = document.getElementById(id)! as any as SVGGElement;
    if (!g) {
      g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      document.querySelector("g.top-level-group")!.append(g);
    }
    ctx.graphRenderInfo.vertices().forEach((v) => {
      const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
      if (v.x || v.y) {
        const x = Math.round(v.x);
        const y = Math.round(v.y);
        const w = Math.round(v.width);
        const h = Math.round(v.height);

        t.textContent = `[${x}, ${y}] (${w}, ${h})`;
        t.setAttribute("transform", `translate(${v.x}, ${v.y})`);
        t.setAttribute("dominant-baseline", "hanging");
        t.style.fontSize = "9px";
        g.append(t);
      }
    });
  },
};
