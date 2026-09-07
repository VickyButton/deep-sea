import type { TimeProvider } from '../../providers/timeProvider.types';
import type { FrameLoop, NewFrameCallback } from '../frameLoop.types';

export class FrameLoopDefault implements FrameLoop {
  private readonly timeProvider: TimeProvider;
  private framesPerSecond = 60;
  private lastFrameTimestamp = 0;
  private lastLoopTimestamp = 0;
  private millisecondsSinceLastFrame = 0;
  private scheduledAnimationFrameRequestId: number | null = null;
  private newFrameCallback: NewFrameCallback = () => { };

  constructor(timeProvider: TimeProvider) {
    this.timeProvider = timeProvider;
  }

  private get millisecondsPerFrame() {
    return 1000 / this.framesPerSecond;
  }

  public setFramesPerSecond(fps: number) {
    this.framesPerSecond = fps;
  }

  public onNewFrame(callback: NewFrameCallback) {
    this.newFrameCallback = callback;
  }

  public start() {
    this.scheduleAnimationFrameRequest();
  }

  private scheduleAnimationFrameRequest() {
    this.scheduledAnimationFrameRequestId = requestAnimationFrame(this.loop.bind(this));
  }

  private loop() {
    this.updateLastLoopTimestamp();
    this.updateMillisecondsSinceLastFrame();
    this.checkIfNewFrameIsDue();
    this.scheduleAnimationFrameRequest();
  }

  private updateLastLoopTimestamp() {
    this.lastLoopTimestamp = this.getCurrentTimestamp();
  }

  private getCurrentTimestamp() {
    return this.timeProvider.now;
  }

  private updateMillisecondsSinceLastFrame() {
    this.millisecondsSinceLastFrame = this.calculateMillisecondsSinceLastFrame();
  }

  private calculateMillisecondsSinceLastFrame() {
    return this.lastLoopTimestamp - this.lastFrameTimestamp;
  }

  private checkIfNewFrameIsDue() {
    if (this.isDueForNewFrame()) {
      this.updateLastFrameTimestamp();
      this.executeNewFrameCallback();
    }
  }

  private isDueForNewFrame() {
    return this.millisecondsSinceLastFrame >= this.millisecondsPerFrame;
  }

  private updateLastFrameTimestamp() {
    this.lastFrameTimestamp = this.lastLoopTimestamp;
  }

  private executeNewFrameCallback() {
    this.newFrameCallback(this.millisecondsSinceLastFrame);
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
