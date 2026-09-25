import { Event } from './Event';
import { EventController } from './EventController';
import { describe, expect, it, vi } from 'vitest';

describe('EventController', () => {
  it('should listen for event if callback added before listening started', () => {
    const controller = new EventController();
    const event = new Event<void>();
    const callback = vi.fn();

    controller.on(event, callback);
    controller.startListening();
    event.emit();

    expect(callback).toHaveBeenCalledOnce();
  });

  it('should accept multiple callbacks per listener', () => {
    const controller = new EventController();
    const event = new Event<void>();
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    controller.on(event, callback1);
    controller.on(event, callback2);
    controller.startListening();
    event.emit();

    expect(callback1).toHaveBeenCalledOnce();
    expect(callback2).toHaveBeenCalledOnce();
  });

  it('should listen for event if callback added after listening started', () => {
    const controller = new EventController();
    const event = new Event<void>();
    const callback = vi.fn();

    controller.startListening();
    controller.on(event, callback);
    event.emit();

    expect(callback).toHaveBeenCalledOnce();
  });

  it('should not listen for event after listening stopped', () => {
    const controller = new EventController();
    const event = new Event<void>();
    const callback = vi.fn();

    controller.on(event, callback);
    controller.startListening();
    controller.stopListening();
    event.emit();

    expect(callback).not.toHaveBeenCalled();
  });

  it('should listen for event after listening restarted', () => {
    const controller = new EventController();
    const event = new Event<void>();
    const callback = vi.fn();

    controller.on(event, callback);
    controller.startListening();
    controller.stopListening();
    controller.startListening();
    event.emit();

    expect(callback).toHaveBeenCalledOnce();
  });

  it('should not listen for event before listening started', () => {
    const controller = new EventController();
    const event = new Event<void>();
    const callback = vi.fn();

    controller.on(event, callback);
    event.emit();

    expect(callback).not.toHaveBeenCalled();
  });

  it('should not listen for event if callback is removed before starting', () => {
    const controller = new EventController();
    const event = new Event<void>();
    const callback = vi.fn();

    controller.on(event, callback);
    controller.remove(event, callback);
    controller.startListening();
    event.emit();

    expect(callback).not.toHaveBeenCalled();
  });

  it('should not listen for event if callback is removed after starting', () => {
    const controller = new EventController();
    const event = new Event<void>();
    const callback = vi.fn();

    controller.startListening();
    controller.on(event, callback);
    controller.remove(event, callback);
    event.emit();

    expect(callback).not.toHaveBeenCalled();
  });
});
