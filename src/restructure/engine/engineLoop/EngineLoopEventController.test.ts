import type { FrameLoopEvents } from './engineLoop.types';
import { FrameLoopEventController } from './EngineLoopEventController';
import { Event } from '../../events/Event';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

describe('FrameLoopEventController', () => {
  beforeAll(() => controller.startListening());
  afterEach(() => vi.clearAllMocks());
  afterAll(() => controller.stopListening());

  it('should map SetFramesPerSecond event', () => {
    const fps = 60;

    events.SetFramesPerSecond.emit(fps);

    expect(loop.setFramesPerSecond).toHaveBeenCalledWith(fps);
  });

  it('should map SetLoopCallback event', () => {
    const callback = vi.fn();

    events.SetLoopCallback.emit(callback);

    expect(loop.setLoopCallback).toHaveBeenCalledWith(callback);
  });

  it('should map Start event', () => {
    events.Start.emit();

    expect(loop.start).toHaveBeenCalled();
  });

  it('should map Stop event', () => {
    events.Stop.emit();

    expect(loop.stop).toHaveBeenCalled();
  });
});

const loop = {
  setFramesPerSecond: vi.fn(),
  setLoopCallback: vi.fn(),
  start: vi.fn(),
  stop: vi.fn(),
};
const events: FrameLoopEvents = {
  SetFramesPerSecond: new Event(),
  SetLoopCallback: new Event(),
  Start: new Event(),
  Stop: new Event(),
};
const controller = new FrameLoopEventController(loop, events);
