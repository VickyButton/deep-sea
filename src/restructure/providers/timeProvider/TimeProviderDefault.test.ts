import { TimeProviderDefault } from './TimeProviderDefault';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('TimeProviderDefault', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should use system time', () => {
    const timeProvider = new TimeProviderDefault();
    const time = 0;

    vi.setSystemTime(time);

    expect(timeProvider.now).toBe(time);
  });
});
