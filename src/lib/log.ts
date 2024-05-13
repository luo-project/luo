export type LogLevel = "trace" | "debug" | "info" | "warn" | "error";
const minLevel = import.meta.env.MODE === "production" ? 2 : 0;

type LevelDef = {
  i: number;
  func: any;
};

const levels: Record<LogLevel, LevelDef> = {
  trace: {
    i: 0,
    func: console.trace,
  },
  debug: {
    i: 1,
    func: console.debug,
  },
  info: {
    i: 2,
    func: console.info,
  },
  warn: {
    i: 3,
    func: console.warn,
  },
  error: {
    i: 4,
    func: console.error,
  },
};

export function log(level: LogLevel, ...data: any[]) {
  const { i, func } = levels[level];
  if (i < minLevel) {
    return;
  }
  func(...data);
}
