import { ResetTransform } from '../../../../../../../src/engine/services/canvasService/canvasCommandInterpreter/canvasCommandTranslator/canvasCommand/ResetTransform';
import { describe, expect, it } from 'vitest';

describe('ResetTransform', () => {
  it('should instantiate with correct values', () => {
    expect(new ResetTransform()).toEqual({
      type: 'RESET_TRANSFORM',
    });
  });
});
