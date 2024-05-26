export type Register<T> = Record<string, T>;

export function yank<T>(register: Register<T>, key: string, target: T) {
  register[key] = target;
}

export function unyank<T>(register: Register<T>, key: string) {
  return register[key];
}
