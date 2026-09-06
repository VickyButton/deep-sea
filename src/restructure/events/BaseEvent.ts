import type { EventListener } from '../domain/event.types';
import type { Event } from '../domain/event.types';

export class BaseEvent<T = unknown> implements Event<T> {
  private readonly listeners = new Set<EventListener<T>>();

  public get listenerCount() {
    return this.listeners.size;
  }

  public addListener(listener: EventListener<T>) {
    this.listeners.add(listener);
  }

  public removeListener(listener: EventListener<T>) {
    this.listeners.delete(listener);
  }

  public clear() {
    this.listeners.clear();
  }

  public emit(data: T) {
    this.listeners.values().forEach((listener) => listener(data));
  }
}
