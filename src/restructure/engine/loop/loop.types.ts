import type { Event } from '../../events';

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

/** Loop events. */
export interface LoopEvents {
  /** Event for setting the loop callback. */
  SetLoopCallback: Event<LoopCallback>;
  /** Event for setting the number of loops per second. */
  SetLoopsPerSecond: Event<number>;
  /** Event for starting the loop. */
  Start: Event<void>;
  /** Event for stopping the loop. */
  Stop: Event<void>;
}

export type LoopCallback = (dt: number) => void;
