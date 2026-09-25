import type { GraphicsEvents } from './graphics.types';
import { GraphicsEventController } from './GraphicsEventController';
import { Event } from '../../events/Event';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

describe('GraphicsEventController', () => {
  beforeAll(() => controller.startListening());
  afterEach(() => vi.clearAllMocks());
  afterAll(() => controller.stopListening());

  it('should map ClearCanvas event', () => {
    events.ClearCanvas.emit();

    expect(graphics.clearCanvas).toHaveBeenCalled();
  });

  it('should map ClearDrawCommandQueue event', () => {
    events.ClearDrawCommandQueue.emit();

    expect(graphics.clearDrawCommandQueue).toHaveBeenCalled();
  });

  it('should map DeleteCachedDrawCommand event', () => {
    const data = 'draw-command';

    events.DeleteCachedDrawCommand.emit(data);

    expect(graphics.deleteCachedDrawCommand).toHaveBeenCalledWith(data);
  });

  it('should map ProcessDrawCommandQueue event', () => {
    events.ProcessDrawCommandQueue.emit();

    expect(graphics.processDrawCommandQueue).toHaveBeenCalled();
  });

  it('should map QueueDrawCommand event', () => {
    const data = {
      id: 'draw-command',
      zIndex: 0,
      draw: vi.fn(),
    };

    events.QueueDrawCommand.emit(data);

    expect(graphics.queueDrawCommand).toHaveBeenCalledWith(data);
  });
});

const graphics = {
  clearCanvas: vi.fn(),
  clearDrawCommandQueue: vi.fn(),
  deleteCachedDrawCommand: vi.fn(),
  processDrawCommandQueue: vi.fn(),
  queueDrawCommand: vi.fn(),
};
const events: GraphicsEvents = {
  ClearCanvas: new Event(),
  ClearDrawCommandQueue: new Event(),
  DeleteCachedDrawCommand: new Event(),
  ProcessDrawCommandQueue: new Event(),
  QueueDrawCommand: new Event(),
};
const controller = new GraphicsEventController(graphics, events);
