import { FrameLoopDefault } from './EngineLoopDefault';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const FPS = 60;
const FPS_INTERVAL = 1000 / FPS;

const timeProvider = {
  now: 0,
};

// Mock global animation frame methods.
global.requestAnimationFrame = (cb: FrameRequestCallback) => {
  cb(0);

  return 0;
};
global.cancelAnimationFrame = vi.fn();

describe('FrameLoopDefault', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    timeProvider.now = 0;
  });

  it('should execute loop callback on new loop', () => {
    const frameLoop = new FrameLoopDefault(timeProvider);
    const loopCallback = vi.fn();

    frameLoop.setLoopCallback(loopCallback);
    frameLoop.start();
    advanceTimers(FPS_INTERVAL);

    expect(loopCallback).toHaveBeenCalledWith(FPS_INTERVAL);
  });

  it('should execute loop callback after stopping', () => {
    const frameLoop = new FrameLoopDefault(timeProvider);
    const loopCallback = vi.fn();

    frameLoop.setLoopCallback(loopCallback);
    frameLoop.start();
    frameLoop.stop();
    advanceTimers(FPS_INTERVAL);

    expect(loopCallback).not.toHaveBeenCalled();
  });
});

function advanceTimers(ms: number) {
  timeProvider.now += ms;
  vi.advanceTimersByTime(ms);
}
