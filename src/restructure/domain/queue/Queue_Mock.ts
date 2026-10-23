import type { Queue } from './queue.types';
import { vi } from 'vitest';

export class Queue_Mock<T> implements Queue<T> {
  private readonly _items: T[] = [];

  public get front() {
    return this._items[0] ?? null;
  }

  public get items() {
    return this._items;
  }

  public add = vi.fn().mockImplementation((item: T) => {
    this._items.push(item);
  });
  public remove = vi.fn().mockImplementation(() => {
    return this._items.shift() ?? null;
  });
}
