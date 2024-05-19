import { PROD } from "./constants";

type Logger = {
  trace(...data: any[]): void;
  debug(...data: any[]): void;
  error(...data: any[]): void;
  warn(...data: any[]): void;
  info(...data: any[]): void;
  time(label?: string): void;
  timeEnd(label?: string): void;
  timeLog(label?: string, ...data: any[]): void;

  /**
   * same as time but works in production mode.
   */
  prodTime(label?: string): void;

  /**
   * same as timeEnd but works in production mode.
   */
  prodTimeEnd(label?: string): void;
};

export function logger(name: string): Logger {
  return {
    trace: prodNoop(varargs(console.trace, name)),
    debug: prodNoop(varargs(console.debug, name)),
    info: wrapOnLog("info", varargs(console.info, name)),
    warn: wrapOnLog("warn", varargs(console.warn, name)),
    error: wrapOnLog("error", varargs(console.error, name)),
    time: prodNoop(single(console.time, name)),
    timeEnd: prodNoop(single(console.timeEnd, name)),
    timeLog: prodNoop(first(console.timeLog, name)),
    prodTime: single(console.time, name),
    prodTimeEnd: wrapOnLog("time", single(console.timeEnd, name)),
  };
}

const noop = () => {};
function prodNoop(v: any) {
  if (PROD) {
    return noop;
  }
  return v;
}

export type OnLog = (level: string, args: any[]) => void;
let onLog: OnLog | null = null;
export function setOnLog(l: OnLog) {
  onLog = l;
}

function wrapOnLog(level: string, cb: any) {
  return (...args: any[]) => {
    if (onLog) {
      onLog(level, args);
    }
    cb(...args);
  };
}

function varargs(m: any, name: string) {
  return (...args: any[]) => {
    m(`[luo][${name}]`, ...args);
  };
}

function single(m: any, name: string) {
  return (arg: string) => {
    m(`[luo][${name}] ${arg}`);
  };
}

function first(m: any, name: string) {
  return (arg: string, ...args: any[]) => {
    m(`[luo][${name}] ${arg}`, ...args);
  };
}
