import type { DrawEngine } from './drawEngine/DrawEngine';
import type { DrawInstructionsQueue } from './drawInstructionsQueue/drawInstructionsQueue.types';
import type { DrawInstructionsResolver } from './drawInstructionsResolver/DrawInstructionsResolver';
import type { Engine, NewFrameCallback } from './engine.types';
import type { EngineController } from './engineController/EngineController';
import type { Loop } from './loop/Loop';
import type { PluginManager } from './pluginManager/pluginManager.types';
import type { SceneTree } from './sceneTree/sceneTree.types';
import type { Canvas } from '../domain/canvas/canvas.types';
import type { Node } from '../nodes/node/Node';

/** The main implementation of the Engine interface. */
export class Engine_Main implements Engine {
  private readonly drawEngine: DrawEngine;
  private readonly drawInstructionsQueue: DrawInstructionsQueue;
  private readonly drawInstructionsResolver: DrawInstructionsResolver;
  private readonly engineController: EngineController;
  private readonly loop: Loop;
  private readonly pluginManager: PluginManager;
  private readonly sceneTree: SceneTree;
  private readonly targetCanvas: Canvas;
  private currentScene: Node | null = null;
  private newFrameCallback: NewFrameCallback | null = null;

  constructor({ drawEngine, drawInstructionsQueue, drawInstructionsResolver, engineController, loop, pluginManager, sceneTree, targetCanvas }: EngineComponents) {
    this.drawEngine = drawEngine;
    this.drawInstructionsQueue = drawInstructionsQueue;
    this.drawInstructionsResolver = drawInstructionsResolver;
    this.engineController = engineController;
    this.loop = loop;
    this.pluginManager = pluginManager;
    this.sceneTree = sceneTree;
    this.targetCanvas = targetCanvas;
    this.setupController();
    this.setLoopCallback();
  }

  private setupController() {
    this.engineController.setup();
  }

  private setLoopCallback() {
    this.loop.setLoopCallback(this.executeLoop);
  }

  private executeLoop = (dt: number) => {
    this.processSceneTree(dt);
    this.draw();

    if (this.newFrameCallback) {
      this.newFrameCallback(this.getFrame());
    }
  };

  private processSceneTree(dt: number) {
    this.sceneTree.process(dt);
  }

  private draw() {
    this.drawEngine.draw(this.targetCanvas, this.getQueuedDrawSteps());
  }

  private getQueuedDrawSteps() {
    return this.drawInstructionsResolver.resolve(this.getQueuedInstructionsList());
  }

  private getQueuedInstructionsList() {
    const list = [];
    let instructions = this.drawInstructionsQueue.remove();

    while (instructions) {
      list.push(instructions);

      instructions = this.drawInstructionsQueue.remove();
    }

    return list;
  }

  private getFrame() {
    return this.targetCanvas.toImageBitmap();
  }

  public get isActive() {
    return this.engineController.isListening;
  }

  public replaceScene(Scene: new (id: string) => Node) {
    const sceneNode = new Scene('scene');

    if (this.currentScene) {
      this.removeSceneFromSceneTree(this.currentScene);
    }

    this.currentScene = sceneNode;
    this.addSceneToSceneTree(this.currentScene);
  }

  private removeSceneFromSceneTree(scene: Node) {
    this.sceneTree.removeScene(scene);
  }

  private addSceneToSceneTree(scene: Node) {
    this.sceneTree.addScene(scene);
  }

  public setNewFrameCallback(callback: NewFrameCallback) {
    this.newFrameCallback = callback;
  }

  public start() {
    this.startController();
    this.startPlugins();
    this.startSceneTree();
    this.startLoop();
  }

  private startController() {
    this.engineController.startListening();
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
    this.engineController.stopListening();
  }
}

interface EngineComponents {
  drawEngine: DrawEngine;
  drawInstructionsQueue: DrawInstructionsQueue;
  drawInstructionsResolver: DrawInstructionsResolver;
  engineController: EngineController;
  loop: Loop;
  pluginManager: PluginManager;
  sceneTree: SceneTree;
  targetCanvas: Canvas;
}
