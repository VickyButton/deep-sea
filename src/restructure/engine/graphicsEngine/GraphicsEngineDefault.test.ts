import { GraphicsEngineDefault } from './GraphicsEngineDefault';
import { describe, expect, it, vi } from 'vitest';

describe('GraphicsEngineDefault', () => {
  it('should not draw to canvas if no canvas set', () => {
    const graphicsEngine = new GraphicsEngineDefault();
    const drawCommand = {
      draw: vi.fn(),
      zIndex: 0,
    };

    graphicsEngine.queueDrawCommand(drawCommand);
    graphicsEngine.draw();

    expect(drawCommand.draw).not.toHaveBeenCalled();
  });

  it('should draw to canvas using draw commands', () => {
    const graphicsEngine = new GraphicsEngineDefault();
    const graphicsCanvas = new GraphicsCanvas();
    const drawCommand = {
      draw: vi.fn(),
      zIndex: 0,
    };

    graphicsEngine.setCanvas(graphicsCanvas);
    graphicsEngine.queueDrawCommand(drawCommand);
    graphicsEngine.draw();

    expect(drawCommand.draw).toHaveBeenCalledWith(graphicsCanvas);
  });

  it('should process queued commands in order of z-index', () => {
    const graphicsEngine = new GraphicsEngineDefault();
    const graphicsCanvas = new GraphicsCanvas();
    const drawCommandZ0 = {
      draw: vi.fn(),
      zIndex: 0,
    };
    const drawCommandZ1 = {
      draw: vi.fn(),
      zIndex: 1,
    };

    graphicsEngine.setCanvas(graphicsCanvas);
    graphicsEngine.queueDrawCommand(drawCommandZ1);
    graphicsEngine.queueDrawCommand(drawCommandZ0);
    graphicsEngine.draw();

    expect(drawCommandZ0.draw).toHaveBeenCalledBefore(drawCommandZ1.draw);
  });

  it('should clear command queue after processing', () => {
    const graphicsEngine = new GraphicsEngineDefault();
    const graphicsCanvas = new GraphicsCanvas();
    const drawCommand = {
      draw: vi.fn(),
      zIndex: 0,
    };

    graphicsEngine.setCanvas(graphicsCanvas);
    graphicsEngine.queueDrawCommand(drawCommand);
    graphicsEngine.draw();
    graphicsEngine.draw();

    expect(drawCommand.draw).toHaveBeenCalledOnce();
  });
});

const GraphicsCanvas = vi.fn(class {
  width = 0;
  height = 0;
  beginPath = vi.fn();
  closePath = vi.fn();
  createLine = vi.fn();
  createArc = vi.fn();
  createRectangle = vi.fn();
  setStrokeColor = vi.fn();
  stroke = vi.fn();
  setFillColor = vi.fn();
  fill = vi.fn();
  clear = vi.fn();
});
