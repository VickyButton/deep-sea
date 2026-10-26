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

  it('should emit "interval_elapsed" signal upon loop interval elapsing after starting', () => {
    const animationFrameProvider = new AnimationFrameProvider_Mock();
    const timeProvider = new TimeProvider_Mock();
    const loop = new Loop(animationFrameProvider, timeProvider);
    const loopsPerSecond = 1;
    const loopsPerSecondInterval = 1000;
    const emitSpy = vi.spyOn(loop.interval_elapsed, 'emit');

    loop.setLoopsPerSecond(loopsPerSecond);
    loop.start();
    advanceTime(loopsPerSecondInterval, timeProvider);

    expect(emitSpy).toHaveBeenCalledExactlyOnceWith(loopsPerSecondInterval);
  });

  it('should emit "interval_elapsed" signal upon loop interval elapsing after stopping', () => {
    const animationFrameProvider = new AnimationFrameProvider_Mock();
    const timeProvider = new TimeProvider_Mock();
    const loop = new Loop(animationFrameProvider, timeProvider);
    const loopsPerSecond = 1;
    const loopsPerSecondInterval = 1000;
    const emitSpy = vi.spyOn(loop.interval_elapsed, 'emit');

    loop.setLoopsPerSecond(loopsPerSecond);
    loop.start();
    advanceTime(loopsPerSecondInterval, timeProvider);
    loop.stop();
    advanceTime(loopsPerSecondInterval, timeProvider);

    expect(emitSpy).toHaveBeenCalledOnce();
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
