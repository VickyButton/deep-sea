import { CanvasCommandInterpreter } from '../../../../src/engine/services/canvasService/canvasCommandInterpreter/CanvasCommandInterpreter';
import { MockCanvas } from '../../../mocks/MockCanvas';
import { MockCanvasCommandTranslator } from '../../../mocks/MockCanvasCommandTranslator';
import { describe, expect, it, vi } from 'vitest';

describe('CanvasService', () => {
  it('should execute canvas command on a canvas', () => {
    const canvas = new MockCanvas();
    const translator = new MockCanvasCommandTranslator();
    const interpreter = new CanvasCommandInterpreter(canvas, translator);
    const callback = vi.fn();
    translator.translate.mockReturnValueOnce(callback);

    interpreter.execute({
      type: 'BEGIN_PATH',
    });

    expect(callback).toHaveBeenCalledWith(canvas);
  });
});
