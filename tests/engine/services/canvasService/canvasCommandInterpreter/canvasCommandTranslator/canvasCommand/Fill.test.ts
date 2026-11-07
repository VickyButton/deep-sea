import { Fill } from '../../../../../../../src/engine/services/canvasService/canvasCommandInterpreter/canvasCommandTranslator/canvasCommand/fill/Fill';
import { describe, expect, it } from 'vitest';

describe('Fill', () => {
  it('should instantiate with correct values', () => {
    expect(new Fill()).toEqual({
      type: 'FILL',
    });
  });
});
