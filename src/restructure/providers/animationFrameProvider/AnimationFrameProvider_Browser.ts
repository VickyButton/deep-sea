import type { AnimationFrameProvider, FrameRequestCallback } from './animationFrameProvider.types';

/** The browser implementation of the AnimationFrameProvider interface. */
export class AnimationFrameProvider_Browser implements AnimationFrameProvider {
  public cancelAnimationFrameRequest(requestId: number) {
    cancelAnimationFrame(requestId);
  }

  public requestAnimationFrame(callback: FrameRequestCallback) {
    return requestAnimationFrame(callback);
  }
}
