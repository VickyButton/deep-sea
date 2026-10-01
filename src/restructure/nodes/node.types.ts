import type { Signal } from '../signals/signal.types';

/** A node that encapsulate state, emits signals, and can be added to a node tree. */
export interface Node {
  /** Signal that is emitted when a child node is added to this node. */
  readonly child_added: Node_ChildAdded_Signal;
  /** Signal that is emitted when a child node is removed from this node. */
  readonly child_removed: Node_ChildRemoved_Signal;
  /** The node's unique ID. */
  readonly id: string;
  /** Signal that is emitted when this node enters a node tree. */
  readonly tree_entered: Node_TreeEntered_Signal;
  /** Signal that is emitted when this node exits a node tree. */
  readonly tree_exited: Node_TreeExited_Signal;
  /** Signal that is emitted when this node is stopped. */
  readonly started: Node_Started_Signal;
  /** Signal that is emitted when this node is stopped. */
  readonly stopped: Node_Stopped_Signal;
  /** The node's children. */
  get children(): Node[];
  /** Whether or not the node is active. A node is considered active while part of a node tree. */
  get isActive(): boolean;
  /** The node's parent, or null if the node does not have a parent. */
  get parent(): Node | null;
  /** The node tree which the node belongs to, or null if the node does not belong to a tree. */
  get tree(): NodeTree | null;
  /**
   * Adds a node to the node's children.
   * @param node The node to add to the node's children.
   */
  addChild(node: Node): void;
  /**
   * Enters the node and its children into a node tree.
   * @param tree The tree to enter.
   */
  enterTree(tree: NodeTree): void;
  /**
   * Removes a node from the node's children.
   * @param node The node to remove from the node's children.
   */
  removeChild(node: Node): void;
  /**
   * Exits the node and its children from a node tree.
   * @param tree The tree to exit.
   */
  exitTree(tree: NodeTree): void;
  /**
   * Sets the node's parent.
   * @param node The node to set as the node's parent, or null if removing a parent.
   */
  setParent(node: Node | null): void;
  /** Starts the node and its children, allowing processing and signal listening. */
  start(): void;
  /** Stops the node and its children, preventing processing and signal listening. */
  stop(): void;
}

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

/** A tree comprising of nodes */
export interface NodeTree {
  /** The root node of the tree. */
  readonly root: Node;
  /**
   * Adds a node to the tree.
   * @param node The node to add to the tree.
   */
  addNode(node: Node): void;
  /**
   * Removes a node from the tree.
   * @param node The node to remove from the tree.
   */
  removeNode(node: Node): void;
}
