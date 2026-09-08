/**
 * Core building blocks that encapsulate state and hierarchy.
 */
export interface Node {
  /** The node's unique ID. */
  id: string;
  /** A flag indicating if the node is active or not. */
  isActive: boolean;
  /** A flag indicating if the node is ready or not. */
  isReady: boolean;
  /** The node's parent, or null if the node has no parent. */
  get parent(): Node | null;
  /** True if node has a parent, false if not. */
  get hasParent(): boolean;
  /** The node's child nodes. */
  get children(): Node[];
  /** Activates the node. */
  activate(): void;
  /** Deactivates the node. */
  deactivate(): void;
  /** Readies the node. */
  ready(): void;
  /** Unreadies the node. */
  unready(): void;
  /**
   * Assigns a parent to the node. If the node already has a parent, use the `reparent` method
   * instead.
   * @param node The node to add as a parent.
   */
  assignParent(parent: Node): void;
  /** Unassigns the node's parent from the node. */
  unassignParent(): void;
  /**
   * Adds a child node to the node tree.
   * @param node The node to add as a child.
   */
  addChild(node: Node): void;
  /**
   * Removes a child node from the node tree.
   * @param node The child node to remove.
   */
  removeChild(node: Node): void;
  /**
   * Reparents the node.
   * @param newParent The new parent to assign to the node.
   */
  reparent(newParent: Node): void;
  /**
   * Traverses the node tree in post-order.
   * @param callback The callback to execute on each node.
   */
  traversePostorder(callback: (node: Node) => void): void;
}
