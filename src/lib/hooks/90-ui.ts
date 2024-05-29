import type { HookDefinition } from "../hook";
import { setSidePanelPalette, setSidePanelRegisters } from "../side-panel";

export const def: HookDefinition = {
  async func(state, config) {
    const lines: string[] = [];
    setSidePanelPalette(state.palette);
    setSidePanelRegisters(state.registers);
  },
};
