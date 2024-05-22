import {
  ElkSvg,
  type ElkSvgEdge,
  type ElkSvgElement,
  type ElkSvgLabel,
  type ElkSvgNode,
} from "elk-svg";
import ElkConstructor from "elkjs";
import { type Graph, type GraphElement } from "./graph";
import { logger } from "./log";
import type { EdgeRenderInfo, GraphRenderInfo, VertexRenderInfo } from "./state";
import { deepCopy } from "./utils";
import { calcTextSize } from "./dom";

const MIN_W = 100;
const MIN_H = 100;
const l = logger("elk");

// LayoutOptions from https://github.com/kieler/elkjs/issues/21
const elk = new ElkConstructor({
  defaultLayoutOptions: {
    "elk.algorithm": "layered",
    "elk.direction": "RIGHT",
    "spacing.nodeNode": 50,
    "layered.spacing.nodeNodeBetweenLayers": 80,
    "elk.edgeLabels.inline": true,
    "elk.edgeRouting": "ORTHOGONAL",
    "elk.nodeLabels.placement": "H_CENTER V_CENTER INSIDE",
    "spacing.portPort": "100",
    "nodeSize.constraints": "PORTS  NODE_LABELS MINIMUM_SIZE",
  } as any,
});
const elkSvg = new ElkSvg({
  container: document.getElementById("svg")!,
  logger: logger("elk-svg"),
  classnames: {
    topLevelGroup: "top-level-group",
    group: "group",
    nodeGroup: "node-group",
    nodeComponent: "node-component",
    edgeGroup: "edge-group",
    edgeComponent: "edge-component",
    edgeLine: "edge-line",
    edgeArrow: "edge-arrow",
    portGroup: "port-group",
    portComponent: "port-component",
    labelGroup: "label-group",
    labelComponent: "label-component",
  },
});

const ROOT = "root";
const LABEL = "label";

type T = {
  v: ElkSvgNode;
  e: ElkSvgEdge;
};

function convertGraph(g: Graph, cb: <K extends keyof T>(e: T[K], n: K) => void) {
  const rootNode: ElkSvgNode = {
    id: ROOT,
    children: [],
    edges: [],
    svg: {},
    layoutOptions: {
      "elk.direction": "DOWN",
      "elk.layered.crossingMinimization.strategy": "INTERACTIVE",
    },
  };

  const minSize = `${MIN_W},${MIN_H}`;
  g.elements.forEach((e) => {
    const label = makeLabel(e);
    const labels = label ? [label] : undefined;
    if (e.t === "v") {
      const width = Math.max(label ? label.width : 0, MIN_W);
      const height = Math.max(label ? label.height : 0, MIN_H);
      const node: ElkSvgNode = {
        id: e.id,
        svg: {
          shape: e.shape,
        },
        labels,
        width,
        height,
        layoutOptions: {
          "nodeSize.minimum": minSize,
        },
      };
      rootNode.children!.push(node);
      cb(node, e.t);
      return;
    }

    const edge = {
      id: e.id,
      sources: [e.source],
      targets: [e.target],
      svg: {
        arrow: "normal",
        arrowSize: 6,
      },
      labels,
    };
    rootNode.edges!.push(edge);
    cb(edge, e.t);
  });

  return rootNode;
}

export async function render(
  g: Graph,
  focus: string | undefined,
  choices: Set<string>,
): Promise<GraphRenderInfo> {
  const classesMap = new Map<string, string[]>();
  if (focus) {
    classesMap.set(focus, ["focus"]);
  }
  choices.forEach((choice) => {
    if (classesMap.has(choice)) {
      classesMap.get(choice)!.push("choice");
      return;
    }
    classesMap.set(choice, ["choice"]);
  });
  l.debug("classesMap", classesMap);

  const nRef = new Set<ElkSvgNode>();
  const eRef = new Set<ElkSvgEdge>();

  const node = convertGraph(g, (e, n) => {
    e.svg!.classes = classesMap.get(e.id);
    const ref = n ? nRef : eRef;
    ref.add(e as any);
  });
  l.debug("convertedNode", deepCopy(node));
  await elk.layout(node);
  elkSvg.render(node);

  let vInfo: Map<string, VertexRenderInfo> | null = null;
  let eInfo: Map<string, EdgeRenderInfo> | null = null;

  const vertices = () => {
    if (vInfo) {
      return vInfo;
    }
    vInfo = new Map();
    nRef.forEach((elkNode) => {
      vInfo!.set(elkNode.id, {
        x: elkNode.x!,
        y: elkNode.y!,
        height: elkNode.height!,
        width: elkNode.width!,
      });
    });
    return vInfo;
  };

  const edges = () => {
    if (eInfo) {
      return eInfo;
    }
    eInfo = new Map();
    eRef.forEach((elkEdge) => {
      eInfo!.set(elkEdge.id, {});
    });
    return eInfo;
  };

  return {
    width: node.width!,
    height: node.height!,
    vertices,
    edges,
    vertex: (id) => {
      const r = vertices().get(id);
      if (r) {
        return r;
      }
      throw new Error(`no RenderInfor for vertex ${id}`);
    },
    edge: (id) => {
      const r = edges().get(id);
      if (r) {
        return r;
      }
      throw new Error(`no RenderInfor for edge ${id}`);
    },
  };
}

function makeLabel(e: GraphElement) {
  if (!e.label) {
    return undefined;
  }
  const [width, height] = calcTextSize(e.label);
  return { id: LABEL + e.id, text: e.label, width, height };
}
