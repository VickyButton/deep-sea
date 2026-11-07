import { CanvasService } from '../../../../src/engine/services/canvasService/CanvasService';
import { MockCanvas } from '../../../mocks/MockCanvas';
import { describe, expect, it } from 'vitest';

describe('CanvasService', () => {
  it('should execute canvas command on a canvas', () => {
    const canvas = new MockCanvas();
    const service = new CanvasService(canvas);

    service.execute({
      type: 'BEGIN_PATH',
    });

    expect(canvas.beginPath).toHaveBeenCalled();
  });
});
