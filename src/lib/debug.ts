import { logger } from "./log";
import { deepCopy } from "./utils";

const l = logger("record");
let recordId = 0;
export function makeRecord(name: string, enable: boolean, max = 50) {
  if (!enable) {
    return () => {};
  }
  const id = recordId++;

  l.debug(`===== Recording '${name}' into 'window.__record_${id}`);
  const arr: { time: number; message: string; data: any; stackTrace?: string }[] = [];

  (window as any)[`__record_${id}`] = arr;

  return (message: string, data: any) => {
    arr.push({
      message,
      data: deepCopy(data),
      time: Date.now(),
      stackTrace: new Error().stack,
    });
    if (arr.length > max) {
      arr.shift();
    }
  };
}
