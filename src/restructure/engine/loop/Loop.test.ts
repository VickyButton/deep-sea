import { Loop } from './Loop';
import { AnimationFrameProvider_Mock } from '../../providers/animationFrameProvider/AnimationFrameProvider_Mock';
import { TimeProvider_Mock } from '../../providers/timeProvider/TimeProvider_Mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('Loop', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should execute loop callback on interval', () => {
    const animationFrameProvider = new AnimationFrameProvider_Mock();
    const timeProvider = new TimeProvider_Mock();
    const loop = new Loop(animationFrameProvider, timeProvider);
    const loopsPerSecond = 1;
    const loopsPerSecondInterval = 1000;
    const loopCallback = vi.fn();

    loop.setLoopsPerSecond(loopsPerSecond);
    loop.setLoopCallback(loopCallback);
    loop.start();
    advanceTime(loopsPerSecondInterval, timeProvider);

    expect(loopCallback).toHaveBeenCalledExactlyOnceWith(loopsPerSecondInterval);
  });

  it('should not execute loop callback after stopping', () => {
    const animationFrameProvider = new AnimationFrameProvider_Mock();
    const timeProvider = new TimeProvider_Mock();
    const loop = new Loop(animationFrameProvider, timeProvider);
    const loopsPerSecond = 1;
    const loopsPerSecondInterval = 1000;
    const loopCallback = vi.fn();

    loop.setLoopsPerSecond(loopsPerSecond);
    loop.setLoopCallback(loopCallback);
    loop.start();
    advanceTime(loopsPerSecondInterval, timeProvider);
    loop.stop();
    advanceTime(loopsPerSecondInterval, timeProvider);

    expect(loopCallback).toHaveBeenCalledOnce();
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
