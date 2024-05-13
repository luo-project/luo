
type KeybindingMap = Map<string, string>;

export class Keybinding {
  keyBindingConfig: KeybindingMap = new Map<string, string>();

  constructor() {
    this.keyBindingConfig = new Map<string, string>();
  }

  init(keybindings: KeybindingMap) {
    this.keyBindingConfig = keybindings;
  }

  setKeybinding(keyMapping:KeyMapping, commandId:string) {
    this.keyBindingConfig.set(keyMapping.toString(), commandId);
  }

  getCommandByKeybinding(keyMapping:KeyMapping) {
    return this.keyBindingConfig.get(keyMapping.toString());
  }

  getKeybindingByCommand(commandId:string) {
    for (let [key, value] of this.keyBindingConfig) {
      if (value === commandId) {
        return key;
      }
    }
    return null;
  }

  toJson() {
    return JSON.stringify(Array.from(this.keyBindingConfig.entries()));
  }
}