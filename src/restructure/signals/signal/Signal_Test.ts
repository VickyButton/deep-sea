import type { Signal } from './signal.types';
import { vi } from 'vitest';

/** The test implementation of the Signal interface. */
export class Signal_Test<CallbackData = void> implements Signal<CallbackData> {
  public get callbackCount() {
    return 0;
  }

  public clear = vi.fn();
  public emit = vi.fn();
  public listen = vi.fn();
  public unlisten = vi.fn();
};
