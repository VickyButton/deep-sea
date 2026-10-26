import { Queue } from './Queue';
import { describe, expect, it } from 'vitest';

describe('Queue', () => {
  it('should have no front item by default', () => {
    expect(new Queue().front).toBe(null);
  });

  it('should get the front item in the queue', () => {
    const queue = new Queue();

    queue.add(1);
    queue.add(2);

    expect(queue.front).toBe(1);
  });

  it('should add an item to the queue', () => {
    const queue = new Queue();

    queue.add(1);

    expect(queue.front).toBe(1);
  });

  it('should remove the front item from the queue', () => {
    const queue = new Queue();

    queue.add(1);

    expect(queue.remove()).toBe(1);
    expect(queue.front).toBe(null);
  });
});
