import { Event } from './Event';
import { EventController } from './EventController';
import { describe, expect, it, vi } from 'vitest';

describe('EventController', () => {
  it('should listen for event if listener added before listening started', () => {
    const controller = new EventController();
    const event = new Event<void>();
    const listener = vi.fn();

    controller.on(event, listener);
    controller.startListening();
    event.emit();

    expect(listener).toHaveBeenCalledOnce();
  });

  it('should listen for event if listener added after listening started', () => {
    const controller = new EventController();
    const event = new Event<void>();
    const listener = vi.fn();

    controller.startListening();
    controller.on(event, listener);
    event.emit();

    expect(listener).toHaveBeenCalledOnce();
  });

  it('should not listen for event after listening stopped', () => {
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

  it('should not listen for event before listening started', () => {
    const controller = new EventController();
    const event = new Event<void>();
    const listener = vi.fn();

    controller.on(event, listener);
    event.emit();

    expect(listener).not.toHaveBeenCalled();
  });

  it('should not listen for event if listener is removed before starting', () => {
    const controller = new EventController();
    const event = new Event<void>();
    const listener = vi.fn();

    controller.on(event, listener);
    controller.remove(event, listener);
    controller.startListening();
    event.emit();

    expect(listener).not.toHaveBeenCalled();
  });

  it('should not listen for event if listener is removed after starting', () => {
    const controller = new EventController();
    const event = new Event<void>();
    const listener = vi.fn();

    controller.startListening();
    controller.on(event, listener);
    controller.remove(event, listener);
    event.emit();

    expect(listener).not.toHaveBeenCalled();
  });
});
