import { Event } from './Event';
import { describe, expect, it, vi } from 'vitest';

describe('Event', () => {
  it('should have no listeners by default', () => {
    const event = new Event('event');

    expect(event.listenerCount).toBe(0);
  });

  it('should add a listener', () => {
    const event = new Event('event');

    event.addListener(vi.fn());

    expect(event.listenerCount).toBe(1);
  });

  it('should remove a listener', () => {
    const event = new Event('event');
    const listener = vi.fn();

    event.addListener(listener);
    event.removeListener(listener);

    expect(event.listenerCount).toBe(0);
  });

  it('should remove all listeners', () => {
    const event = new Event('event');
    const listener = vi.fn();

    event.addListener(listener);
    event.clear();

    expect(event.listenerCount).toBe(0);
  });

  it('should emit event data to listeners', () => {
    const event = new Event('event');
    const listener = vi.fn();
    const data = 'EVENT_DATA';

    event.addListener(listener);
    event.emit(data);

    expect(listener).toHaveBeenCalledWith(data);
  });
});
