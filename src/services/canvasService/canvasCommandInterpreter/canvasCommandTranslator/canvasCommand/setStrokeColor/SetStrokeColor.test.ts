import { SetStrokeColor } from './SetStrokeColor';
import { describe, expect, it } from 'vitest';

describe('SetStrokeColor', () => {
  it('should instantiate with correct values', () => {
    expect(new SetStrokeColor('COLOR')).toEqual({
      type: 'SET_STROKE_COLOR',
      color: 'COLOR',
    });
  });
});
