import { TimeProviderSystem } from './TimeProviderSystem';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('TimeProviderSystem', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should use system time', () => {
    const timeProvider = new TimeProviderSystem();
    const time = 0;

    vi.setSystemTime(time);

    expect(timeProvider.now).toBe(time);
  });
});
