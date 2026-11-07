import { BeginPath } from '../../../../../../../src/engine/services/canvasService/canvasCommandInterpreter/canvasCommandTranslator/canvasCommand/BeginPath';
import { describe, expect, it } from 'vitest';

describe('BeginPath', () => {
  it('should instantiate with correct values', () => {
    expect(new BeginPath()).toEqual({
      type: 'BEGIN_PATH',
    });
  });
});
