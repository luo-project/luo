import svgPanZoom from "svg-pan-zoom";
import type { Config } from "./config";
import { logger } from "./log";
import type { Viewport } from "./state";
import { deepCopy, deepEquals } from "./utils";

const svgContainer = document.getElementById("svg")! as any as SVGElement;
const style = document.createElement("style");
document.body.appendChild(style);

export function setSvgAnimation(cfg: Config) {
  let textContent = "";
  const css = (v: string) => {
    textContent += v + "\n";
  };
  css("/* dynamic css by luo/src/lib/svg.ts */");
  // TODO
  // separate viewport/graph animations
  if (cfg.graph.animation > 0) {
    css("g.top-level-group * {");
    css(`transition: all ${cfg.graph.animation}ms ease`);
    css("}");
  }
  if (cfg.viewport.animation > 0) {
    css("g.top-level-group {");
    css(`transition: all ${cfg.viewport.animation}ms ease`);
    css("}");
  }
  style.textContent = textContent;
}

let panZoom: SvgPanZoom.Instance = null as any;
let realZoom = 0;

const l = logger("panzoom");
let lastViewport: Viewport | null = null;
export function setSvgViewport(v: Viewport) {
  if (lastViewport !== null) {
    if (deepEquals(lastViewport, v)) {
      return;
    }
  }
  if (panZoom === null) {
    panZoom = svgPanZoom(svgContainer, {
      controlIconsEnabled: false,
      mouseWheelZoomEnabled: false,
      panEnabled: false,
      zoomEnabled: false,
      dblClickZoomEnabled: false,
      minZoom: 0.0001,
      maxZoom: 10000,
      preventMouseEventsDefault: false,
    });
    const sizes = panZoom.getSizes();
    l.debug(sizes);
    realZoom = sizes.realZoom;
  }

  let sizes = panZoom.getSizes();
  panZoom.zoom(1);
  panZoom.center();
  panZoom.pan({ x: v.x, y: v.y });
  panZoom.zoomAtPoint(v.zoom / realZoom, {
    x: v.x + sizes.width / 2,
    y: v.y + sizes.height / 2,
  });
  sizes = panZoom.getSizes();
  if (Math.abs(sizes.realZoom - v.zoom) > 0.001) {
    l.error("FALLACY");
  }
  lastViewport = deepCopy(v);
}
