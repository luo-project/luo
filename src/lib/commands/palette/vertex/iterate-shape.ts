import type { CommandDefinition } from "../../../command";
import { VERTEX_SHAPES } from "../../../constants";

export const def: CommandDefinition = {
  func(state, config, ctx) {
    const shapeIndex = VERTEX_SHAPES.indexOf(state.palette.vertex.shape);
    const nextShapeIndex = (shapeIndex + 1) % VERTEX_SHAPES.length;
    state.palette.vertex.shape = VERTEX_SHAPES[nextShapeIndex];
  },
};
