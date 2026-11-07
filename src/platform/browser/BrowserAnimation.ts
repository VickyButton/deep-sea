import { Animation } from '../../core/os/Animation';

/** The browser implementation of the Animation class. */
export class BrowserAnimation extends Animation {
  public cancelAnimationFrameRequest(requestId: number) {
    cancelAnimationFrame(requestId);
  }

  public requestAnimationFrame(callback: FrameRequestCallback) {
    return requestAnimationFrame(callback);
  }
}
