import { SetStrokeColor } from '../../../../../../src/engine/services/canvasService/canvasCommandTranslator/canvasCommand/SetStrokeColor';
import { describe, expect, it } from 'vitest';

describe('SetStrokeColor', () => {
  it('should instantiate with correct values', () => {
    expect(new SetStrokeColor('COLOR')).toEqual({
      type: 'SET_STROKE_COLOR',
      color: 'COLOR',
    });
  });
});
