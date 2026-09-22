import type { DrawCommand, GraphicsEngine, GraphicsEngineEvents } from '../graphicsEngine.types';

/** Maps Graphics Engine events to their corresponding methods. */
export class GraphicsEngineEventController {
  private readonly engine: GraphicsEngine;
  private readonly events: GraphicsEngineEvents;

  constructor(engine: GraphicsEngine, events: GraphicsEngineEvents) {
    this.engine = engine;
    this.events = events;
  }

  public setup() {
    this.addEventListeners();
  }

  private addEventListeners() {
    this.addDeleteCachedDrawCommandEventListener();
    this.addProcessDrawCommandQueueEventListener();
    this.addQueueDrawCommandEventListener();
  }

  private addDeleteCachedDrawCommandEventListener() {
    this.events.DeleteCachedDrawCommand.addListener(this.onDeleteCachedDrawCommand);
  }

  private onDeleteCachedDrawCommand = (id: string) => {
    this.engine.deleteCachedDrawCommand(id);
  };

  private addProcessDrawCommandQueueEventListener() {
    this.events.ProcessDrawCommandQueue.addListener(this.onProcessDrawCommandQueue);
  }

  private onProcessDrawCommandQueue = () => {
    this.engine.processDrawCommandQueue();
  };

  private addQueueDrawCommandEventListener() {
    this.events.QueueDrawCommand.addListener(this.onQueueDrawCommand);
  }

  private onQueueDrawCommand = (command: DrawCommand) => {
    this.engine.queueDrawCommand(command);
  };

  public teardown() {
    this.removeEventListeners();
  }

  private removeEventListeners() {
    this.removeDeleteCachedDrawCommandEventListener();
    this.removeProcessDrawCommandQueueEventListener();
    this.removeQueueDrawCommandEventListener();
  }

  private removeDeleteCachedDrawCommandEventListener() {
    this.events.DeleteCachedDrawCommand.removeListener(this.onDeleteCachedDrawCommand);
  }

  private removeProcessDrawCommandQueueEventListener() {
    this.events.ProcessDrawCommandQueue.removeListener(this.onProcessDrawCommandQueue);
  }

  private removeQueueDrawCommandEventListener() {
    this.events.QueueDrawCommand.removeListener(this.onQueueDrawCommand);
  }
}
