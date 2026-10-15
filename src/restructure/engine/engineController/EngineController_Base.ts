import type { EngineController } from './engineController.types';
import type { CanvasNode } from '../../nodes/canvasNode/canvasNode.types';
import type { Node } from '../../nodes/node/node.types';
import type { DrawCommand, Graphics } from '../graphics/graphics.types';
import type { SceneTree } from '../sceneTree/sceneTree.types';
import { SignalController_Main } from '../../controllers/signalController/SignalController_Main';
import { CanvasNode_Main } from '../../nodes/canvasNode/CanvasNode_Main';

/** The base implementation of the EngineController interface. */
export class EngineController_Base implements EngineController {
  private readonly controller = new SignalController_Main();
  private readonly graphics: Graphics;
  private readonly sceneTree: SceneTree;

  constructor({ graphics, sceneTree }: EngineControllerComponents) {
    this.graphics = graphics;
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
    return node instanceof CanvasNode_Main;
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

  public startListening() {
    this.controller.startListening();
  }

  public stopListening() {
    this.controller.stopListening();
  }
}

interface EngineControllerComponents {
  graphics: Graphics;
  sceneTree: SceneTree;
}
