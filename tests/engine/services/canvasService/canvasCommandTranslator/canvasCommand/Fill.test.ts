import { Fill } from '../../../../../../src/engine/services/canvasService/canvasCommandTranslator/canvasCommand/Fill';
import { describe, expect, it } from 'vitest';

describe('Fill', () => {
  it('should instantiate with correct values', () => {
    expect(new Fill()).toEqual({
      type: 'FILL',
    });
  });
});
