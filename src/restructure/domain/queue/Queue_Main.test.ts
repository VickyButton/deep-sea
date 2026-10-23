import { Queue_Main } from './Queue_Main';
import { describe, expect, it } from 'vitest';

describe('Queue_Main', () => {
  it('should have no front item by default', () => {
    expect(new Queue_Main().front).toBe(null);
  });

  it('should get the front item in the queue', () => {
    const queue = new Queue_Main();

    queue.add(1);
    queue.add(2);

    expect(queue.front).toBe(1);
  });

  it('should have no items by default', () => {
    expect(new Queue_Main().items).toEqual([]);
  });

  it('should add an item to the queue', () => {
    const queue = new Queue_Main();

    queue.add(1);

    expect(queue.front).toBe(1);
    expect(queue.items).toEqual([1]);
  });

  it('should remove the front item from the queue', () => {
    const queue = new Queue_Main();

    queue.add(1);

    expect(queue.remove()).toBe(1);
    expect(queue.front).toBe(null);
    expect(queue.items).toEqual([]);
  });
});
