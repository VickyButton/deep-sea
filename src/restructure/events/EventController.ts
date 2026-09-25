import type { Event, EventListener } from '../events/Event';

/** Maps events to their listeners. */
export class EventController {
  private isListening = false;
  private readonly listeners = new Map<Event, EventListener>();

  /**
   * Assigns an event listener to an event.
   * @param event The event to listen for.
   * @param listener The callback to execute once the event has been emitted.
   */
  public on<T>(event: Event<T>, listener: EventListener<T>) {
    this.listeners.set(event as Event, listener as EventListener);

    if (this.isListening) {
      this.addListenerToEvent(event, listener);
    }
  }

  private addListenerToEvent<T>(event: Event<T>, listener: EventListener<T>) {
    event.addListener(listener);
  }

  /**
   * Removes an event listener from an event.
   * @param event The event to remove a listener from.
   * @param listener The listener to remove.
   */
  public remove<T>(event: Event<T>, listener: EventListener<T>) {
    this.listeners.delete(event as Event);

    if (this.isListening) {
      this.removeListenerFromEvent(event, listener);
    }
  }

  private removeListenerFromEvent<T>(event: Event<T>, listener: EventListener<T>) {
    event.removeListener(listener);
  }

  /** Starts listening for events. */
  public startListening() {
    this.listen();

    for (const [event, listener] of this.listeners) {
      this.addListenerToEvent(event, listener);
    }
  }

  private listen() {
    this.isListening = true;
  }

  /** Stops listening for events. */
  public stopListening() {
    this.unlisten();

    for (const [event, listener] of this.listeners) {
      this.removeListenerFromEvent(event, listener);
    }
  }

  private unlisten() {
    this.isListening = false;
  }
}
