import { EngineLoopDefault } from './EngineLoopDefault';
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

describe('EngineLoopDefault', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    timeProvider.now = 0;
  });

  it('should execute loop callback on interval', () => {
    const engineLoop = new EngineLoopDefault(timeProvider);
    const loopsPerSecond = 1;
    const loopsPerSecondInterval = 1000;
    const loopCallback = vi.fn();

    engineLoop.setLoopsPerSecond(loopsPerSecond);
    engineLoop.setLoopCallback(loopCallback);
    engineLoop.start();
    advanceTimers(loopsPerSecondInterval);

    expect(loopCallback).toHaveBeenCalledWith(loopsPerSecondInterval);
  });

  it('should not execute loop callback after stopping', () => {
    const engineLoop = new EngineLoopDefault(timeProvider);
    const loopsPerSecond = 1;
    const loopsPerSecondInterval = 1000;
    const loopCallback = vi.fn();

    engineLoop.setLoopsPerSecond(loopsPerSecond);
    engineLoop.setLoopCallback(loopCallback);
    engineLoop.start();
    engineLoop.stop();
    advanceTimers(loopsPerSecondInterval);

    expect(loopCallback).not.toHaveBeenCalled();
  });
});

function advanceTimers(ms: number) {
  timeProvider.now += ms;
  vi.advanceTimersByTime(ms);
}
