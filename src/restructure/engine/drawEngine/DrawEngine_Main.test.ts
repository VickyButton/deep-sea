import { DrawEngine_Main } from './DrawEngine_Main';
import { Canvas_Mock } from '../../domain/canvas/Canvas_Mock';
import { DrawStepTranslator_Mock } from '../../domain/drawStep/translator/DrawStepTranslator_Mock';
import { describe, expect, it, vi } from 'vitest';

describe('DrawEngine_Main', () => {
  it('should execute draw steps on target canvas', () => {
    const canvas = new Canvas_Mock();
    const translator = new DrawStepTranslator_Mock();
    const engine = new DrawEngine_Main(canvas, translator);
    const callback = vi.fn();
    translator.translate.mockReturnValue(callback);

    engine.draw([
      {
        type: 'BEGIN_PATH',
      },
    ]);

    expect(callback).toHaveBeenCalledWith(canvas);
  });
});
