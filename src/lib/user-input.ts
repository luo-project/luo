import { logger } from "./log";
import { useEventListeners } from "./utils";

export type UserInput = (options: {
  message?: string;
  length?: number;
}) => Promise<string>;

const ignoredKeys = ["Tab"];
const cancelKeys = ["Escape"];
const doneKeys = ["Enter"];

export function initUserInput(options: { onEnabled: (b: boolean) => void }): UserInput {
  const container = document.getElementById("user-input")!;
  const input = document.querySelector("#user-input .input")! as HTMLInputElement;
  input.addEventListener("input", (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
  const message = document.querySelector("#user-input .message")!;
  const l = logger("userinput");
  return (userInputOptions) => {
    options.onEnabled(true);
    message.textContent = userInputOptions.message ?? "";
    container.style.display = "block";
    input.focus();
    const el = useEventListeners(input);
    el.add("blur", () => {
      input.focus();
    });
    const done = () => {
      el.done();
      container.style.display = "none";
      input.value = "";
      options.onEnabled(false);
    };
    return new Promise((resolve, reject) => {
      el.add("keydown", (e: KeyboardEvent) => {
        if (ignoredKeys.includes(e.key)) {
          return;
        }
        if (cancelKeys.includes(e.key)) {
          reject("Cancelled");
          return done();
        }
        if (doneKeys.includes(e.key) || input.value.length === userInputOptions.length) {
          e.preventDefault();
          e.stopPropagation();
          resolve(input.value);
          return done();
        }
      });
    });
  };
}
