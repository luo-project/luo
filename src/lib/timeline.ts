import type { DeepReadonly } from "ts-essentials";
import { deepCopy } from "./utils";
import type { State } from "./state";
import type { CommandDefinition } from "./command";

export type Timeline<T> = [T[], T[]];

function getStack<T>(t: Timeline<T>, undo: boolean): T[] {
  if (undo) {
    return t[0];
  }
  return t[1];
}

function hasTimeline(t: DeepReadonly<Timeline<any>>, undo: boolean) {
  return getStack(t as Timeline<any>, undo).length > 0;
}

export function pushTimeline<T>(v: T, t: Timeline<T>, undo: boolean) {
  const s = getStack(t, undo);
  s.push(deepCopy(v));
  if (undo) {
    const s2 = getStack(t, !undo);
    s2.length = 0;
  }
}

function popTimeline<T>(v: T, t: Timeline<T>, undo: boolean) {
  const s = getStack(t, undo);
  const s2 = getStack(t, !undo);
  const e = s.pop()!;
  s2.push(deepCopy(v));
  return deepCopy(e);
}

export function makeUndoCommand(name: keyof State["timelines"]): CommandDefinition {
  return {
    skipTimeline: true,
    available(state) {
      if (hasTimeline(state.timelines[name], true)) {
        return true;
      }
      return `no '${name}' to undo.`;
    },
    func(state) {
      // @ts-ignore
      state[name] = popTimeline(state[name], state.timelines[name], true);
    },
  };
}

export function makeRedoCommand(name: keyof State["timelines"]): CommandDefinition {
  return {
    skipTimeline: true,
    available(state) {
      if (hasTimeline(state.timelines[name], false)) {
        return true;
      }
      return `no '${name}' to redo.`;
    },
    func(state) {
      // @ts-ignore
      state[name] = popTimeline(state[name], state.timelines[name], false);
    },
  };
}
