/** A signal that can emit data to registered listeners. */
export interface Signal<CallbackData = void> {
  /** The name of the signal. */
  readonly name: string;
  /** The number of listener callbacks currently registered. */
  get callbackCount(): number;
  /** Clears all registered listener callbacks from the signal. */
  clear(): void;
  /**
   * Emits the signal to all listeners.
   * @param data The data to pass to the listener callbacks.
   */
  emit(data: CallbackData): void;
  /**
   * Starts listening for the signal and registers a callback to execute when emitted.
   * @param callback The callback to register.
   */
  listen(callback: SignalCallback<CallbackData>): void;
  /**
   * Stops listening for the signal and deregisters the registered callback.
   * @param callback The callback to deregister.
   */
  unlisten(callback: SignalCallback<CallbackData>): void;
}

/** A callback that executes when a signal is emitted. */
export type SignalCallback<CallbackData> = (data: CallbackData) => void;
