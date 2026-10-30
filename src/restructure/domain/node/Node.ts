import type { CanvasNode } from './canvasNode/CanvasNode';
import type { Node2D } from './node2D/Node2D';
import type { NodeBase } from './nodeBase/NodeBase';

export type Node = CanvasNode | Node2D | NodeBase;
