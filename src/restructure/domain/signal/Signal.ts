import type { SignalCallback } from './signal.types';

/** A signal that can emit data to registered listeners. */
export class Signal<CallbackData = void> implements Signal<CallbackData> {
  private readonly callbacks = new CallbackManager<CallbackData>();

  /** The number of listener callbacks currently registered. */
  public get callbackCount() {
    return this.callbacks.count;
  }

  /** Clears all registered listener callbacks from the signal. */
  public clear() {
    this.callbacks.clear();
  }

  /**
   * Emits the signal to all listeners.
   * @param data The data to pass to the listener callbacks.
   */
  public emit(data: CallbackData) {
    this.callbacks.executeAll(data);
  }

  /**
   * Starts listening for the signal and registers a callback to execute when emitted.
   * @param callback The callback to register.
   */
  public listen(callback: SignalCallback<CallbackData>) {
    this.callbacks.register(callback);
  }

  /**
   * Stops listening for the signal and deregisters the registered callback.
   * @param callback The callback to deregister.
   */
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
