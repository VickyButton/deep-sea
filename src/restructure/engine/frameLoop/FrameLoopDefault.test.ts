import { FrameLoopDefault } from './FrameLoopDefault';
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

  it('should execute new frame callback after interval', () => {
    const frameLoop = new FrameLoopDefault(timeProvider);
    const newFrameCallback = vi.fn();

    frameLoop.onNewFrame(newFrameCallback);
    frameLoop.start();
    advanceTimers(FPS_INTERVAL);

    expect(newFrameCallback).toHaveBeenCalled();
  });

  it('should not execute new frame callback after stopping', () => {
    const frameLoop = new FrameLoopDefault(timeProvider);
    const newFrameCallback = vi.fn();

    frameLoop.onNewFrame(newFrameCallback);
    frameLoop.start();
    frameLoop.stop();
    advanceTimers(FPS_INTERVAL);

    expect(newFrameCallback).not.toHaveBeenCalled();
  });
});

function advanceTimers(ms: number) {
  timeProvider.now += ms;
  vi.advanceTimersByTime(ms);
}
