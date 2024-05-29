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
    container.classList.remove("hidden");
    input.focus();
    const el = useEventListeners(input);
    el.add("blur", () => {
      input.focus();
    });
    const done = () => {
      el.done();
      input.value = "";
      options.onEnabled(false);
      container.classList.add("hidden");
    };
    return new Promise((resolve, reject) => {
      el.add("keydown", (e: KeyboardEvent) => {
        if (ignoredKeys.includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        if (cancelKeys.includes(e.key)) {
          reject("Cancelled");
          return done();
        }
        if (userInputOptions.length === undefined && doneKeys.includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
          resolve(input.value);
          return done();
        }
      });
      el.add("keyup", (e: KeyboardEvent) => {
        if (
          userInputOptions.length !== undefined &&
          userInputOptions.length === input.value.length
        ) {
          resolve(input.value);
          return done();
        }
      });
    });
  };
}
