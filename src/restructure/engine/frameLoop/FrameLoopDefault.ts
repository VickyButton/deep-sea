import type { TimeProvider } from '../../providers/timeProvider.types';
import type { FrameLoop } from '../frameLoop.types';
import { NewFrameEvent } from '../../events/NewFrameEvent';
import { clamp } from '../../utils/clamp';

const FPS_MIN = 0;
const FPS_MAX = 120;

export class FrameLoopDefault implements FrameLoop {
  private readonly timeProvider: TimeProvider;
  private _framesPerSecond = 60;
  private lastFrameTimestamp = 0;
  private lastLoopTimestamp = 0;
  private millisecondsPerFrame = this.computeMillisecondsPerFrame();
  private millisecondsSinceLastFrame = 0;
  private scheduledAnimationFrameRequestId: number | null = null;

  constructor(timeProvider: TimeProvider) {
    this.timeProvider = timeProvider;
  }

  private computeMillisecondsPerFrame() {
    return 1000 / this._framesPerSecond;
  }

  public get framesPerSecond() {
    return this._framesPerSecond;
  }

  public set framesPerSecond(fps: number) {
    this._framesPerSecond = this.clampFramesPerSecond(fps);
    this.updateMillisecondsPerFrame();
  }

  private updateMillisecondsPerFrame() {
    this.millisecondsPerFrame = this.computeMillisecondsPerFrame();
  }

  private clampFramesPerSecond(fps: number) {
    return clamp(fps, FPS_MIN, FPS_MAX);
  }

  public start() {
    this.scheduleAnimationFrameRequest();
  }

  private scheduleAnimationFrameRequest() {
    this.scheduledAnimationFrameRequestId = this.requestAnimationFrameForLoop();
  }

  private requestAnimationFrameForLoop() {
    // TODO: Create AnimationFrameProvider to decouple browser implementation details.
    return requestAnimationFrame(this.loop);
  }

  private loop = () => {
    this.updateLastLoopTimestamp();
    this.updateMillisecondsSinceLastFrame();
    this.checkIfNewFrameIsDue();
    this.scheduleAnimationFrameRequest();
  };

  private updateLastLoopTimestamp() {
    this.lastLoopTimestamp = this.currentTimestamp;
  }

  private get currentTimestamp() {
    return this.timeProvider.now;
  }

  private updateMillisecondsSinceLastFrame() {
    this.millisecondsSinceLastFrame = this.computeMillisecondsSinceLastFrame();
  }

  private computeMillisecondsSinceLastFrame() {
    return this.lastLoopTimestamp - this.lastFrameTimestamp;
  }

  private checkIfNewFrameIsDue() {
    if (this.isDueForNewFrame()) {
      this.updateLastFrameTimestamp();
      this.emitNewFrameEvent(this.millisecondsSinceLastFrame);
    }
  }

  private isDueForNewFrame() {
    return this.millisecondsSinceLastFrame >= this.millisecondsPerFrame;
  }

  private updateLastFrameTimestamp() {
    this.lastFrameTimestamp = this.lastLoopTimestamp;
  }

  private emitNewFrameEvent(dt: number) {
    NewFrameEvent.emit(dt);
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
