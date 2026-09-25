import type { Event, EventListener } from '../events/Event';

/** Maps events to their listeners. */
export class EventController {
  private readonly delegators = new Map<Event, EventListener>();
  private readonly callbacks = new Map<Event, Set<EventListener>>();
  private isListening = false;

  /**
   * Assigns a callback to execute when an event is emitted.
   * @param event The event to listen for.
   * @param callback The callback for the event.
   */
  public on<T>(event: Event<T>, callback: EventListener<T>) {
    this.addCallback(event as Event, callback as EventListener);
  }

  private addCallback(event: Event, callback: EventListener) {
    const eventCallbacks = this.getCallbacks(event);

    eventCallbacks.add(callback);

    this.setCallbacks(event, eventCallbacks);

    if (!this.hasDelegator(event)) {
      const delegator = this.createDelegator(event);

      this.addDelegator(event, delegator);

      if (this.isListening) {
        this.addListener(event, delegator);
      }
    }
  }

  private getCallbacks(event: Event) {
    return this.callbacks.get(event as Event) ?? new Set();
  }

  private setCallbacks(event: Event, callbacks: Set<EventListener>) {
    this.callbacks.set(event, callbacks);
  }

  private hasDelegator(event: Event) {
    return this.delegators.has(event);
  }

  private createDelegator(event: Event) {
    return (data: unknown) => {
      this.getCallbacks(event).forEach((callback) => callback(data));
    };
  }

  private addDelegator(event: Event, delegator: EventListener) {
    this.delegators.set(event, delegator);
  }

  private addListener(event: Event, delegator: EventListener) {
    event.addListener(delegator);
  }

  /**
   * Removes a callback from an event.
   * @param event The event being listened for.
   * @param callback The callback for the event.
   */
  public remove<T>(event: Event<T>, callback: EventListener<T>) {
    this.removeCallback(event as Event, callback as EventListener);
  }

  private removeCallback(event: Event, callback: EventListener) {
    const eventCallbacks = this.callbacks.get(event);

    if (eventCallbacks === undefined) {
      return;
    }

    eventCallbacks.delete(callback);

    if (eventCallbacks.size === 0) {
      this.callbacks.delete(event);

      const delegator = this.delegators.get(event);

      if (delegator === undefined) {
        return;
      }

      this.removeDelegator(event);

      if (this.isListening) {
        this.removeListener(event, delegator);
      }
    }
  }

  private removeDelegator(event: Event) {
    this.delegators.delete(event);
  }

  private removeListener(event: Event, delegator: EventListener) {
    event.removeListener(delegator);
  }

  /** Starts listening for events. */
  public startListening() {
    this.listen();

    for (const [event, delegator] of this.delegators) {
      this.addListener(event, delegator);
    }
  }

  private listen() {
    this.isListening = true;
  }

  /** Stops listening for events. */
  public stopListening() {
    this.unlisten();

    for (const [event, delegator] of this.delegators) {
      this.removeListener(event, delegator);
    }
  }

  private unlisten() {
    this.isListening = false;
  }
}
