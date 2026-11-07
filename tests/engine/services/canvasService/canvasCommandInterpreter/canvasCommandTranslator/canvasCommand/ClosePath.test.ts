import { ClosePath } from '../../../../../../../src/engine/services/canvasService/canvasCommandInterpreter/canvasCommandTranslator/canvasCommand/closePath/ClosePath';
import { describe, expect, it } from 'vitest';

describe('ClosePath', () => {
  it('should instantiate with correct values', () => {
    expect(new ClosePath()).toEqual({
      type: 'CLOSE_PATH',
    });
  });
});
