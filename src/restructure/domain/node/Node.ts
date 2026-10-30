import type { DrawableNode } from './drawableNode/DrawableNode';
import type { Node2D } from './node2D/Node2D';
import type { NodeBase } from './nodeBase/NodeBase';

export type Node = DrawableNode | Node2D | NodeBase;
