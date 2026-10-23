import type { Queue } from './queue.types';
import { vi } from 'vitest';

export class Queue_Mock<T> implements Queue<T> {
  private readonly items: T[] = [];

  public get front() {
    return this.items[0] ?? null;
  }

  public add = vi.fn().mockImplementation((item: T) => {
    this.items.push(item);
  });
  public remove = vi.fn().mockImplementation(() => {
    return this.items.shift() ?? null;
  });
}
