import type { LoopCallback } from './loop.types';
import type { Clock } from '../../domain/clock/clock.types';
import { clamp } from '../../utils/clamp';

const LOOPS_PER_SECOND_MIN = 1;
const LOOPS_PER_SECOND_MAX = 120;

/** Responsible for managing loop timing and executing loop callback. */
export class Loop {
  private readonly clock: Clock;
  private lastAnimationFrameTimestamp = 0;
  private lastLoopTimestamp = 0;
  private loopCallback: LoopCallback = () => { };
  private loopsPerSecond = 60;
  private millisecondsPerLoop = this.computeMillisecondsPerLoop();
  private millisecondsSinceLastLoop = 0;
  private scheduledAnimationFrameRequestId: number | null = null;

  constructor(clock: Clock) {
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
    this.cancelScheduledAnimationFrameRequest();
  }

  private cancelScheduledAnimationFrameRequest() {
    if (this.scheduledAnimationFrameRequestId) {
      cancelAnimationFrame(this.scheduledAnimationFrameRequestId);
      this.scheduledAnimationFrameRequestId = null;
    }
  }
}
