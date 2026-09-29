import type { Signal, SignalCallback } from '../signals/signal.types';

/** A controller used to group signal callbacks and toggle listening. */
export interface SignalController {
  /** A flag indicating if the controller is listening for signals. */
  get isListening(): boolean;
  // TODO: Add `deregister` method.
  /**
   * Registers a callback to execute when a signal is emitted.
   * @param signal The signal to listen for.
   * @param callback The callback to execute when the controller is listening and the signal is emitted.
   */
  register<CallbackData>(signal: Signal<CallbackData>, callback: SignalCallback<CallbackData>): void;
  /** Starts listening for signals. */
  startListening(): void;
  /** Stops listening for signals. */
  stopListening(): void;
}

