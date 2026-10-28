import { CanvasCommandInterpreter } from './CanvasCommandInterpreter';
import { MockCanvas } from './canvasCommandTranslator/canvas/MockCanvas';
import { MockCanvasCommandTranslator } from './canvasCommandTranslator/MockCanvasCommandTranslator';
import { describe, expect, it, vi } from 'vitest';

describe('CanvasCommandInterpreter', () => {
  it('should execute canvas command on an output canvas', () => {
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
