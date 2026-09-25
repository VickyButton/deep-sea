import { EngineLoopDefault } from './EngineLoopDefault';
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

describe('EngineLoopDefault', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    timeProvider.now = 0;
  });

  it('should execute loop callback on new loop', () => {
    const engineLoop = new EngineLoopDefault(timeProvider);
    const loopCallback = vi.fn();

    engineLoop.setLoopCallback(loopCallback);
    engineLoop.start();
    advanceTimers(FPS_INTERVAL);

    expect(loopCallback).toHaveBeenCalledWith(FPS_INTERVAL);
  });

  it('should execute loop callback after stopping', () => {
    const engineLoop = new EngineLoopDefault(timeProvider);
    const loopCallback = vi.fn();

    engineLoop.setLoopCallback(loopCallback);
    engineLoop.start();
    engineLoop.stop();
    advanceTimers(FPS_INTERVAL);

    expect(loopCallback).not.toHaveBeenCalled();
  });
});

function advanceTimers(ms: number) {
  timeProvider.now += ms;
  vi.advanceTimersByTime(ms);
}
