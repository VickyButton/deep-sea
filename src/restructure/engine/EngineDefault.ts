import type { Engine } from './engine.types';
import type { Node } from '../nodes';
import type { Graphics } from './graphics/graphics.types';
import type { Loop } from './loop/loop.types';
import type { PluginManager } from './pluginManager/pluginManager.types';
import type { SceneTree } from './sceneTree/sceneTree.types';
import type { EventController } from '../controllers/EventController';
import type { GraphicsEvents } from '../events/graphics/GraphicsEvents';
import type { LoopEvents } from '../events/loop/LoopEvents';
import type { PluginManagerEvents } from '../events/pluginManager/PluginManagerEvents';
import type { SceneTreeEvents } from '../events/sceneTree/SceneTreeEvents';
import { GraphicsController } from '../controllers/graphics/GraphicsController';
import { LoopController } from '../controllers/loop/LoopController';
import { PluginManagerController } from '../controllers/pluginManager/PluginManagerController';
import { SceneTreeEventController } from '../controllers/sceneTree/SceneTreeController';

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
      this.createGraphicsController(options.graphics, events.graphics),
      this.createLoopController(options.loop, events.loop),
      this.createPluginManagerController(options.pluginManager, events.pluginManager),
      this.createSceneTreeController(options.sceneTree, events.sceneTree),
    ];
  }

  private createGraphicsController(graphics: Graphics, events: GraphicsEvents) {
    return new GraphicsController(graphics, events);
  }

  private createLoopController(loop: Loop, events: LoopEvents) {
    return new LoopController(loop, events);
  }

  private createPluginManagerController(manager: PluginManager, events: PluginManagerEvents) {
    return new PluginManagerController(manager, events);
  }

  private createSceneTreeController(tree: SceneTree, events: SceneTreeEvents) {
    return new SceneTreeEventController(tree, events);
  }

  private addControllersToManager(manager: EventControllerManager, controllers: EventController[]) {
    for (const controller of controllers) {
      manager.addController(controller);
    }
  }

  private setLoopCallback() {
    this.events.loop.SetLoopCallback.emit(this.executeLoop);
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
    this.events.pluginManager.StartPlugins.emit();
  }

  /** Stops the engine. */
  public stop() {
    this.stopLoop();
    this.stopPlugins();
    this.stopListeningOnControllers();
  }

  private stopLoop() {
    this.events.loop.Stop.emit();
  }

  private stopPlugins() {
    this.events.pluginManager.StopPlugins.emit();
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
    this.events.sceneTree.SetCurrentScene.emit(scene);
  }

  private startCurrentScene() {
    this.events.sceneTree.StartCurrentScene.emit();
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
  graphics: Graphics;
  loop: Loop;
  pluginManager: PluginManager;
  sceneTree: SceneTree;
}

interface EngineEvents {
  graphics: GraphicsEvents;
  loop: LoopEvents;
  pluginManager: PluginManagerEvents;
  sceneTree: SceneTreeEvents;
}
