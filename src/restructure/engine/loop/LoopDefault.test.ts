import { LoopDefault } from './LoopDefault';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const timeProvider = {
  now: 0,
};

// Mock global animation frame methods.
global.requestAnimationFrame = (cb: FrameRequestCallback) => {
  cb(0);

  return 0;
};
global.cancelAnimationFrame = vi.fn();

describe('LoopDefault', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    timeProvider.now = 0;
  });

  it('should execute loop callback on interval', () => {
    const loop = new LoopDefault(timeProvider);
    const loopsPerSecond = 1;
    const loopsPerSecondInterval = 1000;
    const loopCallback = vi.fn();

    loop.setLoopsPerSecond(loopsPerSecond);
    loop.setLoopCallback(loopCallback);
    loop.start();
    advanceTimers(loopsPerSecondInterval);

    expect(loopCallback).toHaveBeenCalledWith(loopsPerSecondInterval);
  });

  it('should not execute loop callback after stopping', () => {
    const loop = new LoopDefault(timeProvider);
    const loopsPerSecond = 1;
    const loopsPerSecondInterval = 1000;
    const loopCallback = vi.fn();

    loop.setLoopsPerSecond(loopsPerSecond);
    loop.setLoopCallback(loopCallback);
    loop.start();
    loop.stop();
    advanceTimers(loopsPerSecondInterval);

    expect(loopCallback).not.toHaveBeenCalled();
  });
});

function advanceTimers(ms: number) {
  timeProvider.now += ms;
  vi.advanceTimersByTime(ms);
}
