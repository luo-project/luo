import { KeyMap, checkKeybinding } from "./types";

type KeybindingMap = Map<string, string>;

export function Keybinding(
  keyBindingConfig: KeybindingMap = new Map<string, string>(),
) {
  return {
    setKeybinding(keyMapping: KeyMap, commandId: string) {
      keyBindingConfig.set(keyMapping.toString(), commandId);
    },
    getCommandByKeybinding(keyMapping: KeyMap): string | undefined {
      return keyBindingConfig.get(keyMapping.toString());
    },
    getKeybindingByCommand(commandId: string): string | undefined {
      for (let [key, value] of keyBindingConfig) {
        if (value === commandId) {
          return key;
        }
      }
      return undefined;
    },
    toJson(): string {
      return JSON.stringify(Array.from(keyBindingConfig.entries()));
    },
    fromJson(json: string) {
      const keybindings = new Map<string, string>(JSON.parse(json));

      if (!checkKeybinding(keybindings)) {
        throw new Error("Invalid keybinding");
      }
      keyBindingConfig = keybindings;
    },
  };
}
