import type { FrameLoop, LoopCallback } from './frameLoop.types';
import type { TimeProvider } from '../../providers/timeProvider.types';
import { clamp } from '../../utils/clamp';

const FPS_MIN = 1;
const FPS_MAX = 120;

export class FrameLoopDefault implements FrameLoop {
  private readonly timeProvider: TimeProvider;
  private lastAnimationFrameTimestamp = 0;
  private lastLoopTimestamp = 0;
  private loopCallback: LoopCallback = () => { };
  private loopsPerSecond = 60;
  private millisecondsPerLoop = this.computeMillisecondsPerLoop();
  private millisecondsSinceLastLoop = 0;
  private scheduledAnimationFrameRequestId: number | null = null;

  constructor(timeProvider: TimeProvider) {
    this.timeProvider = timeProvider;
  }

  // TODO: Rename to setLoopsPerSecond.
  public setFramesPerSecond(loopsPerSecond: number) {
    this.loopsPerSecond = this.clampLoopsPerSecond(loopsPerSecond);
    this.millisecondsPerLoop = this.computeMillisecondsPerLoop();
  }

  private clampLoopsPerSecond(loopsPerSecond: number) {
    return clamp(loopsPerSecond, FPS_MIN, FPS_MAX);
  }

  private computeMillisecondsPerLoop() {
    return 1000 / this.loopsPerSecond;
  }

  public setLoopCallback(callback: LoopCallback) {
    this.loopCallback = callback;
  }

  public start() {
    this.scheduleAnimationFrameRequest();
  }

  private scheduleAnimationFrameRequest() {
    this.scheduledAnimationFrameRequestId = this.requestAnimationFrameForLoop();
  }

  private requestAnimationFrameForLoop() {
    // TODO: Create AnimationFrameProvider to decouple browser implementation details.
    return requestAnimationFrame(this.onAnimationFrame);
  }

  private onAnimationFrame = () => {
    this.updateLastAnimationFrameTimestamp();
    this.updateMillisecondsSinceLastLoop();
    this.checkIfNewFrameIsDue();
    this.scheduleAnimationFrameRequest();
  };

  private updateLastAnimationFrameTimestamp() {
    this.lastAnimationFrameTimestamp = this.currentTimestamp;
  }

  private get currentTimestamp() {
    return this.timeProvider.now;
  }

  private updateMillisecondsSinceLastLoop() {
    this.millisecondsSinceLastLoop = this.computeMillisecondsSinceLastLoop();
  }

  private computeMillisecondsSinceLastLoop() {
    return this.lastAnimationFrameTimestamp - this.lastLoopTimestamp;
  }

  private checkIfNewFrameIsDue() {
    if (this.isDueForNewFrame()) {
      this.updateLastLoopTimestamp();
      this.loopCallback(this.millisecondsSinceLastLoop);
    }
  }

  private isDueForNewFrame() {
    return this.millisecondsSinceLastLoop >= this.millisecondsPerLoop;
  }

  private updateLastLoopTimestamp() {
    this.lastLoopTimestamp = this.lastAnimationFrameTimestamp;
  }

  public stop() {
    this.cancelScheduledAnimationFrameRequest();
  }

  private cancelScheduledAnimationFrameRequest() {
    if (this.scheduledAnimationFrameRequestId) {
      cancelAnimationFrame(this.scheduledAnimationFrameRequestId);
      this.scheduledAnimationFrameRequestId = null;
    }
  }
}
