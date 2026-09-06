/**
 * An event that can be emitted to listeners.
 */
export interface Event<T> {
  /** The number of listeners on the event. */
  get listenerCount(): number;
  /**
   * Adds a listener to the event.
   * @param listener The listener to execute when the event is emitted.
   */
  addListener(listener: EventListener<T>): void;
  /**
   * Removes a listener from the event.
   * @param listener The listener being removed.
   */
  removeListener(listener: EventListener<T>): void;
  /** Removes all listeners from the event. */
  clear(): void;
  /**
   * Emits event data to listeners.
   * @param data The event data being emitted.
   */
  emit(data: T): void;
}

/**
 * Callback that is executed when an event is emitted.
 */
export type EventListener<T> = (data: T) => void;
