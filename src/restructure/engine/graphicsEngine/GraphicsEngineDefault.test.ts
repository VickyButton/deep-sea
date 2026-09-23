import { GraphicsEngineDefault } from './GraphicsEngineDefault';
import { describe, expect, it, vi } from 'vitest';

describe('GraphicsEngineDefault', () => {
  it('should clear canvas', () => {
    const canvas = new Canvas();
    const engine = new GraphicsEngineDefault(canvas);

    engine.clearCanvas();

    expect(canvas.clear).toHaveBeenCalled();
  });

  it('should draw onto canvas using draw commands', () => {
    const canvas = new Canvas();
    const engine = new GraphicsEngineDefault(canvas);
    const drawCommand = {
      id: 'draw-command',
      zIndex: 0,
      draw: vi.fn(),
    };

    engine.queueDrawCommand(drawCommand);
    engine.processDrawCommandQueue();

    expect(drawCommand.draw).toHaveBeenCalledWith(canvas);
  });

  it('should process queued commands in order of z-index', () => {
    const canvas = new Canvas();
    const engine = new GraphicsEngineDefault(canvas);
    const drawCommandZ0 = {
      id: 'draw-command-z0',
      zIndex: 0,
      draw: vi.fn(),
    };
    const drawCommandZ1 = {
      id: 'draw-command-z1',
      draw: vi.fn(),
      zIndex: 1,
    };

    engine.queueDrawCommand(drawCommandZ1);
    engine.queueDrawCommand(drawCommandZ0);
    engine.processDrawCommandQueue();

    expect(drawCommandZ0.draw).toHaveBeenCalledBefore(drawCommandZ1.draw);
  });

  it('should cache command after processing', () => {
    const canvas = new Canvas();
    const engine = new GraphicsEngineDefault(canvas);
    const drawCommand = {
      id: 'draw-command',
      zIndex: 0,
      draw: vi.fn(),
    };

    engine.queueDrawCommand(drawCommand);
    engine.processDrawCommandQueue();
    engine.processDrawCommandQueue();

    expect(drawCommand.draw).toHaveBeenCalledTimes(2);
  });

  it('should delete cached command', () => {
    const canvas = new Canvas();
    const engine = new GraphicsEngineDefault(canvas);
    const drawCommand = {
      id: 'draw-command',
      zIndex: 0,
      draw: vi.fn(),
    };

    engine.queueDrawCommand(drawCommand);
    engine.processDrawCommandQueue();
    engine.deleteCachedDrawCommand('draw-command');
    engine.processDrawCommandQueue();

    expect(drawCommand.draw).toHaveBeenCalledOnce();
  });

  it('should clear command queue', () => {
    const canvas = new Canvas();
    const engine = new GraphicsEngineDefault(canvas);
    const drawCommand = {
      id: 'draw-command',
      zIndex: 0,
      draw: vi.fn(),
    };

    engine.queueDrawCommand(drawCommand);
    engine.clearDrawCommandQueue();
    engine.processDrawCommandQueue();

    expect(drawCommand.draw).not.toHaveBeenCalled();
  });
});

const Canvas = vi.fn(class {
  width = 0;
  height = 0;
  beginPath = vi.fn();
  closePath = vi.fn();
  setTransform = vi.fn();
  resetTransform = vi.fn();
  createLine = vi.fn();
  createArc = vi.fn();
  createRectangle = vi.fn();
  setStrokeColor = vi.fn();
  stroke = vi.fn();
  setFillColor = vi.fn();
  fill = vi.fn();
  clear = vi.fn();
});
