import { DrawInstructionsQueue } from './DrawInstructionsQueue';
import { describe, expect, it } from 'vitest';

describe('DrawInstructionsQueue', () => {
  it('should have no queued instructions by default', () => {
    expect(new DrawInstructionsQueue().items).toEqual([]);
  });

  it('should add instructions to the back of the queue', () => {
    const queue = new DrawInstructionsQueue();
    const instructions1 = {
      zIndex: 0,
      steps: [],
    };
    const instructions2 = {
      zIndex: 0,
      steps: [],
    };

    queue.add(instructions1);
    queue.add(instructions2);

    expect(queue.items).toEqual([
      instructions1,
      instructions2,
    ]);
  });

  it('should clear the queue', () => {
    const queue = new DrawInstructionsQueue();
    const instructions = {
      zIndex: 0,
      steps: [],
    };

    queue.add(instructions);
    queue.clear();

    expect(queue.items).toEqual([]);
  });
});
