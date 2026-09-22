/** Responsible for managing frame timing and executing callback. */
export interface FrameLoop {
  /**
   * Sets the frames per second that the frame loop should run at.
   * @param fps The frames per second.
   */
  setFramesPerSecond(fps: number): void;
  /** Starts the frame loop. */
  start(): void;
  /** Stops the frame loop. */
  stop(): void;
}
