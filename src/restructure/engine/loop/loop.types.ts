/** Responsible for managing loop timing and executing loop callback. */
export interface Loop {
  /** Sets the callback to execute on each new loop. */
  setLoopCallback(callback: LoopCallback): void;
  /** Sets the number of loops per second to run at. */
  setLoopsPerSecond(numLoops: number): void;
  /** Starts the loop. */
  start(): void;
  /** Stops the loop. */
  stop(): void;
}

export type LoopCallback = (dt: number) => void;
