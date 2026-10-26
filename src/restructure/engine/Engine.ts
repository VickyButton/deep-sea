import type { DrawInstructionsQueue } from './drawInstructionsQueue/drawInstructionsQueue.types';
import type { DrawInstructionsResolver } from './drawInstructionsResolver/DrawInstructionsResolver';
import type { DrawStepTranslator } from './drawStepTranslator/DrawStepTranslator';
import type { SceneConstructor } from './engine.types';
import type { Loop } from './loop/Loop';
import type { PluginManager } from './pluginManager/PluginManager';
import type { SceneTree } from './sceneTree/SceneTree';
import type { Canvas } from '../domain/canvas/canvas.types';
import type { DrawInstructions } from '../domain/drawInstructions/drawInstructions.types';
import type { DrawStep } from '../domain/drawStep/drawStep.types';
import type { Node } from '../nodes/node/Node';
import { Signal } from '../domain/signal/Signal';
import { SignalController } from '../domain/signalController/SignalController';
import { CanvasNode } from '../nodes';

/** Coordinates interactions between engine components. */
export class Engine {
  public readonly drawInstructionsQueue: DrawInstructionsQueue;
  public readonly drawInstructionsResolver: DrawInstructionsResolver;
  public readonly drawStepTranslator: DrawStepTranslator;
  /** Emitted when a new frame is rendered. The frame image bitmap is passed to callbacks. */
  public readonly new_frame_rendered = new Signal<ImageBitmap>(); // TODO: Emit from drawing-related component.
  public readonly loop: Loop;
  public readonly pluginManager: PluginManager;
  public readonly sceneTree: SceneTree;
  public readonly targetCanvas: Canvas;
  private readonly controller = new EngineController(this);
  private currentScene: Node | null = null;

  constructor(components: EngineComponents) {
    this.drawInstructionsQueue = components.drawInstructionsQueue;
    this.drawInstructionsResolver = components.drawInstructionsResolver;
    this.drawStepTranslator = components.drawStepTranslator;
    this.loop = components.loop;
    this.pluginManager = components.pluginManager;
    this.sceneTree = components.sceneTree;
    this.targetCanvas = components.targetCanvas;
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

  /** Sets up the engine. This should be called before starting the engine. */
  public setup() {
    this.setupController();
  }

  private setupController() {
    this.controller.setup();
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
    this.registerLoopSignals();
    this.registerSceneTreeSignals();
  }

  private registerLoopSignals() {
    this.controller.register(this.engine.loop.interval_elapsed, this.onIntervalElapsed);
  }

  private onIntervalElapsed = (dt: number) => {
    this.processSceneTree(dt);
    this.draw();
    this.emitNewFrameRenderedSignal(this.getFrame());
  };

  private processSceneTree(dt: number) {
    this.engine.sceneTree.process(dt);
  }

  private draw() {
    for (const step of this.getQueuedDrawSteps()) {
      this.executeDrawStep(step);
    }
  }

  private executeDrawStep(step: DrawStep) {
    this.getCanvasCallback(step)(this.engine.targetCanvas);
  }

  private getCanvasCallback(step: DrawStep) {
    return this.engine.drawStepTranslator.translate(step);
  }

  private getQueuedDrawSteps() {
    return this.engine.drawInstructionsResolver.resolve(this.getQueuedInstructionsList());
  }

  private getQueuedInstructionsList() {
    const list = [];
    let instructions = this.engine.drawInstructionsQueue.remove();

    while (instructions) {
      list.push(instructions);

      instructions = this.engine.drawInstructionsQueue.remove();
    }

    return list;
  }

  private emitNewFrameRenderedSignal(frame: ImageBitmap) {
    this.engine.new_frame_rendered.emit(frame);
  }

  private getFrame() {
    return this.engine.targetCanvas.toImageBitmap();
  }

  private registerSceneTreeSignals() {
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
