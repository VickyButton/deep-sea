import type { CanvasNode } from './canvasNode/canvasNode.types';
import type { Node } from './node/node.types';
import type { Node2D } from './node2D/node2D.types';
import type { NodeFactory, NodeRegistry } from './nodeFactory.types';
import type { ShapeNode2D } from './shapeNode2D/shapeNode2D.types';
import type { SignalControllerConstructor } from '../controllers/signalController.types';
import type { SignalConstructor } from '../signals/signal/signal.types';
import { CanvasNode_Base } from './canvasNode/CanvasNode_Base';
import { Node_Base } from './node/Node_Base';
import { Node2D_Base } from './node2D/Node2D_Base';
import { ShapeNode2D_Base } from './shapeNode2D/ShapeNode2D_Base';

/** The base implementation of the NodeFactory interface. */
export class NodeFactory_Base implements NodeFactory {
  protected readonly dependencies: NodeFactoryDependencies;

  constructor(dependencies: NodeFactoryDependencies) {
    this.dependencies = dependencies;
  }

  public create(type: 'CanvasNode', id: string): CanvasNode;
  public create(type: 'Node', id: string): Node;
  public create(type: 'Node2D', id: string): Node2D;
  public create(type: 'ShapeNode2D', id: string): ShapeNode2D;
  public create(type: keyof NodeRegistry, id: string): NodeRegistry[typeof type] {
    switch (type) {
      case 'CanvasNode':
        return new CanvasNode_Base(id, this.dependencies);
      case 'Node':
        return new Node_Base(id, this.dependencies);
      case 'Node2D':
        return new Node2D_Base(id, this.dependencies);
      case 'ShapeNode2D':
        return new ShapeNode2D_Base(id, this.dependencies);
    }
  }
}

interface NodeFactoryDependencies {
  Signal: SignalConstructor;
  SignalController: SignalControllerConstructor;
}
