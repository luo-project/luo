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

const fontRenderDiv = document.createElement("div");
fontRenderDiv.setAttribute("id", "font-render-div");
fontRenderDiv.style.position = "absolute";
fontRenderDiv.style.visibility = "hidden";
fontRenderDiv.style.left = "0";
fontRenderDiv.style.top = "0";
fontRenderDiv.style.width = "auto";
fontRenderDiv.style.height = "auto";
fontRenderDiv.style.whiteSpace = "nowrap";
fontRenderDiv.style.zIndex = "-9999";
document.body.appendChild(fontRenderDiv);

export function calcTextSize(
  text: string,
  fontSize?: number,
): [width: number, height: number] {
  if (fontSize) {
    fontRenderDiv.style.fontSize = fontSize.toString() + "px";
  } else {
    fontRenderDiv.style.removeProperty("font-size");
  }
  fontRenderDiv.textContent = text;
  const box = fontRenderDiv.getBoundingClientRect();
  return [box.width, box.height];
}
