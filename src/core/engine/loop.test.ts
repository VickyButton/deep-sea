import { timestampNow } from '@core/utils/dateTimeProvider';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useLoop } from './loop';

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

describe('loop', () => {
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

    const loop = useLoop();

    loop.setLoopCallback(onLoop);
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

    const loop = useLoop();

    loop.setLoopCallback(onLoop);
    loop.start();

    expect(onLoop).not.toHaveBeenCalled();

    loop.stop();

    vi.advanceTimersByTime(FRAMES_PER_SECOND_INTERVAL);

    expect(onLoop).not.toHaveBeenCalled();
  });
});
