import { select } from "./dom";
import type { Keybinding } from "./keymap";

const possibleKeys = select("#possible-keys");
const currentKey = select("#current-key");
const logs = select("#logs");

export function renderCurrentKey(currentKeys: string[], possibles: [string, string][]) {
  currentKey.innerHTML = `> ${currentKeys.join(" ")}`;
  possibleKeys.innerHTML = possibles
    .map(([km, id]) => `<span class="km">${km}</span> ${id}`)
    .join("<br/>");
}

export function resetCurrentKey(kb: Keybinding) {
  currentKey.innerHTML = `>`;
  possibleKeys.innerHTML = Object.entries(kb)
    .map(([km, id]) => `<span class="km">${km}</span> ${id}`)
    .join("<br/>");
}

const fontSizeMap = {
  info: 12,
  warn: 14,
  error: 16,
} as any;
const fontWeightMap = {
  info: "normal",
  warn: "bold",
  error: "bold",
} as any;

export function appendLog(level: string, args: any[]) {
  const msg = args.join(" ");
  const l = document.createElement("span");
  l.classList.add("log", level);
  l.textContent = msg;
  l.style.fontSize = `${fontSizeMap[level]}px`;
  l.style.fontWeight = `${fontWeightMap[level]}`;
  logs.append(l);
  logs.scrollBy({ behavior: "smooth", left: 0, top: 9999999999 });
  l.style.removeProperty("font-size");
  l.style.removeProperty("font-weight");
}
