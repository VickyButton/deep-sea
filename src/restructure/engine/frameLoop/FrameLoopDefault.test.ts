import { FrameLoopDefault } from './FrameLoopDefault';
import { NewFrameEvent } from '../../events/NewFrameEvent';
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

  it('should emit new frame event after interval', () => {
    vi.mock('../../events/NewFrameEvent');

    const frameLoop = new FrameLoopDefault(timeProvider);

    frameLoop.start();
    advanceTimers(FPS_INTERVAL);

    expect(NewFrameEvent.emit).toHaveBeenCalledWith(FPS_INTERVAL);
  });

  it('should not emit new frame callback after stopping', () => {
    vi.mock('../../events/NewFrameEvent');

    const frameLoop = new FrameLoopDefault(timeProvider);

    frameLoop.start();
    frameLoop.stop();
    advanceTimers(FPS_INTERVAL);

    expect(NewFrameEvent.emit).not.toHaveBeenCalled();
  });
});

function advanceTimers(ms: number) {
  timeProvider.now += ms;
  vi.advanceTimersByTime(ms);
}
