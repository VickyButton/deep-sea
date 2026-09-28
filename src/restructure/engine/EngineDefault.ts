
import type { Engine } from './engine.types';
import type { Node } from '../nodes';
import type { Graphics } from './graphics/graphics.types';
import type { Loop } from './loop/loop.types';
import type { PluginManager } from './pluginManager/pluginManager.types';
import type { SceneTree } from './sceneTree/sceneTree.types';
import type { EventController } from '../controllers/EventController';
import type { GraphicsEvents } from '../events/graphics/GraphicsEvents';
import { LoopEventController } from './loop/LoopEventController';
import { loopEvents } from './loop/loopEvents';
import { PluginManagerEventController } from './pluginManager/PluginManagerEventController';
import { pluginManagerEvents } from './pluginManager/pluginManagerEvents';
import { SceneTreeEventController } from './sceneTree/SceneTreeEventController';
import { sceneTreeEvents } from './sceneTree/sceneTreeEvents';
import { GraphicsController } from '../controllers/graphics/GraphicsController';

export class EngineDefault implements Engine {
  private readonly controllerManager: EventControllerManager;
  private readonly events: EngineEvents;

  constructor(options: EngineOptions, events: EngineEvents) {
    this.controllerManager = this.createControllerManager(options, events);
    this.events = events;
    this.setLoopCallback();
  }

  private createControllerManager(options: EngineOptions, events: EngineEvents) {
    const manager = new EventControllerManager();

    this.addControllersToManager(manager, this.createControllers(options, events));

    return manager;
  }

  private createControllers(options: EngineOptions, events: EngineEvents) {
    return [
      new LoopEventController(options.loop, loopEvents),
      this.createGraphicsController(options.graphics, events.graphics),
      new PluginManagerEventController(options.pluginManager, pluginManagerEvents),
      new SceneTreeEventController(options.sceneTree, sceneTreeEvents),
    ];
  }

  private createGraphicsController(graphics: Graphics, events: GraphicsEvents) {
    return new GraphicsController(graphics, events);
  }

  private addControllersToManager(manager: EventControllerManager, controllers: EventController[]) {
    for (const controller of controllers) {
      manager.addController(controller);
    }
  }

  private setLoopCallback() {
    loopEvents.SetLoopCallback.emit(this.executeLoop);
  }

  private executeLoop = () => {
    this.clearCanvas();
    this.processDrawCommandQueue();
  };

  private clearCanvas() {
    this.events.graphics.ClearCanvas.emit();
  }

  private processDrawCommandQueue() {
    this.events.graphics.ProcessDrawCommandQueue.emit();
  }

  /** Starts the engine. */
  public start() {
    this.startListeningOnControllers();
    this.startPlugins();
  }

  private startListeningOnControllers() {
    this.controllerManager.startListening();
  }

  private startPlugins() {
    pluginManagerEvents.StartPlugins.emit();
  }

  /** Stops the engine. */
  public stop() {
    this.stopLoop();
    this.stopPlugins();
    this.stopListeningOnControllers();
  }

  private stopLoop() {
    loopEvents.Stop.emit();
  }

  private stopPlugins() {
    pluginManagerEvents.StopPlugins.emit();
  }

  private stopListeningOnControllers() {
    this.controllerManager.stopListening();
  }

  /**
   * Switches to a scene and starts that scene.
   * @param scene The scene to switch to.
   */
  public switchToScene(scene: Node) {
    this.setCurrentScene(scene);
    this.startCurrentScene();
  }

  private setCurrentScene(scene: Node) {
    sceneTreeEvents.SetCurrentScene.emit(scene);
  }

  private startCurrentScene() {
    sceneTreeEvents.StartCurrentScene.emit();
  }
}

/** Manages event controllers. */
class EventControllerManager {
  private readonly controllers = new Set<EventController>();

  /**
   * Adds an event controller.
   * @param controller The controller to add.
   */
  public addController(controller: EventController) {
    this.controllers.add(controller);
  }

  /**
   * Removes an event controller.
   * @param controller The controller to remove.
   */
  public removeController(controller: EventController) {
    this.controllers.delete(controller);
  }

  /** Starts listening on all event controllers. */
  public startListening() {
    for (const controller of this.controllers) {
      controller.startListening();
    }
  }

  /** Stops listening on all event controllers. */
  public stopListening() {
    for (const controller of this.controllers) {
      controller.stopListening();
    }
  }
}

interface EngineOptions {
  loop: Loop;
  graphics: Graphics;
  pluginManager: PluginManager;
  sceneTree: SceneTree;
}

interface EngineEvents {
  graphics: GraphicsEvents;
}
