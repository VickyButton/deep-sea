/** An interface for requesting and cancelling animation frames. */
export interface AnimationFrameProvider {
  /**
   * Cancels an active animation frame request.
   * @param requestId The ID of the animation frame request to cancel.
   */
  cancelAnimationFrameRequest(requestId: number): void;
  /**
   * Requests an animation frame.
   * @param callback The callback to execute after the animation frame becomes available.
   * @returns An ID for the animation frame request.
   */
  requestAnimationFrame(callback: FrameRequestCallback): number;
}

/** Callback that is executed after an animation frame becomes available. */
export type FrameRequestCallback = () => void;
