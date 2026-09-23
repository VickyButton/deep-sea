import type { GraphicsEngine, GraphicsEngineEvents } from './graphicsEngine.types';
import { EventController } from '../../events/EventController';

/** Maps Graphics Engine events to their corresponding methods. */
export class GraphicsEngineEventController extends EventController {
  constructor(engine: GraphicsEngine, events: GraphicsEngineEvents) {
    super();

    this.assignListeners(engine, events);
  }

  private assignListeners(engine: GraphicsEngine, events: GraphicsEngineEvents) {
    this.on(events.ClearCanvas, engine.clearCanvas.bind(engine));
    this.on(events.ClearDrawCommandQueue, engine.clearDrawCommandQueue.bind(engine));
    this.on(events.DeleteCachedDrawCommand, engine.deleteCachedDrawCommand.bind(engine));
    this.on(events.ProcessDrawCommandQueue, engine.processDrawCommandQueue.bind(engine));
    this.on(events.QueueDrawCommand, engine.queueDrawCommand.bind(engine));
  }
}
