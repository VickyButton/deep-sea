import type { LoopCallback } from './loop.types';
import type { Clock } from '../../domain/clock/clock.types';
import type { AnimationFrameProvider, FrameRequestCallback } from '../../providers/animationFrameProvider/animationFrameProvider.types';
import { clamp } from '../../utils/clamp';

const LOOPS_PER_SECOND_MIN = 1;
const LOOPS_PER_SECOND_MAX = 120;

/** Responsible for managing loop timing and executing loop callback. */
export class Loop {
  private readonly animationFrameProvider: AnimationFrameProvider;
  private readonly clock: Clock;
  private lastAnimationFrameTimestamp = 0;
  private lastLoopTimestamp = 0;
  private loopCallback: LoopCallback = () => { };
  private loopsPerSecond = 60;
  private millisecondsPerLoop = this.computeMillisecondsPerLoop();
  private millisecondsSinceLastLoop = 0;
  private scheduledAnimationFrameRequestId: number | null = null;

  constructor(animationFrameProvider: AnimationFrameProvider, clock: Clock) {
    this.animationFrameProvider = animationFrameProvider;
    this.clock = clock;
  }

  /** Sets the callback to execute on each new loop. */
  public setLoopCallback(callback: LoopCallback) {
    this.loopCallback = callback;
  }

  /** Sets the number of loops per second to run at. */
  public setLoopsPerSecond(loopsPerSecond: number) {
    this.loopsPerSecond = this.clampLoopsPerSecond(loopsPerSecond);
    this.millisecondsPerLoop = this.computeMillisecondsPerLoop();
  }

  private clampLoopsPerSecond(loopsPerSecond: number) {
    return clamp(loopsPerSecond, LOOPS_PER_SECOND_MIN, LOOPS_PER_SECOND_MAX);
  }

  private computeMillisecondsPerLoop() {
    return 1000 / this.loopsPerSecond;
  }

  /** Starts the loop. */
  public start() {
    this.scheduleAnimationFrameRequest();
  }

  private scheduleAnimationFrameRequest() {
    this.scheduledAnimationFrameRequestId = this.requestAnimationFrame(this.onAnimationFrame);
  }

  private requestAnimationFrame(callback: FrameRequestCallback) {
    return this.animationFrameProvider.requestAnimationFrame(callback);
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
    return this.clock.now;
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

  /** Stops the loop. */
  public stop() {
    if (this.scheduledAnimationFrameRequestId !== null) {
      this.cancelAnimationFrameRequest(this.scheduledAnimationFrameRequestId);
    }
  }

  private cancelAnimationFrameRequest(requestId: number) {
    this.animationFrameProvider.cancelAnimationFrameRequest(requestId);
    this.scheduledAnimationFrameRequestId = null;
  }
}
