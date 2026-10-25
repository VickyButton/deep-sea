import { Loop } from './Loop';
import { Clock_Mock } from '../../domain/clock/Clock_Mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock global animation frame methods.
global.requestAnimationFrame = (cb: FrameRequestCallback) => {
  cb(0);

  return 0;
};
global.cancelAnimationFrame = vi.fn();

describe('Loop', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should execute loop callback on interval', () => {
    const clock = new Clock_Mock();
    const loop = new Loop(clock);
    const loopsPerSecond = 1;
    const loopsPerSecondInterval = 1000;
    const loopCallback = vi.fn();

    loop.setLoopsPerSecond(loopsPerSecond);
    loop.setLoopCallback(loopCallback);
    loop.start();
    clock.now += loopsPerSecondInterval;
    vi.advanceTimersByTime(loopsPerSecondInterval);

    expect(loopCallback).toHaveBeenCalledWith(loopsPerSecondInterval);
  });

  it('should not execute loop callback after stopping', () => {
    const clock = new Clock_Mock();
    const loop = new Loop(clock);
    const loopsPerSecond = 1;
    const loopsPerSecondInterval = 1000;
    const loopCallback = vi.fn();

    loop.setLoopsPerSecond(loopsPerSecond);
    loop.setLoopCallback(loopCallback);
    loop.start();
    loop.stop();
    clock.now += loopsPerSecondInterval;
    vi.advanceTimersByTime(loopsPerSecondInterval);

    expect(loopCallback).not.toHaveBeenCalled();
  });
});
