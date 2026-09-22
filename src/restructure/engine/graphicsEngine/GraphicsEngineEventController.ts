import type { DrawCommand, GraphicsEngine, GraphicsEngineEvents } from '../graphicsEngine.types';

/**
 * Maps Graphics Engine events to their corresponding methods.
 */
export class GraphicsEngineEventController {
  private readonly graphicsEngine: GraphicsEngine;
  private readonly events: GraphicsEngineEvents;

  constructor(graphicsEngine: GraphicsEngine, events: GraphicsEngineEvents) {
    this.graphicsEngine = graphicsEngine;
    this.events = events;
  }

  public setup() {
    this.addEventListeners();
  }

  private addEventListeners() {
    this.addQueueDrawCommandEventListener();
    this.addDeleteCachedDrawCommandEventListener();
  }

  private addQueueDrawCommandEventListener() {
    this.events.QueueDrawCommand.addListener(this.onQueueDrawCommand);
  }

  private onQueueDrawCommand = (command: DrawCommand) => {
    this.graphicsEngine.queueDrawCommand(command);
  };

  private addDeleteCachedDrawCommandEventListener() {
    this.events.DeleteCachedDrawCommand.addListener(this.onDeleteCachedDrawCommand);
  }

  private onDeleteCachedDrawCommand = (id: string) => {
    this.graphicsEngine.deleteCachedDrawCommand(id);
  };

  public teardown() {
    this.removeEventListeners();
  }

  private removeEventListeners() {
    this.removeQueueDrawCommandEventListener();
    this.removeDeleteCachedDrawCommandEventListener();
  }

  private removeQueueDrawCommandEventListener() {
    this.events.QueueDrawCommand.removeListener(this.onQueueDrawCommand);
  }

  private removeDeleteCachedDrawCommandEventListener() {
    this.events.DeleteCachedDrawCommand.removeListener(this.onDeleteCachedDrawCommand);
  }
}
