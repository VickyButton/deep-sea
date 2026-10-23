import type { Queue } from './queue.types';

/** The main implementation of the Queue interface. */
export class Queue_Main<T> implements Queue<T> {
  private readonly _items: T[] = [];

  public get front() {
    return this._items[0] ?? null;
  }

  public get items() {
    return this._items;
  }

  public add(item: T) {
    this._items.push(item);
  }

  public remove() {
    return this._items.shift() ?? null;
  }
}
