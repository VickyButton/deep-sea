import { SetTransform } from './SetTransform';
import { describe, expect, it } from 'vitest';

describe('SetTransform', () => {
  it('should instantiate with correct values', () => {
    expect(new SetTransform(1, 2, 3, 4, 5, 6)).toEqual({
      type: 'SET_TRANSFORM',
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
    });
  });
});
