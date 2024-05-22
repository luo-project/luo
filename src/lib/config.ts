export type Config = {
  graph: {
    /**
     * 0=disable
     */
    animation: number;
    timelineSize: number;
    focusTimelineSize: number;
    choiceTimelineSize: number;
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
  command: {
    keybinding: Record<string, string>;
    "focus-move": {
      gap: number;
    };
  };
};
