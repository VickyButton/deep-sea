import { Loop } from './Loop';
import { Clock_Mock } from '../../domain/clock/Clock_Mock';
import { AnimationFrameProvider_Mock } from '../../providers/animationFrameProvider/AnimationFrameProvider_Mock';
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
    const clock = new Clock_Mock();
    const loop = new Loop(animationFrameProvider, clock);
    const loopsPerSecond = 1;
    const loopsPerSecondInterval = 1000;
    const loopCallback = vi.fn();

    loop.setLoopsPerSecond(loopsPerSecond);
    loop.setLoopCallback(loopCallback);
    loop.start();
    advanceTime(loopsPerSecondInterval, clock);

    expect(loopCallback).toHaveBeenCalledExactlyOnceWith(loopsPerSecondInterval);
  });

  it('should not execute loop callback after stopping', () => {
    const animationFrameProvider = new AnimationFrameProvider_Mock();
    const clock = new Clock_Mock();
    const loop = new Loop(animationFrameProvider, clock);
    const loopsPerSecond = 1;
    const loopsPerSecondInterval = 1000;
    const loopCallback = vi.fn();

    loop.setLoopsPerSecond(loopsPerSecond);
    loop.setLoopCallback(loopCallback);
    loop.start();
    advanceTime(loopsPerSecondInterval, clock);
    loop.stop();
    advanceTime(loopsPerSecondInterval, clock);

    expect(loopCallback).toHaveBeenCalledOnce();
  });
});

function advanceTime(ms: number, clock: Clock_Mock) {
  advanceClockByTime(clock, ms);
  vi.advanceTimersByTime(ms);
}

function advanceClockByTime(clock: Clock_Mock, ms: number) {
  clock.now += ms;
}
