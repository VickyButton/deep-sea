import { Graphics_Main } from './Graphics_Main';
import { Canvas_Mock } from '../../domain/canvas/Canvas_Mock';
import { describe, expect, it, vi } from 'vitest';

describe('Graphics_Main', () => {
  it('should execute cached commands upon rendering', () => {
    const canvas = new Canvas_Mock();
    const graphics = new Graphics_Main(canvas);
    const command = {
      id: 'ID',
      zIndex: 0,
      draw: vi.fn(),
    };

    graphics.cacheCommand(command);
    graphics.render();

    expect(command.draw).toHaveBeenCalled();
  });

  it('should execute cached commands each render', () => {
    const canvas = new Canvas_Mock();
    const graphics = new Graphics_Main(canvas);
    const command = {
      id: 'ID',
      zIndex: 0,
      draw: vi.fn(),
    };

    graphics.cacheCommand(command);
    graphics.render();
    graphics.render();

    expect(command.draw).toHaveBeenCalledTimes(2);
  });

  it('should not execute cleared command queue upon rendering', () => {
    const canvas = new Canvas_Mock();
    const graphics = new Graphics_Main(canvas);
    const command = {
      id: 'ID',
      zIndex: 0,
      draw: vi.fn(),
    };

    graphics.queueCommand(command);
    graphics.clearQueue();
    graphics.render();

    expect(command.draw).not.toHaveBeenCalled();
  });

  it('should not execute cached command after deleting command from cache', () => {
    const canvas = new Canvas_Mock();
    const graphics = new Graphics_Main(canvas);
    const command = {
      id: 'ID',
      zIndex: 0,
      draw: vi.fn(),
    };

    graphics.cacheCommand(command);
    graphics.deleteCommand('ID');
    graphics.render();

    expect(command.draw).not.toHaveBeenCalled();
  });

  it('should execute a queued command', () => {
    const canvas = new Canvas_Mock();
    const graphics = new Graphics_Main(canvas);
    const command = {
      id: 'ID',
      zIndex: 0,
      draw: vi.fn(),
    };

    graphics.queueCommand(command);
    graphics.render();

    expect(command.draw).toHaveBeenCalled();
  });

  it('should delete a command from queue upon rendering', () => {
    const canvas = new Canvas_Mock();
    const graphics = new Graphics_Main(canvas);
    const command = {
      id: 'ID',
      zIndex: 0,
      draw: vi.fn(),
    };

    graphics.queueCommand(command);
    graphics.render();
    graphics.render();

    expect(command.draw).toHaveBeenCalledOnce();
  });

  it('should clear canvas upon rendering', () => {
    const canvas = new Canvas_Mock();
    const graphics = new Graphics_Main(canvas);

    graphics.render();

    expect(canvas.clear).toHaveBeenCalled();
  });

  it('should process queued commands in order of z-index', () => {
    const canvas = new Canvas_Mock();
    const graphics = new Graphics_Main(canvas);
    const drawCommandZ0 = {
      id: 'ID-z0',
      zIndex: 0,
      draw: vi.fn(),
    };
    const drawCommandZ1 = {
      id: 'ID-z1',
      draw: vi.fn(),
      zIndex: 1,
    };

    graphics.queueCommand(drawCommandZ1);
    graphics.queueCommand(drawCommandZ0);
    graphics.render();

    expect(drawCommandZ0.draw).toHaveBeenCalledBefore(drawCommandZ1.draw);
  });

  it('should dedupe commands that are both cached and queued upon rendering', () => {
    const canvas = new Canvas_Mock();
    const graphics = new Graphics_Main(canvas);
    const command = {
      id: 'ID',
      zIndex: 0,
      draw: vi.fn(),
    };

    graphics.cacheCommand(command);
    graphics.queueCommand(command);
    graphics.render();

    expect(command.draw).toHaveBeenCalledOnce();
  });

  it('should execute queued command using canvas upon rendering', () => {
    const canvas = new Canvas_Mock();
    const graphics = new Graphics_Main(canvas);
    const command = {
      id: 'ID',
      zIndex: 0,
      draw: vi.fn(),
    };

    graphics.queueCommand(command);
    graphics.render();

    expect(command.draw).toHaveBeenCalledWith(canvas);
  });

  it('should execute cached command using canvas upon rendering', () => {
    const canvas = new Canvas_Mock();
    const graphics = new Graphics_Main(canvas);
    const command = {
      id: 'ID',
      zIndex: 0,
      draw: vi.fn(),
    };

    graphics.cacheCommand(command);
    graphics.render();

    expect(command.draw).toHaveBeenCalledWith(canvas);
  });

  it('should render image bitmap for canvas', () => {
    const canvas = new Canvas_Mock();
    const graphics = new Graphics_Main(canvas);
    const imageBitmap = 'IMAGE_BITMAP';
    canvas.toImageBitmap.mockReturnValue(imageBitmap);

    expect(graphics.render()).toBe(imageBitmap);
  });
});
