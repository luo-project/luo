export function start(initState: any, onCmd: any, hooks: any[]) {
  let state = initState;
  onCmd((cmdFunc: any) => {
    state = deepCopy(state);
    cmdFunc(state);
    hooks.forEach((h) => {
      state = deepCopy(state);
      h(state);
    });
  });
}

function deepCopy(v: any) {}
