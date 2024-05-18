import * as dagred3 from "dagre-d3-es";
import * as d3 from "d3";
import { isVertex, type GraphSnapshot } from "./graph";
import type { GraphRenderInfo, Viewport } from "./state";
import svgPanZoom from "svg-pan-zoom";
import { logger } from "./log";
import type { Config } from "./config";

const render = new (dagred3 as any).render();
const svg = document.getElementById("svg")!;
const inner = document.createElementNS("http://www.w3.org/2000/svg", "g");
svg.append(inner);
const d3Inner = d3.select(inner);
const pl = logger("panzoom");

let panZoom: SvgPanZoom.Instance = null as any;
let realZoom = 0;

export function setAnimation(cfg: Config) {
  // TODO
  // separate viewport/graph animations
  if (cfg.graph.animation > 0) {
  }
  if (cfg.viewport.animation > 0) {
    inner.style.transitionDuration = `${cfg.viewport.animation}ms`;
    inner.style.transitionTimingFunction = "ease";
    inner.style.transitionProperty = "transform";
  }
}

export function renderViewport(v: Viewport) {
  if (panZoom === null) {
    panZoom = svgPanZoom("#svg", {
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
    pl.debug(sizes);
    realZoom = sizes.realZoom;
  }
  panZoom.zoom(v.zoom / realZoom);
  panZoom.pan({ x: v.x, y: v.y });

  const sizes = panZoom.getSizes();
  if (Math.abs(sizes.realZoom - v.zoom) > 0.001) {
    pl.error("FALLACY");
  }
}

export function renderD3(p: { gs: GraphSnapshot; cursor?: string }): GraphRenderInfo {
  const g = new dagred3.graphlib.Graph({
    directed: true,
    multigraph: true,
    compound: true,
  });

  g.setGraph({
    rankdir: "TB",
    align: undefined,
    nodesep: 50,
    edgesep: 10,
    marginx: 0,
    marigny: 0,
    ranksep: 50,
    acyclicer: undefined,
    ranker: "tight-tree",
  });
  removeClass("cursor");
  const edgeIds = new Map<string, [string, string]>();
  for (const e of p.gs.elements) {
    const classes: string[] = ["luo"];
    if (p.cursor && e.id === p.cursor) {
      classes.push("cursor");
    }
    if (isVertex(e)) {
      g.setNode(e.id, { label: e.label, shape: e.shape, class: classes.join(" ") });
      continue;
    }
    g.setEdge(e.source, e.target, { label: e.label, class: classes.join(" ") }, e.id);
    edgeIds.set(e.id, [e.source, e.target]);
  }
  render(d3Inner, g);
  const gg = g.graph();

  return {
    width: gg.width,
    height: gg.height,
    edge: (id) => {
      const [source, from] = edgeIds.get(id)!;
      const e = g.edge(source, from, id);
      return e;
    },
    vertex: (id) => {
      const n = g.node(id);
      const e = n.elem as SVGRectElement;
      const rect = e.querySelector("rect")!;
      const width = parseInt(rect.getAttribute("width")!, 10);
      const height = parseInt(rect.getAttribute("height")!, 10);
      return { x: n.x, y: n.y, width, height };
    },
  };
}

function removeClass(name: string) {
  document.querySelectorAll("#svg ." + name).forEach((e) => {
    e.classList.remove(name);
  });
}
