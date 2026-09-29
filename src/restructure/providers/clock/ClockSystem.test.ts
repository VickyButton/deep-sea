import { ClockSystem } from './ClockSystem';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('ClockSystem', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should use system time', () => {
    const clock = new ClockSystem();
    const time = 0;

    vi.setSystemTime(time);

    expect(clock.now).toBe(time);
  });
});
