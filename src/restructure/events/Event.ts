/**
 * An event that can be emitted to listeners.
 */
export class Event<T = unknown> {
  public readonly id: string;
  private readonly listeners = new Set<EventListener<T>>();

  constructor(id: string) {
    this.id = id;
  }

  /** The number of listeners on the event. */
  public get listenerCount() {
    return this.listeners.size;
  }

  /**
   * Adds a listener to the event.
   * @param listener The listener to execute when the event is emitted.
   */
  public addListener(listener: EventListener<T>) {
    this.listeners.add(listener);
  }

  /**
   * Removes a listener from the event.
   * @param listener The listener being removed.
   */
  public removeListener(listener: EventListener<T>) {
    this.listeners.delete(listener);
  }

  /** Removes all listeners from the event. */
  public clear() {
    this.listeners.clear();
  }

  /**
   * Emits event data to listeners.
   * @param data The event data being emitted.
   */
  public emit(data: T) {
    this.listeners.values().forEach((listener) => listener(data));
  }
}

/**
 * Callback that is executed when an event is emitted.
 */
export type EventListener<T> = (data: T) => void;
