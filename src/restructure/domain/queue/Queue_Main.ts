import type { Queue } from './queue.types';

/** The main implementation of the Queue interface. */
export class Queue_Main<T> implements Queue<T> {
  private readonly items: T[] = [];

  public get front() {
    return this.items[0] ?? null;
  }

  public add(item: T) {
    this.items.push(item);
  }

  public remove() {
    return this.items.shift() ?? null;
  }
}
