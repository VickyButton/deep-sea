import { GraphicsDefault } from './GraphicsDefault';
import { describe, expect, it, vi } from 'vitest';

describe('GraphicsDefault', () => {
  it('should clear canvas', () => {
    const canvas = new Canvas();
    const graphics = new GraphicsDefault(canvas);

    graphics.clearCanvas();

    expect(canvas.clear).toHaveBeenCalled();
  });

  it('should draw onto canvas using draw commands', () => {
    const canvas = new Canvas();
    const graphics = new GraphicsDefault(canvas);
    const drawCommand = {
      id: 'draw-command',
      zIndex: 0,
      draw: vi.fn(),
    };

    graphics.queueDrawCommand(drawCommand);
    graphics.processDrawCommandQueue();

    expect(drawCommand.draw).toHaveBeenCalledWith(canvas);
  });

  it('should process queued commands in order of z-index', () => {
    const canvas = new Canvas();
    const graphics = new GraphicsDefault(canvas);
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

    graphics.queueDrawCommand(drawCommandZ1);
    graphics.queueDrawCommand(drawCommandZ0);
    graphics.processDrawCommandQueue();

    expect(drawCommandZ0.draw).toHaveBeenCalledBefore(drawCommandZ1.draw);
  });

  it('should cache command after processing', () => {
    const canvas = new Canvas();
    const graphics = new GraphicsDefault(canvas);
    const drawCommand = {
      id: 'draw-command',
      zIndex: 0,
      draw: vi.fn(),
    };

    graphics.queueDrawCommand(drawCommand);
    graphics.processDrawCommandQueue();
    graphics.processDrawCommandQueue();

    expect(drawCommand.draw).toHaveBeenCalledTimes(2);
  });

  it('should delete cached command after queueing redraw', () => {
    const canvas = new Canvas();
    const graphics = new GraphicsDefault(canvas);
    const drawCommand1 = {
      id: 'draw-command',
      zIndex: 0,
      draw: vi.fn(),
    };
    const drawCommand2 = {
      id: 'draw-command',
      zIndex: 0,
      draw: vi.fn(),
    };

    graphics.queueDrawCommand(drawCommand1);
    graphics.processDrawCommandQueue();
    graphics.queueDrawCommand(drawCommand2);
    graphics.processDrawCommandQueue();

    expect(drawCommand1.draw).toHaveBeenCalledOnce();
    expect(drawCommand2.draw).toHaveBeenCalledOnce();
  });

  it('should delete cached command', () => {
    const canvas = new Canvas();
    const graphics = new GraphicsDefault(canvas);
    const drawCommand = {
      id: 'draw-command',
      zIndex: 0,
      draw: vi.fn(),
    };

    graphics.queueDrawCommand(drawCommand);
    graphics.processDrawCommandQueue();
    graphics.deleteCachedDrawCommand('draw-command');
    graphics.processDrawCommandQueue();

    expect(drawCommand.draw).toHaveBeenCalledOnce();
  });

  it('should clear command queue', () => {
    const canvas = new Canvas();
    const graphics = new GraphicsDefault(canvas);
    const drawCommand = {
      id: 'draw-command',
      zIndex: 0,
      draw: vi.fn(),
    };

    graphics.queueDrawCommand(drawCommand);
    graphics.clearDrawCommandQueue();
    graphics.processDrawCommandQueue();

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
