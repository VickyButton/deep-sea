import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Loop } from './Loop';
import { timestampNow } from '../utils/dateTimeProvider';

const FRAMES_PER_SECOND = 60;
const FRAMES_PER_SECOND_INTERVAL = Math.pow(0.1, 14) + 1000 / FRAMES_PER_SECOND;

// Mock requestAnimationFrame.
global.requestAnimationFrame = (cb: FrameRequestCallback) => {
  cb(0);

  return 0;
};

vi.mock('../utils/dateTimeProvider', () => ({
  timestampNow: vi.fn(),
}));

describe('Loop', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should call onLoop callback after interval', () => {
    const onLoop = vi.fn();

    vi.mocked(timestampNow)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(FRAMES_PER_SECOND_INTERVAL);

    const loop = new Loop({
      framesPerSecond: FRAMES_PER_SECOND,
    });

    loop.setup(onLoop);
    loop.start();

    expect(onLoop).not.toHaveBeenCalled();

    vi.advanceTimersByTime(FRAMES_PER_SECOND_INTERVAL);

    expect(onLoop).toHaveBeenCalledOnce();
  });

  it('should not call onLoop callback after stopping', () => {
    const onLoop = vi.fn();

    vi.mocked(timestampNow)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(FRAMES_PER_SECOND_INTERVAL);

    const loop = new Loop({
      framesPerSecond: FRAMES_PER_SECOND,
    });

    loop.setup(onLoop);
    loop.start();

    expect(onLoop).not.toHaveBeenCalled();

    loop.stop();

    vi.advanceTimersByTime(FRAMES_PER_SECOND_INTERVAL);

    expect(onLoop).not.toHaveBeenCalled();
  });
});
