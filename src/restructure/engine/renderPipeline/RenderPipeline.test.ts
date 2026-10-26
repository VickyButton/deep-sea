import { RenderPipeline } from './RenderPipeline';
import { CanvasProvider_Mock } from '../../providers/canvasProvider/CanvasProvider_Mock';
import { describe, expect, it, vi } from 'vitest';

describe('RenderPipeline', () => {
  it('should render an image using the provided steps', () => {
    const step1 = vi.fn();
    const step2 = vi.fn();
    const pipeline = new RenderPipeline();
    const canvas = new CanvasProvider_Mock().createCanvas(1, 1);

    pipeline.addStep(step1);
    pipeline.addStep(step2);
    pipeline.run(canvas);

    expect(step1).toHaveBeenCalled();
    expect(step2).toHaveBeenCalledAfter(step1);
  });
});
