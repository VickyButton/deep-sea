import type { FrameRequestCallback } from './Animation.types';

/** The browser animation interface. */
export abstract class Animation {
  /**
   * Cancels an active animation frame request.
   * @param requestId The ID of the animation frame request to cancel.
   */
  public abstract cancelAnimationFrameRequest(requestId: number): void;
  /**
   * Requests an animation frame.
   * @param callback The callback to execute after the animation frame becomes available.
   * @returns The animation frame request ID.
   */
  public abstract requestAnimationFrame(callback: FrameRequestCallback): number;
}
