import { enableKeymap } from "./keymap";
import { logger } from "./log";

export type UserInputType = "string" | "number" | "int";

const container = document.getElementById("user-input")!;
const input = document.querySelector("#user-input .input")! as HTMLInputElement;
const message = document.querySelector("#user-input .message")!;
const l = logger("userinput");

export async function userInput(p: {
  message?: string;
  type: "string";
  length?: number;
}): Promise<string>;
export async function userInput(p: {
  message?: string;
  type: "number" | "int";
  length?: number;
}): Promise<number>;
export async function userInput(p: {
  message?: string;
  type: UserInputType;
  length?: number;
}): Promise<any> {
  if (p.length === 0) {
    throw new Error("invalid length: 0");
  }
  let cbInput: (e: Event) => any = null as any;
  let cbKeydown: (e: KeyboardEvent) => any = null as any;
  let cbBlur: (e: Event) => any = null as any;
  try {
    message.textContent = p.message ?? null;
    enableKeymap(false);
    container.style.display = "block";
    input.focus();
    const text = await new Promise<string>((resolve, reject) => {
      cbInput = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };
      cbKeydown = (e) => {
        const key = e.key.toLowerCase();
        if (key === "tab") {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        if (typeof p.length === "number" && input.value.length === p.length) {
          l.debug("by length:", input.value);
          resolve(input.value);
          return;
        }
        if (key === "enter") {
          l.debug("by enter:", input.value);
          resolve(input.value);
          return;
        }
        if (key === "escape") {
          l.debug("by escape cancelled");
          reject(new Error("user cancelled"));
          return;
        }
      };
      cbBlur = () => {
        input.focus();
      };

      input.addEventListener("keydown", cbKeydown);
      input.addEventListener("input", cbInput);
      input.addEventListener("blur", cbBlur);
    });
    if (p.type === "string") {
      return text;
    }
    if (p.type === "number") {
      const n = parseFloat(text);
      if (isNaN(n)) {
        throw new Error("not a number");
      }
      return n;
    }
    if (p.type === "int") {
      const n = parseInt(text);
      if (isNaN(n)) {
        throw new Error("not a number");
      }
    }
  } finally {
    container.style.display = "none";
    input.value = "";
    input.removeEventListener("keydown", cbKeydown);
    input.removeEventListener("input", cbInput);
    input.removeEventListener("blur", cbBlur);
    setTimeout(() => {
      enableKeymap(true);
    });
  }
}
