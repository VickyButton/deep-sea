import type { Event } from '../../events';

/** Responsible for managing engine loop timing and executing callback. */
export interface EngineLoop {
  /** Sets the number of loops per second to run at. */
  setLoopsPerSecond(numLoops: number): void;
  /** Sets the callback to execute on each new loop. */
  setLoopCallback(callback: LoopCallback): void;
  /** Starts the loop. */
  start(): void;
  /** Stops the loop. */
  stop(): void;
}

/** Frame Loop events. */
export interface EngineLoopEvents {
  /** Event for setting the number of loops per second. */
  SetLoopsPerSecond: Event<number>;
  /** Event for setting the loop callback. */
  SetLoopCallback: Event<LoopCallback>;
  /** Event for starting the loop. */
  Start: Event<void>;
  /** Event for stopping the loop. */
  Stop: Event<void>;
}

export type LoopCallback = (dt: number) => void;
