import type { GraphicsEngine, GraphicsEngineEvents } from '../graphicsEngine.types';
import { EventController } from '../../domain/EventController';

/** Maps Graphics Engine events to their corresponding methods. */
export class GraphicsEngineEventController extends EventController {
  constructor(engine: GraphicsEngine, events: GraphicsEngineEvents) {
    super();

    this.assignEventListeners(engine, events);
  }

  private assignEventListeners(engine: GraphicsEngine, events: GraphicsEngineEvents) {
    this.on(events.ClearCanvas, engine.clearCanvas);
    this.on(events.ClearDrawCommandQueue, engine.clearDrawCommandQueue);
    this.on(events.DeleteCachedDrawCommand, engine.deleteCachedDrawCommand);
    this.on(events.ProcessDrawCommandQueue, engine.processDrawCommandQueue);
    this.on(events.QueueDrawCommand, engine.queueDrawCommand);
  }
}
