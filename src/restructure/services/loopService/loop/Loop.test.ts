import { AnimationFrameProvider_Mock } from './animationFrameProvider/AnimationFrameProvider_Mock';
import { Loop } from './Loop';
import { TimeProvider_Mock } from './timeProvider/TimeProvider_Mock';
import { afterEach, beforeEach, describe, it, vi } from 'vitest';

// TODO: Rewrite after Loop rework w/ callbacks.
describe('Loop', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should emit "interval_elapsed" signal upon loop interval elapsing after starting', () => {
    const animationFrameProvider = new AnimationFrameProvider_Mock();
    const timeProvider = new TimeProvider_Mock();
    const loop = new Loop(animationFrameProvider, timeProvider);
    const loopsPerSecond = 1;
    const loopsPerSecondInterval = 1000;

    loop.setLoopsPerSecond(loopsPerSecond);
    loop.start();
    advanceTime(loopsPerSecondInterval, timeProvider);
  });

  it('should emit "interval_elapsed" signal upon loop interval elapsing after stopping', () => {
    const animationFrameProvider = new AnimationFrameProvider_Mock();
    const timeProvider = new TimeProvider_Mock();
    const loop = new Loop(animationFrameProvider, timeProvider);
    const loopsPerSecond = 1;
    const loopsPerSecondInterval = 1000;

    loop.setLoopsPerSecond(loopsPerSecond);
    loop.start();
    advanceTime(loopsPerSecondInterval, timeProvider);
    loop.stop();
    advanceTime(loopsPerSecondInterval, timeProvider);
  });
});

function advanceTime(ms: number, timeProvider: TimeProvider_Mock) {
  advanceClockByTime(timeProvider, ms);
  advanceTimersByTime(ms);
}

function advanceClockByTime(timeProvider: TimeProvider_Mock, ms: number) {
  timeProvider.now += ms;
}

function advanceTimersByTime(ms: number) {
  vi.advanceTimersByTime(ms);
}
