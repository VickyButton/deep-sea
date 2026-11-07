
import { Loop } from '../../../../../src/engine/services/loopService/loop/Loop';
import { MockAnimation } from '../../../../mocks/MockAnimation';
import { MockTime } from '../../../../mocks/MockTime';
import { afterEach, beforeEach, describe, it, vi } from 'vitest';

// TODO: Rewrite after Loop rework w/ callbacks.
describe('Loop', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should emit "interval_elapsed" signal upon loop interval elapsing after starting', () => {
    const animationFrameProvider = new MockAnimation();
    const timeProvider = new MockTime();
    const loop = new Loop(animationFrameProvider, timeProvider);
    const loopsPerSecond = 1;
    const loopsPerSecondInterval = 1000;

    loop.setLoopsPerSecond(loopsPerSecond);
    loop.start();
    advanceTime(loopsPerSecondInterval, timeProvider);
  });

  it('should emit "interval_elapsed" signal upon loop interval elapsing after stopping', () => {
    const animationFrameProvider = new MockAnimation();
    const timeProvider = new MockTime();
    const loop = new Loop(animationFrameProvider, timeProvider);
    const loopsPerSecond = 1;
    const loopsPerSecondInterval = 1000;

    loop.setLoopsPerSecond(loopsPerSecond);
    loop.start();
    advanceTime(loopsPerSecondInterval, timeProvider);
    loop.stop();
    advanceTime(loopsPerSecondInterval, timeProvider);
  });
});

function advanceTime(ms: number, timeProvider: MockTime) {
  advanceClockByTime(timeProvider, ms);
  advanceTimersByTime(ms);
}

function advanceClockByTime(timeProvider: MockTime, ms: number) {
  timeProvider.now += ms;
}

function advanceTimersByTime(ms: number) {
  vi.advanceTimersByTime(ms);
}
