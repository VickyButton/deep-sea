import { Graphics_Main } from './Graphics_Main';
import { Canvas_Mock } from '../../domain/canvas/Canvas_Mock';
import { describe, expect, it, vi } from 'vitest';

describe('Graphics_Main', () => {
  it('should clear canvas', () => {
    const canvas = new Canvas_Mock();
    const graphics = new Graphics_Main(canvas);

    graphics.clearCanvas();

    expect(canvas.clear).toHaveBeenCalled();
  });

  it('should draw onto canvas using draw commands', () => {
    const canvas = new Canvas_Mock();
    const graphics = new Graphics_Main(canvas);
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
    const canvas = new Canvas_Mock();
    const graphics = new Graphics_Main(canvas);
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
    const canvas = new Canvas_Mock();
    const graphics = new Graphics_Main(canvas);
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
    const canvas = new Canvas_Mock();
    const graphics = new Graphics_Main(canvas);
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
    const canvas = new Canvas_Mock();
    const graphics = new Graphics_Main(canvas);
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
    const canvas = new Canvas_Mock();
    const graphics = new Graphics_Main(canvas);
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
