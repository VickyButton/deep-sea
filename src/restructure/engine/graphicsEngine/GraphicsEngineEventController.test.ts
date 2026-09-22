import type { GraphicsEngineEvents } from '../graphicsEngine.types';
import { GraphicsEngineEventController } from './GraphicsEngineEventController';
import { Event } from '../../events';
import { describe, expect, it, vi } from 'vitest';

describe('GraphicsEngineEventController', () => {
  it('should map DeleteCachedDrawCommand event', () => {
    const graphicsEngine = new GraphicsEngine();
    const graphicsEngineEvents = createGraphicsEngineEvents();
    const eventMapper = new GraphicsEngineEventController(graphicsEngine, graphicsEngineEvents);
    const id = 'draw-command';

    eventMapper.setup();
    graphicsEngineEvents.DeleteCachedDrawCommand.emit(id);

    expect(graphicsEngine.deleteCachedDrawCommand).toHaveBeenCalledWith(id);
  });

  it('should map ProcessDrawCommandQueue event', () => {
    const graphicsEngine = new GraphicsEngine();
    const graphicsEngineEvents = createGraphicsEngineEvents();
    const eventMapper = new GraphicsEngineEventController(graphicsEngine, graphicsEngineEvents);

    eventMapper.setup();
    graphicsEngineEvents.ProcessDrawCommandQueue.emit();

    expect(graphicsEngine.processDrawCommandQueue).toHaveBeenCalled();
  });

  it('should map QueueDrawCommand event', () => {
    const graphicsEngine = new GraphicsEngine();
    const graphicsEngineEvents = createGraphicsEngineEvents();
    const eventMapper = new GraphicsEngineEventController(graphicsEngine, graphicsEngineEvents);
    const drawCommand = {
      id: 'draw-command',
      zIndex: 0,
      draw: vi.fn(),
    };

    eventMapper.setup();
    graphicsEngineEvents.QueueDrawCommand.emit(drawCommand);

    expect(graphicsEngine.queueDrawCommand).toHaveBeenCalledWith(drawCommand);
  });
});

const GraphicsEngine = vi.fn(class {
  deleteCachedDrawCommand = vi.fn();
  processDrawCommandQueue = vi.fn();
  queueDrawCommand = vi.fn();
  setTargetCanvas = vi.fn();
});

function createGraphicsEngineEvents(): GraphicsEngineEvents {
  return {
    DeleteCachedDrawCommand: new Event(),
    ProcessDrawCommandQueue: new Event(),
    QueueDrawCommand: new Event(),
  };
};
