import { DrawLine } from '../../../../../../../src/engine/services/canvasService/canvasCommandInterpreter/canvasCommandTranslator/canvasCommand/drawLine/DrawLine';
import { describe, expect, it } from 'vitest';

describe('DrawLine', () => {
  it('should instantiate with correct values', () => {
    expect(new DrawLine(1, 2, 3, 4)).toEqual({
      type: 'DRAW_LINE',
      fromX: 1,
      fromY: 2,
      toX: 3,
      toY: 4,
    });
  });
});
