import type { Signal, SignalCallback } from './signal.types';
import { vi } from 'vitest';

/** The mock implementation of the Signal interface. */
export class Signal_Mock<CallbackData = void> implements Signal<CallbackData> {
  private readonly callbacks = new Set<SignalCallback<CallbackData>>();

  public get callbackCount() {
    return this.callbacks.size;
  }

  public clear = vi.fn().mockImplementation(() => {
    this.callbacks.clear();
  });
  public emit = vi.fn().mockImplementation((data: CallbackData) => {
    for (const callback of this.callbacks) {
      callback(data);
    }
  });
  public listen = vi.fn().mockImplementation((callback: SignalCallback<CallbackData>) => {
    this.callbacks.add(callback);
  });
  public unlisten = vi.fn().mockImplementation((callback: SignalCallback<CallbackData>) => {
    this.callbacks.delete(callback);
  });
};
