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
  /** Activates the node. */
  activate(): void;
  /** Deactivates the node. */
  deactivate(): void;
  /** Returns the node's parent, or null if the node has no parent. */
  getParent(): Node | null;
  /**
   * Sets the node's parent.
   * @param node The parent node.
   */
  setParent(node: Node | null): void;
  /** Returns the node's child nodes. */
  getChildren(): Node[];
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
}
