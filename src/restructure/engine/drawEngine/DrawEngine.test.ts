import { DrawEngine } from './DrawEngine';
import { Canvas_Mock } from '../../domain/canvas/Canvas_Mock';
import { DrawStepTranslator } from '../../domain/drawStep/translator/DrawStepTranslator';
import { describe, expect, it, vi } from 'vitest';

describe('DrawEngine', () => {
  it('should execute draw steps on target canvas', () => {
    const translator = new DrawStepTranslator();
    const engine = new DrawEngine(translator);
    const canvas = new Canvas_Mock();
    const canvasBeginPathSpy = vi.spyOn(canvas, 'beginPath');

    engine.draw(canvas, [
      {
        type: 'BEGIN_PATH',
      },
    ]);

    expect(canvasBeginPathSpy).toHaveBeenCalled();
  });
});
