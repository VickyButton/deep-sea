import type { Node, NodeTree } from '../../nodes/node.types';
import type { Signal } from '../signal.types';

/** Emitted when a node has a child node added to it. The added child node is passed to callbacks. */
export type Node_ChildAdded_Signal = Signal<Node>;
/** Emitted when a node has a child removed added from it. The removed child node is passed to callbacks. */
export type Node_ChildRemoved_Signal = Signal<Node>;
/** Emitted when a node is started. */
export type Node_Started_Signal = Signal;
/** Emitted when a node is stopped. */
export type Node_Stopped_Signal = Signal;
/** Emitted when a node enters a node tree. The node tree entered is passed to callbacks. */
export type Node_TreeEntered_Signal = Signal<NodeTree>;
/** Emitted when a node exits a node tree. The node tree exited is passed to callbacks. */
export type Node_TreeExited_Signal = Signal<NodeTree>;
