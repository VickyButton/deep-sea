import type { AnimationFrameProvider, FrameRequestCallback } from './animationFrameProvider.types';

/** The mock implementation of the AnimationFrameProvider interface. */
export class AnimationFrameProvider_Mock implements AnimationFrameProvider {
  private readonly interval: number;
  private callback: FrameRequestCallback | null = null;
  private elapsed = 0;

  constructor(interval = 1) {
    this.interval = interval;
    this.start();
  }

  private start() {
    setInterval(this.step, 1);
  }

  private step = () => {
    this.elapsed += this.interval;

    if (this.callback) {
      this.callback(this.elapsed);
    }
  };

  public cancelAnimationFrameRequest() {
    this.callback = null;
  }

  public requestAnimationFrame(callback: FrameRequestCallback) {
    this.callback = callback;

    return 1;
  }
}
