import { DrawInstructionsSorter } from './DrawInstructionsSorter';
import { describe, expect, it } from 'vitest';

describe('DrawInstructionsSorter', () => {
  it('should sort instructions by ascending z-index', () => {
    const sorter = new DrawInstructionsSorter();
    const instructions1 = {
      zIndex: 0,
      steps: [],
    };
    const instructions2 = {
      zIndex: 1,
      steps: [],
    };
    const instructions3 = {
      zIndex: 2,
      steps: [],
    };
    const list = [
      instructions3,
      instructions1,
      instructions2,
    ];

    expect(sorter.sort(list)).toEqual([
      instructions1,
      instructions2,
      instructions3,
    ]);
  });
});
