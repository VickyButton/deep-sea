import type { GraphicsEngineEvents } from '../graphicsEngine.types';
import { GraphicsEngineEventController } from './GraphicsEngineEventController';
import { Event } from '../../events/Event';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

describe('GraphicsEngineEventController', () => {
  beforeAll(() => controller.startListening());
  afterEach(() => vi.clearAllMocks());
  afterAll(() => controller.stopListening());

  it('should map ClearCanvas event', () => {
    events.ClearCanvas.emit();

    expect(engine.clearCanvas).toHaveBeenCalled();
  });

  it('should map ClearDrawCommandQueue event', () => {
    events.ClearDrawCommandQueue.emit();

    expect(engine.clearDrawCommandQueue).toHaveBeenCalled();
  });

  it('should map DeleteCachedDrawCommand event', () => {
    const data = 'draw-command';

    events.DeleteCachedDrawCommand.emit(data);

    expect(engine.deleteCachedDrawCommand).toHaveBeenCalledWith(data);
  });

  it('should map ProcessDrawCommandQueue event', () => {
    events.ProcessDrawCommandQueue.emit();

    expect(engine.processDrawCommandQueue).toHaveBeenCalled();
  });

  it('should map QueueDrawCommand event', () => {
    const data = {
      id: 'draw-command',
      zIndex: 0,
      draw: vi.fn(),
    };

    events.QueueDrawCommand.emit(data);

    expect(engine.queueDrawCommand).toHaveBeenCalledWith(data);
  });
});

const engine = {
  clearCanvas: vi.fn(),
  clearDrawCommandQueue: vi.fn(),
  deleteCachedDrawCommand: vi.fn(),
  processDrawCommandQueue: vi.fn(),
  queueDrawCommand: vi.fn(),
};
const events: GraphicsEngineEvents = {
  ClearCanvas: new Event(),
  ClearDrawCommandQueue: new Event(),
  DeleteCachedDrawCommand: new Event(),
  ProcessDrawCommandQueue: new Event(),
  QueueDrawCommand: new Event(),
};
const controller = new GraphicsEngineEventController(engine, events);
