import type { GraphicsEngineEvents } from '../graphicsEngine.types';
import { GraphicsEngineEventController } from './GraphicsEngineEventController';
import { Event } from '../../events/Event';
import { describe, expect, it, vi } from 'vitest';

describe('GraphicsEngineEventController', () => {
  it('should map ClearCanvas event', () => {
    const engine = new GraphicsEngine();
    const events = createGraphicsEngineEvents();
    const eventController = new GraphicsEngineEventController(engine, events);

    eventController.startListening();
    events.ClearCanvas.emit();

    expect(engine.clearCanvas).toHaveBeenCalled();
  });

  it('should map ClearDrawCommandQueue event', () => {
    const engine = new GraphicsEngine();
    const events = createGraphicsEngineEvents();
    const eventController = new GraphicsEngineEventController(engine, events);

    eventController.startListening();
    events.ClearDrawCommandQueue.emit();

    expect(engine.clearDrawCommandQueue).toHaveBeenCalled();
  });

  it('should map DeleteCachedDrawCommand event', () => {
    const engine = new GraphicsEngine();
    const events = createGraphicsEngineEvents();
    const eventController = new GraphicsEngineEventController(engine, events);
    const id = 'draw-command';

    eventController.startListening();
    events.DeleteCachedDrawCommand.emit(id);

    expect(engine.deleteCachedDrawCommand).toHaveBeenCalledWith(id);
  });

  it('should map ProcessDrawCommandQueue event', () => {
    const engine = new GraphicsEngine();
    const events = createGraphicsEngineEvents();
    const eventController = new GraphicsEngineEventController(engine, events);

    eventController.startListening();
    events.ProcessDrawCommandQueue.emit();

    expect(engine.processDrawCommandQueue).toHaveBeenCalled();
  });

  it('should map QueueDrawCommand event', () => {
    const engine = new GraphicsEngine();
    const events = createGraphicsEngineEvents();
    const eventController = new GraphicsEngineEventController(engine, events);
    const drawCommand = {
      id: 'draw-command',
      zIndex: 0,
      draw: vi.fn(),
    };

    eventController.startListening();
    events.QueueDrawCommand.emit(drawCommand);

    expect(engine.queueDrawCommand).toHaveBeenCalledWith(drawCommand);
  });
});

const GraphicsEngine = vi.fn(class {
  clearCanvas = vi.fn();
  clearDrawCommandQueue = vi.fn();
  deleteCachedDrawCommand = vi.fn();
  processDrawCommandQueue = vi.fn();
  queueDrawCommand = vi.fn();
});

function createGraphicsEngineEvents(): GraphicsEngineEvents {
  return {
    ClearCanvas: new Event(),
    ClearDrawCommandQueue: new Event(),
    DeleteCachedDrawCommand: new Event(),
    ProcessDrawCommandQueue: new Event(),
    QueueDrawCommand: new Event(),
  };
};
