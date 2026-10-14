import type { Engine } from './engine.types';
import type { DrawCommand, Graphics } from './graphics/graphics.types';
import type { Loop } from './loop/loop.types';
import type { PluginManager } from './pluginManager/pluginManager.types';
import type { SceneTree } from './sceneTree/sceneTree.types';
import type { CanvasNode } from '../nodes/canvasNode/canvasNode.types';
import type { Node } from '../nodes/node/node.types';
import { SignalController_Base } from '../controllers/signalController/SignalController_Base';
import { CanvasNode_Base } from '../nodes/canvasNode/CanvasNode_Base';

export class Engine_Base implements Engine {
  private readonly controller: EngineController;
  private readonly graphics: Graphics;
  private readonly loop: Loop;
  private readonly pluginManager: PluginManager;
  private readonly sceneTree: SceneTree;

  constructor(components: EngineComponents) {
    this.controller = new EngineController(components);
    this.graphics = components.graphics;
    this.loop = components.loop;
    this.pluginManager = components.pluginManager;
    this.sceneTree = components.sceneTree;
    this.setLoopCallback();
  }

  public get isActive() {
    return this.controller.isListening;
  }

  private setLoopCallback() {
    this.loop.setLoopCallback(this.executeLoop);
  }

  private executeLoop = () => {
    this.clearCanvas();
    this.processDrawCommandQueue();
  };

  private clearCanvas() {
    this.graphics.clearCanvas();
  }

  private processDrawCommandQueue() {
    this.graphics.processDrawCommandQueue();
  }

  public start() {
    this.startController();
    this.startPlugins();
    this.startSceneTree();
    this.startLoop();
  }

  private startController() {
    this.controller.startListening();
  }

  private startPlugins() {
    this.pluginManager.startPlugins();
  }

  private startSceneTree() {
    this.sceneTree.start();
  }

  private startLoop() {
    this.loop.start();
  }

  public stop() {
    this.stopLoop();
    this.stopSceneTree();
    this.stopPlugins();
    this.stopController();
  }

  private stopLoop() {
    this.loop.stop();
  }

  private stopSceneTree() {
    this.sceneTree.stop();
  }

  private stopPlugins() {
    this.pluginManager.stopPlugins();
  }

  private stopController() {
    this.controller.stopListening();
  }
}

class EngineController {
  private readonly controller = new SignalController_Base();
  private readonly graphics: Graphics;
  private readonly sceneTree: SceneTree;

  constructor(components: EngineComponents) {
    this.graphics = components.graphics;
    this.sceneTree = components.sceneTree;
    this.setupController();
  }

  private setupController() {
    this.controller.register(this.sceneTree.node_registered, this.onNodeRegistered);
    this.controller.register(this.sceneTree.node_deregistered, this.onNodeDeregistered);
  }

  private onNodeRegistered = (node: Node) => {
    if (this.isCanvasNode(node)) {
      this.handleCanvasNodeRegistered(node);
    }
  };

  private isCanvasNode(node: Node): node is CanvasNode {
    return node instanceof CanvasNode_Base;
  }

  private handleCanvasNodeRegistered(node: CanvasNode) {
    this.controller.register(node.redraw_requested, this.onCanvasNodeRedrawRequested);
  }

  private onCanvasNodeRedrawRequested = (command: DrawCommand) => {
    this.graphics.queueDrawCommand(command);
  };
  private onNodeDeregistered = (node: Node) => {
    if (this.isCanvasNode(node)) {
      this.handleCanvasNodeDeregistered(node);
    }
  };

  private handleCanvasNodeDeregistered(node: CanvasNode) {
    this.controller.deregister(node.redraw_requested, this.onCanvasNodeRedrawRequested);
  }

  public get isListening() {
    return this.controller.isListening;
  }

  public startListening() {
    this.controller.startListening();
  }

  public stopListening() {
    this.controller.stopListening();
  }
}

interface EngineComponents {
  graphics: Graphics;
  loop: Loop;
  pluginManager: PluginManager;
  sceneTree: SceneTree;
}
