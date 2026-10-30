import { DrawRectangle } from './DrawRectangle';
import { describe, expect, it } from 'vitest';

describe('DrawRectangle', () => {
  it('should instantiate with correct values', () => {
    expect(new DrawRectangle(1, 2, 3, 4)).toEqual({
      type: 'DRAW_RECTANGLE',
      x: 1,
      y: 2,
      width: 3,
      height: 4,
    });
  });
});
