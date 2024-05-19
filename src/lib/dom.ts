export function preventClose() {
  window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
    return "confirm";
  });
}

export function select(s: string) {
  const e = document.querySelector(s);
  if (!e) {
    throw new Error(`no ${s}`);
  }
  return e;
}
