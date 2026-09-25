import type { Event } from '../../events';

/** Responsible for managing frame timing and executing callback. */
export interface EngineLoop {
  /** Sets the number of frames per second that the frame loop runs at. */
  setFramesPerSecond(fps: number): void;
  /** Sets the loop callback to call on each new frame. */
  setLoopCallback(callback: LoopCallback): void;
  /** Starts the frame loop. */
  start(): void;
  /** Stops the frame loop. */
  stop(): void;
}

/** Frame Loop events. */
export interface EngineLoopEvents {
  /** Event for setting the frames per second. */
  SetFramesPerSecond: Event<number>;
  /** Event for setting the loop callback. */
  SetLoopCallback: Event<LoopCallback>;
  /** Event for starting the loop. */
  Start: Event<void>;
  /** Event for stopping the loop. */
  Stop: Event<void>;
}

export type LoopCallback = (dt: number) => void;
