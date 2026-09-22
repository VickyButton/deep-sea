import type { GraphicsEngineEvents } from '../graphicsEngine.types';
import { GraphicsEngineEventController } from './GraphicsEngineEventController';
import { Event } from '../../events';
import { describe, expect, it, vi } from 'vitest';

describe('GraphicsEngineEventController', () => {
  it('should map QueueDrawCommandEvent', () => {
    const graphicsEngine = new GraphicsEngine();
    const graphicsEngineEvents = createGraphicsEngineEvents();
    const eventMapper = new GraphicsEngineEventController(graphicsEngine, graphicsEngineEvents);
    const drawCommand = {
      id: 'draw-command',
      draw: vi.fn(),
      zIndex: 0,
    };

    eventMapper.setup();
    graphicsEngineEvents.QueueDrawCommandEvent.emit(drawCommand);

    expect(graphicsEngine.queueDrawCommand).toHaveBeenCalledWith(drawCommand);
  });

  it('should map DeleteCachedDrawCommandEvent', () => {
    const graphicsEngine = new GraphicsEngine();
    const graphicsEngineEvents = createGraphicsEngineEvents();
    const eventMapper = new GraphicsEngineEventController(graphicsEngine, graphicsEngineEvents);
    const id = 'draw-command';

    eventMapper.setup();
    graphicsEngineEvents.DeleteCachedDrawCommandEvent.emit(id);

    expect(graphicsEngine.deleteCachedDrawCommand).toHaveBeenCalledWith(id);
  });
});

const GraphicsEngine = vi.fn(class {
  setTargetCanvas = vi.fn();
  queueDrawCommand = vi.fn();
  processDrawCommandQueue = vi.fn();
  deleteCachedDrawCommand = vi.fn();
});

function createGraphicsEngineEvents(): GraphicsEngineEvents {
  return {
    QueueDrawCommandEvent: new Event(),
    DeleteCachedDrawCommandEvent: new Event(),
  };
};
