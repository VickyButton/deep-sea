import type { Signal, SignalCallback } from '../signals/signal/signal.types';

/** A controller used to delegate signal callbacks and toggle listening. */
export interface SignalController {
  /** A flag indicating if the controller is listening for signals. */
  get isListening(): boolean;
  /** Clears all signal delegators. */
  clear(): void;
  /**
   * Deregisters a callback from a signal delegator.
   * @param signal The signal the callback is grouped under.
   * @param callback The callback to deregister.
   */
  deregister<CallbackData>(signal: Signal<CallbackData>, callback: SignalCallback<CallbackData>): void;
  /**
   * Registers a callback to a signal delegator.
   * @param signal The signal the callback should be grouped under.
   * @param callback The callback to register.
   */
  register<CallbackData>(signal: Signal<CallbackData>, callback: SignalCallback<CallbackData>): void;
  /** Starts listening for signals. */
  startListening(): void;
  /** Stops listening for signals. */
  stopListening(): void;
}

