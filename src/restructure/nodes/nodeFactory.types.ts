import type { CanvasNode } from './canvasNode/canvasNode.types';
import type { Node } from './node/node.types';
import type { Node2D } from './node2D/node2D.types';
import type { ShapeNode2D } from './shapeNode2D/shapeNode2D.types';

/** A factory for creating nodes. */
export interface NodeFactory<Registry extends NodeRegistry = NodeRegistry> {
  create<Type extends keyof Registry>(type: Type, id: string): Registry[Type];
}

/** A registry of nodes that can be created from a NodeFactory. */
export interface NodeRegistry {
  CanvasNode: CanvasNode;
  Node: Node;
  Node2D: Node2D;
  ShapeNode2D: ShapeNode2D;
}
