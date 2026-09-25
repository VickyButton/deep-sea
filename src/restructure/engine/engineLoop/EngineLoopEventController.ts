import type { EngineLoop, EngineLoopEvents } from './engineLoop.types';
import { EventController } from '../../events/EventController';

/** Maps Frame Loop events to their corresponding methods. */
export class EngineLoopEventController extends EventController {
  constructor(loop: EngineLoop, events: EngineLoopEvents) {
    super();

    this.assignListeners(loop, events);
  }

  private assignListeners(loop: EngineLoop, events: EngineLoopEvents) {
    this.on(events.SetFramesPerSecond, loop.setFramesPerSecond.bind(loop));
    this.on(events.SetLoopCallback, loop.setLoopCallback.bind(loop));
    this.on(events.Start, loop.start.bind(loop));
    this.on(events.Stop, loop.stop.bind(loop));
  }
}
