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
    vi.setSystemTime(0);

    expect(timeProvider.now).toBe(0);
  });
});
