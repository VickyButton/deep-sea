import { SetFillColor } from '../../../../../../../src/engine/services/canvasService/canvasCommandInterpreter/canvasCommandTranslator/canvasCommand/setFillColor/SetFillColor';
import { describe, expect, it } from 'vitest';

describe('SetFillColor', () => {
  it('should instantiate with correct values', () => {
    expect(new SetFillColor('COLOR')).toEqual({
      type: 'SET_FILL_COLOR',
      color: 'COLOR',
    });
  });
});
