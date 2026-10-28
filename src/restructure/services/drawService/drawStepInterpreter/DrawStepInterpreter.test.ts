import { MockCanvas } from './canvas/implementations/MockCanvas';
import { DrawStepInterpreter } from './DrawStepInterpreter';
import { MockDrawStepTranslator } from './drawStepTranslator/implementations/MockDrawStepTranslator';
import { describe, expect, it, vi } from 'vitest';

describe('DrawStepInterpreter', () => {
  it('should execute draw steps using output canvas', () => {
    const canvas = new MockCanvas();
    const translator = new MockDrawStepTranslator();
    const interpreter = new DrawStepInterpreter(canvas, translator);
    const command1 = vi.fn();
    const command2 = vi.fn();
    translator.translate.mockReturnValueOnce(command1).mockReturnValueOnce(command2);

    interpreter.execute([{
      type: 'BEGIN_PATH',
    }]);
    interpreter.execute([{
      type: 'CLOSE_PATH',
    }]);

    expect(command1).toHaveBeenCalledWith(canvas);
    expect(command2).toHaveBeenCalledWith(canvas);
  });
});
