import type { DrawInstructionsQueue } from './drawInstructionsQueue/drawInstructionsQueue.types';
import type { DrawInstructionsResolver } from './drawInstructionsResolver/DrawInstructionsResolver';
import type { NewFrameCallback, SceneConstructor } from './engine.types';
import type { Loop } from './loop/Loop';
import type { LoopCallback } from './loop/loop.types';
import type { PluginManager } from './pluginManager/PluginManager';
import type { SceneTree } from './sceneTree/SceneTree';
import type { Canvas } from '../domain/canvas/canvas.types';
import type { DrawInstructions } from '../domain/drawInstructions/drawInstructions.types';
import type { DrawStep } from '../domain/drawStep/drawStep.types';
import type { DrawStepTranslator } from '../domain/drawStep/translator/DrawStepTranslator';
import type { Node } from '../nodes/node/Node';
import { SignalController } from '../domain';
import { CanvasNode } from '../nodes';

/** Coordinates interactions between engine components. */
export class Engine {
  public readonly drawInstructionsQueue: DrawInstructionsQueue;
  public readonly drawInstructionsResolver: DrawInstructionsResolver;
  public readonly drawStepTranslator: DrawStepTranslator;
  public readonly loop: Loop;
  public readonly pluginManager: PluginManager;
  public readonly sceneTree: SceneTree;
  public readonly targetCanvas: Canvas;
  private readonly controller = new EngineController(this);
  private currentScene: Node | null = null;
  private newFrameCallback: NewFrameCallback | null = null;

  constructor({ drawInstructionsQueue, drawInstructionsResolver, drawStepTranslator, loop, pluginManager, sceneTree, targetCanvas }: EngineComponents) {
    this.drawInstructionsQueue = drawInstructionsQueue;
    this.drawInstructionsResolver = drawInstructionsResolver;
    this.drawStepTranslator = drawStepTranslator;
    this.loop = loop;
    this.pluginManager = pluginManager;
    this.sceneTree = sceneTree;
    this.targetCanvas = targetCanvas;
  }

  /** Whether or not the engine is listening for signals. */
  public get isActive() {
    return this.controller.isListening;
  }

  /** Replaces the current scene in the scene tree. */
  public replaceScene(Scene: SceneConstructor) {
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

  /**
   * Sets the callback to execute when a new frame is ready.
   * @param callback The callback to execute when a new frame is ready.
   */
  public setNewFrameCallback(callback: NewFrameCallback) {
    this.newFrameCallback = callback;
  }

  /** Sets up the engine. This should be called before starting the engine. */
  public setup() {
    this.setupController();
    this.setupLoop();
  }

  private setupController() {
    this.controller.setup();
  }

  private setupLoop() {
    this.setLoopCallback(this.executeLoop);
  }

  private setLoopCallback(callback: LoopCallback) {
    this.loop.setLoopCallback(callback);
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
    for (const step of this.getQueuedDrawSteps()) {
      this.executeDrawStep(step);
    }
  }

  private executeDrawStep(step: DrawStep) {
    this.getCanvasCallback(step)(this.targetCanvas);
  }

  private getCanvasCallback(step: DrawStep) {
    return this.drawStepTranslator.translate(step);
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

  /** Starts the engine. */
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

  /** Stops the engine. */
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

/** The main controller used for listening for signals from engine components. */
class EngineController {
  private readonly controller = new SignalController();
  private readonly engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  public get isListening() {
    return this.controller.isListening;
  }

  public setup() {
    this.controller.register(this.engine.sceneTree.node_registered, this.onNodeRegistered);
    this.controller.register(this.engine.sceneTree.node_deregistered, this.onNodeDeregistered);
  }

  private onNodeRegistered = (node: Node) => {
    if (this.isCanvasNode(node)) {
      this.handleCanvasNodeRegistered(node);
    }
  };

  private isCanvasNode(node: Node): node is CanvasNode {
    return node instanceof CanvasNode;
  }

  private handleCanvasNodeRegistered(node: CanvasNode) {
    this.controller.register(node.redraw_requested, this.onCanvasNodeRedrawRequested);
  }

  private onCanvasNodeRedrawRequested = (instructions: DrawInstructions) => {
    this.engine.drawInstructionsQueue.add(instructions);
  };
  private onNodeDeregistered = (node: Node) => {
    if (this.isCanvasNode(node)) {
      this.handleCanvasNodeDeregistered(node);
    }
  };

  private handleCanvasNodeDeregistered(node: CanvasNode) {
    this.controller.deregister(node.redraw_requested, this.onCanvasNodeRedrawRequested);
  }

  public startListening() {
    this.controller.startListening();
  }

  public stopListening() {
    this.controller.stopListening();
  }
}

interface EngineComponents {
  drawInstructionsQueue: DrawInstructionsQueue;
  drawInstructionsResolver: DrawInstructionsResolver;
  drawStepTranslator: DrawStepTranslator;
  loop: Loop;
  pluginManager: PluginManager;
  sceneTree: SceneTree;
  targetCanvas: Canvas;
}
