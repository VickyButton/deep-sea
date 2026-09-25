import type { EngineLoopEvents } from './engineLoop.types';
import { EngineLoopEventController } from './EngineLoopEventController';
import { Event } from '../../events/Event';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

describe('EngineLoopEventController', () => {
  beforeAll(() => controller.startListening());
  afterEach(() => vi.clearAllMocks());
  afterAll(() => controller.stopListening());

  it('should map SetLoopCallback event', () => {
    const callback = vi.fn();

    events.SetLoopCallback.emit(callback);

    expect(loop.setLoopCallback).toHaveBeenCalledWith(callback);
  });

  it('should map SetLoopsPerSecond event', () => {
    const loopsPerSecond = 60;

    events.SetLoopsPerSecond.emit(loopsPerSecond);

    expect(loop.setLoopsPerSecond).toHaveBeenCalledWith(loopsPerSecond);
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
  setLoopCallback: vi.fn(),
  setLoopsPerSecond: vi.fn(),
  start: vi.fn(),
  stop: vi.fn(),
};
const events: EngineLoopEvents = {
  SetLoopCallback: new Event(),
  SetLoopsPerSecond: new Event(),
  Start: new Event(),
  Stop: new Event(),
};
const controller = new EngineLoopEventController(loop, events);
