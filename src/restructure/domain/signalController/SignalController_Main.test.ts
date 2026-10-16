import { SignalController_Main } from './SignalController_Main';
import { describe, expect, it, vi } from 'vitest';

describe('SignalController_Main', () => {
  it('should not be listening by default', () => {
    expect(new SignalController_Main().isListening).toBe(false);
  });

  it('should start listening', () => {
    const controller = new SignalController_Main();

    controller.startListening();

    expect(controller.isListening).toBe(true);
  });

  it('should stop listening', () => {
    const controller = new SignalController_Main();

    controller.stopListening();

    expect(controller.isListening).toBe(false);
  });

  it('should register a signal delegator before listening started', () => {
    const controller = new SignalController_Main();
    const signal = new Signal();
    const callback = vi.fn();

    controller.register(signal, callback);
    controller.startListening();

    expect(signal.callbackCount).toBe(1);
  });

  it('should register a signal delegator after listening started', () => {
    const controller = new SignalController_Main();
    const signal = new Signal();
    const callback = vi.fn();

    controller.startListening();
    controller.register(signal, callback);

    expect(signal.callbackCount).toBe(1);
  });

  it('should deregister a signal delegator for a signal after listening stopped', () => {
    const controller = new SignalController_Main();
    const signal = new Signal();
    const callback = vi.fn();

    controller.startListening();
    controller.register(signal, callback);
    controller.stopListening();

    expect(signal.callbackCount).toBe(0);
  });

  it('should execute callbacks under a signal delegator', () => {
    const controller = new SignalController_Main();
    const signal = new Signal();
    const callback = vi.fn();

    controller.register(signal, callback);
    controller.startListening();
    signal.emit();

    expect(callback).toHaveBeenCalled();
  });

  it('should only register one delegator per signal', () => {
    const controller = new SignalController_Main();
    const signal = new Signal();
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    controller.register(signal, callback1);
    controller.register(signal, callback2);
    controller.startListening();
    signal.emit();

    expect(callback1).toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();
    expect(signal.callbackCount).toBe(1);
  });

  it('should deregister a callback from a signal delegator before starting', () => {
    const controller = new SignalController_Main();
    const signal = new Signal();
    const callback = vi.fn();

    controller.register(signal, callback);
    controller.deregister(signal, callback);
    controller.startListening();

    expect(signal.callbackCount).toBe(0);
  });

  it('should deregister a callback from a signal delegator after starting', () => {
    const controller = new SignalController_Main();
    const signal = new Signal();
    const callback = vi.fn();

    controller.register(signal, callback);
    controller.startListening();
    controller.deregister(signal, callback);

    expect(signal.callbackCount).toBe(0);
  });

  it('should not deregister a signal delegator while listening if callbacks still registered under delegator', () => {
    const controller = new SignalController_Main();
    const signal = new Signal();
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    controller.register(signal, callback1);
    controller.register(signal, callback2);
    controller.startListening();
    controller.deregister(signal, callback1);

    expect(signal.callbackCount).toBe(1);
  });

  it('should clear all signal delegators', () => {
    const controller = new SignalController_Main();
    const signal = new Signal();
    const callback = vi.fn();

    controller.register(signal, callback);
    controller.startListening();
    controller.clear();

    expect(signal.callbackCount).toBe(0);
  });
});

class Signal<T = void> {
  public readonly name = 'signal';
  private readonly callbacks = new Set<(data: T) => void>();

  public get callbackCount() {
    return this.callbacks.size;
  }

  public clear() {
    this.callbacks.clear();
  }

  public emit(data: T) {
    this.callbacks.forEach((callback) => callback(data));
  }

  public listen(callback: (data: T) => void) {
    this.callbacks.add(callback);
  }

  public unlisten(callback: (data: T) => void) {
    this.callbacks.delete(callback);
  }
}
