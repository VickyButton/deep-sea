import type { Event, EventListener } from '../events/Event';

/** Maps events to their listeners. */
export class EventController {
  protected readonly listeners = new Map<Event, EventListener>();

  /**
   * Assigns an event listener to an event.
   * @param event The event to listen for.
   * @param listener The callback to execute once the event has been emitted.
   */
  public on<T>(event: Event<T>, listener: EventListener<T>) {
    this.listeners.set(event as Event, listener as EventListener);
  }

  /** Starts listening for events. */
  public startListening() {
    for (const [event, listener] of this.listeners) {
      event.addListener(listener);
    }
  }

  /** Stops listening for events. */
  public stopListening() {
    for (const [event, listener] of this.listeners) {
      event.removeListener(listener);
    }
  }
}
