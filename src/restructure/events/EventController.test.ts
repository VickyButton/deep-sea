import { Event } from './Event';
import { EventController } from './EventController';
import { describe, expect, it, vi } from 'vitest';

describe('EventController', () => {
  it('should not map event to listener before listening started', () => {
    const controller = new EventController();
    const event = new Event<void>();
    const listener = vi.fn();

    controller.on(event, listener);
    event.emit();

    expect(listener).not.toHaveBeenCalled();
  });

  it('should map event to listener after listening started', () => {
    const controller = new EventController();
    const event = new Event<void>();
    const listener = vi.fn();

    controller.on(event, listener);
    controller.startListening();
    event.emit();

    expect(listener).toHaveBeenCalled();
  });

  it('should not map event to listener after listening stopped', () => {
    const controller = new EventController();
    const event = new Event<void>();
    const listener = vi.fn();

    controller.on(event, listener);
    controller.startListening();
    controller.stopListening();
    event.emit();

    expect(listener).not.toHaveBeenCalled();
  });

  it('should only map event to listener once', () => {
    const controller = new EventController();
    const event = new Event<void>();
    const listener = vi.fn();

    controller.on(event, listener);
    controller.startListening();
    controller.stopListening();
    controller.startListening();
    event.emit();

    expect(listener).toHaveBeenCalledOnce();
  });

  it('should remove a listener', () => {
    const controller = new EventController();
    const event = new Event<void>();
    const listener = vi.fn();

    controller.on(event, listener);
    controller.remove(event, listener);
    controller.startListening();
    event.emit();

    expect(listener).not.toHaveBeenCalled();
  });
});
