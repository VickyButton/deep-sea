import type { DrawInstructions } from '../../domain/drawInstructions/drawInstructions.types';
import type { Node } from '../../nodes/node/Node';
import type { DrawInstructionsQueue } from '../drawInstructionsQueue/drawInstructionsQueue.types';
import type { SceneTree } from '../sceneTree/sceneTree.types';
import { SignalController } from '../../domain/signalController/SignalController';
import { CanvasNode } from '../../nodes/canvasNode/CanvasNode';

/** The main controller used for listening for signals from engine components. */
export class EngineController {
  private readonly controller = new SignalController();
  private readonly drawInstructionsQueue: DrawInstructionsQueue;
  private readonly sceneTree: SceneTree;

  constructor({ drawInstructionsQueue, sceneTree }: EngineControllerComponents) {
    this.drawInstructionsQueue = drawInstructionsQueue;
    this.sceneTree = sceneTree;
  }

  public get isListening() {
    return this.controller.isListening;
  }

  public setup() {
    this.controller.register(this.sceneTree.node_registered, this.onNodeRegistered);
    this.controller.register(this.sceneTree.node_deregistered, this.onNodeDeregistered);
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
    this.drawInstructionsQueue.add(instructions);
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

interface EngineControllerComponents {
  drawInstructionsQueue: DrawInstructionsQueue;
  sceneTree: SceneTree;
}
