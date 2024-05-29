import ElkConstructor from "elkjs";
import { calcTextSize } from "./dom";
import { type Graph, type GraphElement } from "./graph";
import { logger } from "./log";
import type { EdgeRenderInfo, GraphRenderInfo, VertexRenderInfo } from "./state";
import { deepCopy } from "./utils";
import { initElkSvg, type InputEdge, type InputNode } from "elk-svg";
0;
const MIN_W = 100;
const MIN_H = 100;
const PAD_W = 40;
const PAD_H = 40;
const l = logger("elk");

// LayoutOptions from https://github.com/kieler/elkjs/issues/21
const elk = new ElkConstructor({
  defaultLayoutOptions: {
    "elk.algorithm": "layered",
    "elk.direction": "DOWN",
    "elk.edgeLabels.inline": true,
    "elk.edgeRouting": "ORTHOGONAL",
    "spacing.nodeNode": 50,
    "spacing.edgeNode": 50,
    "layered.spacing.nodeNodeBetweenLayers": 50,
    "elk.layered.spacing.edgeEdgeBetweenLayers": 25,
    "elk.layered.spacing.edgeNodeBetweenLayers": 25,
    "elk.layered.unnecessaryBendpoints": true,
    "elk.nodeLabels.placement": "H_CENTER V_CENTER INSIDE",
    "spacing.portPort": "100",
    "nodeSize.constraints": "PORTS MINIMUM_SIZE",
    "elk.layered.directionCongruency": "ROTATION",
  } as any,
});

const elkSvg = initElkSvg({
  container: document.getElementById("svg")!,
  logger: logger("elk-svg"),
  classPrefix: "",
});

const ROOT = "root";
const LABEL = "label";

type T = {
  v: InputNode;
  e: InputEdge;
};

function convertGraph(g: Graph, cb: <K extends keyof T>(e: T[K], n: K) => void) {
  const rootNode: InputNode = {
    id: ROOT,
    children: [],
    edges: [],
    svg: {},
    layoutOptions: {},
  };

  g.elements.forEach((e) => {
    const label = makeLabel(e);
    const labels = label ? [label] : undefined;
    if (e.t === "v") {
      let width = Math.max(label ? label.width + PAD_W : 0, MIN_W);
      let height = Math.max(label ? label.height + PAD_H : 0, MIN_H);

      // todo
      if (e.shape === "diamond") {
        width *= 1.2;
        height *= 1.1;
      }

      const minSize = `${width},${height}`;
      const node: InputNode = {
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
    const edge: InputEdge = {
      id: e.id,
      sources: [e.source],
      targets: [e.target],
      svg: {
        arrow: {
          shape: "arrow-normal",
          size: 10,
          thickness: 1,
        },
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

  const nRef = new Set<InputNode>();
  const eRef = new Set<InputEdge>();

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
  if (e.label.text === "") {
    return;
  }
  const [width, height] = calcTextSize(e.label.text);
  return { id: LABEL + e.id, text: e.label.text, width, height };
}
