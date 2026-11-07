import { Stroke } from '../../../../../../src/engine/services/canvasService/canvasCommandTranslator/canvasCommand/Stroke';
import { describe, expect, it } from 'vitest';

describe('Stroke', () => {
  it('should instantiate with correct values', () => {
    expect(new Stroke()).toEqual({
      type: 'STROKE',
    });
  });
});
