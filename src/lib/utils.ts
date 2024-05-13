export function deepCopy<T>(v: T): T {
  return structuredClone(v);
}
