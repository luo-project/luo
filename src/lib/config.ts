export type Config = {
  graph: {
    /**
     * 0=disable
     */
    animation: number;
    collisionSize: number;
  };
  viewport: {
    /**
     * 0=disable
     */
    animation: number;
    pan: {
      amount: {
        x: number;
        y: number;
      };
    };
    zoom: {
      amount: number;
      min: number;
      max: number;
    };
  };
  keyTimeout: number;
  timeline: {
    graph: number;
    focus: number;
    choices: number;
    palette: number;
  };
};
