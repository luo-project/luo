export type KeyMap = {
  key: string;
  ctrl: boolean | undefined;
  shift: boolean | undefined;
};
type KeybindingMap = Map<string, string>;

function checkKeyString(key: string): boolean {
  return (
    key.length === 1 &&
    key.match(/[a-zA-Z0-9\[\]{};':",.\/<>?`~!@#$%^&*()-=_+]/) !== null
  );
}

export function KeyMapping(KeyMap: KeyMap) {
  if (!checkKeyString(KeyMap.key)) throw new Error("Invalid key string");

  return {
    toString() {
      return `${KeyMap.ctrl ? "Ctrl+" : ""}${KeyMap.shift ? "Shift+" : ""}${KeyMap.key}`;
    },
  };
}

export function checkKeyMapString(keyMapString: string) {
  const keyMap = keyMapString.split("+");

  if (keyMap.length > 3) {
    return false;
  }

  let key: string = "";
  if (keyMap.length === 3) {
    if (keyMap[0] !== "Ctrl" || keyMap[1] !== "Shift") {
      return false;
    }
    key = keyMap[2];
  } else if (keyMap.length === 2) {
    if (keyMap[0] !== "Ctrl" && keyMap[0] !== "Shift") {
      return false;
    }
    key = keyMap[1];
  } else {
    key = keyMap[0];
  }

  if (key.length !== 1) {
    return false;
  }

  if (!checkKeyString(key)) {
    return false;
  }

  return true;
}

export function checkKeybinding(keyMapping: Object) {
  for (let key in keyMapping) {
    if (checkKeyMapString(key)) {
      return false;
    }
  }
  return true;
}

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
