import type { Signal, SignalCallback } from './signal.types';

/** The main implementation of the Signal interface. */
export class Signal_Main<CallbackData = void> implements Signal<CallbackData> {
  private readonly callbacks = new CallbackManager<CallbackData>();

  public get callbackCount() {
    return this.callbacks.count;
  }

  public clear() {
    this.callbacks.clear();
  }

  public emit(data: CallbackData) {
    this.callbacks.executeAll(data);
  }

  public listen(callback: SignalCallback<CallbackData>) {
    this.callbacks.register(callback);
  }

  public unlisten(callback: SignalCallback<CallbackData>) {
    this.callbacks.deregister(callback);
  }
}

/** Manages callbacks. */
class CallbackManager<CallbackData> {
  private readonly callbacks = new Set<SignalCallback<CallbackData>>();

  /** The number of callbacks currently registered. */
  public get count() {
    return this.callbacks.size;
  }

  /** Clears all registered callbacks. */
  public clear() {
    this.callbacks.clear();
  }

  /**
   * Executes all callbacks.
   * @param data The data to pass to each callback.
   */
  public executeAll(data: CallbackData) {
    this.callbacks.forEach((callback) => callback(data));
  }

  /**
   * Deregisters a callback.
   * @param callback The callback to deregister.
   */
  public deregister(callback: SignalCallback<CallbackData>) {
    this.callbacks.delete(callback);
  }

  /**
   * Registers a callback.
   * @param callback The callback to register.
   */
  public register(callback: SignalCallback<CallbackData>) {
    this.callbacks.add(callback);
  }
}
