/** Responsible for managing frame timing and executing callback. */
export interface FrameLoop {
  /** The number of frames per second that the frame loop should run at. */
  framesPerSecond: number;
  /** Starts the frame loop. */
  start(): void;
  /** Stops the frame loop. */
  stop(): void;
}
