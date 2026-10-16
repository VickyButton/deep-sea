import { Clock_System } from './Clock_System';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('Clock_System', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should use system time', () => {
    const clock = new Clock_System();
    const time = 0;

    vi.setSystemTime(time);

    expect(clock.now).toBe(time);
  });
});
