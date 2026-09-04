export type NewFrameCallback = (dt: number) => void;

/**
 * Responsible for managing new frame timing and executing callback.
 */
export interface FrameLoop {
  /**
   * Sets the frames per second that the frame loop should run at.
   * @param fps The frames per second.
   */
  setFramesPerSecond(fps: number): void;
  /**
   * Sets a callback to be executed when a new frame is created.
   * @param callback The callback to execute.
   */
  onNewFrame(callback: NewFrameCallback): void;
  /**
   * Starts the frame loop.
   */
  startLoop(): void;
  /**
   * Stops the frame loop.
   */
  stopLoop(): void;
}
