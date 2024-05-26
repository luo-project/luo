import type { CommandDefinition } from "../../command";
import { VERTEX_SHAPES } from "../../constants";
import { Edge, GraphElement, isEdge, isVertex } from "../../graph";

export const def: CommandDefinition = {
  description: "Change vertex's default shape.",
  func(state, config, ctx) {
    const defaultVertexShape = state.defaultVertex.shape;
    const shapeIndex = VERTEX_SHAPES.indexOf(defaultVertexShape);
    const nextShapeIndex = (shapeIndex + 1) % VERTEX_SHAPES.length;
    state.defaultVertex.shape = VERTEX_SHAPES[nextShapeIndex];
  },
};
