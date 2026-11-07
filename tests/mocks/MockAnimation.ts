import { Animation } from '../../src/core/os/Animation';

export class MockAnimation extends Animation {
  private readonly interval: number;
  private callback: FrameRequestCallback | null = null;
  private elapsed = 0;

  constructor(interval = 1) {
    super();

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
