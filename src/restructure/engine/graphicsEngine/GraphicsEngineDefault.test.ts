import { GraphicsEngineDefault } from './GraphicsEngineDefault';
import { describe, expect, it, vi } from 'vitest';

describe('GraphicsEngineDefault', () => {
  it('should not draw to canvas if no canvas set', () => {
    const graphicsEngine = new GraphicsEngineDefault();
    const drawCommand = {
      id: 'draw-command',
      zIndex: 0,
      draw: vi.fn(),
    };

    graphicsEngine.queueDrawCommand(drawCommand);
    graphicsEngine.processDrawCommandQueue();

    expect(drawCommand.draw).not.toHaveBeenCalled();
  });

  it('should draw to target canvas using draw commands', () => {
    const graphicsEngine = new GraphicsEngineDefault();
    const graphicsCanvas = new GraphicsCanvas();
    const drawCommand = {
      id: 'draw-command',
      zIndex: 0,
      draw: vi.fn(),
    };

    graphicsEngine.setTargetCanvas(graphicsCanvas);
    graphicsEngine.queueDrawCommand(drawCommand);
    graphicsEngine.processDrawCommandQueue();

    expect(drawCommand.draw).toHaveBeenCalledWith(graphicsCanvas);
  });

  it('should process queued commands in order of z-index', () => {
    const graphicsEngine = new GraphicsEngineDefault();
    const graphicsCanvas = new GraphicsCanvas();
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

    graphicsEngine.setTargetCanvas(graphicsCanvas);
    graphicsEngine.queueDrawCommand(drawCommandZ1);
    graphicsEngine.queueDrawCommand(drawCommandZ0);
    graphicsEngine.processDrawCommandQueue();

    expect(drawCommandZ0.draw).toHaveBeenCalledBefore(drawCommandZ1.draw);
  });

  it('should cache command after processing', () => {
    const graphicsEngine = new GraphicsEngineDefault();
    const graphicsCanvas = new GraphicsCanvas();
    const drawCommand = {
      id: 'draw-command',
      zIndex: 0,
      draw: vi.fn(),
    };

    graphicsEngine.setTargetCanvas(graphicsCanvas);
    graphicsEngine.queueDrawCommand(drawCommand);
    graphicsEngine.processDrawCommandQueue();
    graphicsEngine.processDrawCommandQueue();

    expect(drawCommand.draw).toHaveBeenCalledTimes(2);
  });

  it('should delete cached command', () => {
    const graphicsEngine = new GraphicsEngineDefault();
    const graphicsCanvas = new GraphicsCanvas();
    const drawCommand = {
      id: 'draw-command',
      zIndex: 0,
      draw: vi.fn(),
    };

    graphicsEngine.setTargetCanvas(graphicsCanvas);
    graphicsEngine.queueDrawCommand(drawCommand);
    graphicsEngine.processDrawCommandQueue();
    graphicsEngine.deleteCachedDrawCommand('draw-command');
    graphicsEngine.processDrawCommandQueue();

    expect(drawCommand.draw).toHaveBeenCalledOnce();
  });
});

const GraphicsCanvas = vi.fn(class {
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
