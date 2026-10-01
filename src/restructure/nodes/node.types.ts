import type { Signal } from '../signals/signal.types';

/** A node that encapsulate state, emits signals, and can be added to a node tree. */
export interface Node {
  /** Emitted when the node has a child added to it. The added child is passed to callbacks. */
  readonly child_added: Signal<Node>;
  /** Emitted when the node has a child removed from it. The removed child is passed to callbacks. */
  readonly child_removed: Signal<Node>;
  /** The node's unique ID. */
  readonly id: string;
  /** Emitted when the node is started. */
  readonly started: Signal;
  /** Emitted when the node is stopped. */
  readonly stopped: Signal;
  /** Emitted when the node enters a tree. The entered tree is passed to callbacks. */
  readonly tree_entered: Signal<NodeTree>;
  /** Emitted when the node exits a tree. The exited tree is passed to callbacks. */
  readonly tree_exited: Signal<NodeTree>;
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
