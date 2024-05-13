
class KeyMapping {
  key: string;
  ctrl: boolean | undefined;
  shift: boolean | undefined;

  constructor(key:string, ctrl:boolean | undefined, shift:boolean | undefined) {
    if (key.length !== 1) throw new Error('Key must be a single character');
    if (!key.match(/[a-zA-Z0-9\[\]{};':",.\/<>?`~!@#$%^&*()-=_+]/)) throw new Error('Key must be in the set of allowed characters');

    this.key = key;
    this.ctrl = ctrl;
    this.shift = shift;
  }

  toString() {
    return `${this.ctrl ? 'Ctrl+' : ''}${this.shift ? 'Shift+' : ''}${this.key}`;
  }

  static fromString(str:string) {
    const parts = str.split('+');
    return new KeyMapping(parts[parts.length - 1], parts.includes('Ctrl'), parts.includes('Shift'));
  }
}
