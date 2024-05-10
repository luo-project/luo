import type { State } from "../../state/types";

export const description = "This is sample command with id `smaple-qwer`";

export async function func(state: State) {
  state.camera.x += 1;
}
