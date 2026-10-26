import { RenderPipeline } from './RenderPipeline';
import { CanvasProvider_Mock } from '../../providers/canvasProvider/CanvasProvider_Mock';
import { describe, expect, it, vi } from 'vitest';

describe('RenderPipeline', () => {
  it('should render an image using the provided steps', () => {
    const step1 = vi.fn();
    const step2 = vi.fn();
    const pipeline = new RenderPipeline([step1, step2]);
    const canvas = new CanvasProvider_Mock().createCanvas(1, 1);

    pipeline.render(canvas);

    expect(step1).toHaveBeenCalled();
    expect(step2).toHaveBeenCalledAfter(step1);
  });
});
