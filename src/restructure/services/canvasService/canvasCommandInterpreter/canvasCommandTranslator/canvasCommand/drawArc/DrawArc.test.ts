import { DrawArc } from './DrawArc';
import { describe, expect, it } from 'vitest';

describe('DrawArc', () => {
  it('should instantiate with correct values', () => {
    expect(new DrawArc(1, 2, 3, 4, 5, true)).toEqual({
      type: 'DRAW_ARC',
      x: 1,
      y: 2,
      radius: 3,
      startAngle: 4,
      endAngle: 5,
      counterClockwise: true,
    });
  });
});
