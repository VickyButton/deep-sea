import type { NodeOptions } from './Node.types';
import type { SceneTree } from '../../SceneTree';
import { Signal } from '../../signal/Signal';

/** The base node class for all nodes. */
export abstract class Node {
  /** Emits when a child node is added to the node. */
  public readonly childAddedSignal = new Signal<Node>();
  /** Emits when a child node is removed from the node. */
  public readonly childRemovedSignal = new Signal<Node>();
  /** The node's unique ID. */
  public readonly id: string;
  /** Emits when the node enters a tree. */
  public readonly treeEnteredSignal = new Signal<SceneTree>();
  /** Emits when the node exits a tree. */
  public readonly treeExitedSignal = new Signal<SceneTree>();
  private _children = new Set<Node>();
  private _parent: Node | null = null;
  private _tree: SceneTree | null = null;

  /**
   * Creates a new Node instance.
   * @param options The options for the node.
   */
  constructor(options: NodeOptions) {
    this.id = options.id;
  }

  /** The node's child nodes. */
  public get children() {
    // Convert the child nodes into an array for better functionality.
    return Array.from(this._children);
  }

  /** The node's parent node or null if it has no parent. */
  public get parent() {
    return this._parent;
  }

  /**
   * Sets the node's parent node.
   * @param node The node to set as the node's parent.
   * @throws An error if the parent node is the node itself.
   */
  public set parent(node: Node | null) {
    if (this === node) {
      // Attempting to set self as parent, throw error.
      throw Node.CircularRelationshipError;
    }

    // Set this node's parent to the passed node.
    this._parent = node;
  }

  /** The scene tree to which the node belongs to or null if the node does not belong to a scene tree. */
  public get tree() {
    return this._tree;
  }

  /**
   * Enters the node and its children into a tree.
   * @param tree The tree to enter.
   */
  public enterTree(tree: SceneTree) {
    if (this.tree) {
      // Already in a tree, throw error.
      throw Node.AlreadyInTreeError;
    }

    // Enter self into tree before entering children into tree.
    this._tree = tree;

    // The node has entered the tree, emit signal.
    this.treeEnteredSignal.emit(tree);

    // Enter children into tree.
    this.children.forEach((child) => child.enterTree(tree));
  }

  /** Exits the node and its children from their current tree. */
  public exitTree() {
    // Exit children from tree before exiting self from tree.
    this.children.forEach((child) => child.exitTree());

    if (!this.tree) {
      // Not in a tree, exit early.
      return;
    }

    // Save tree reference before exiting.
    const previousTree = this.tree;

    // Exit self from tree.
    this._tree = null;

    // The node and its children have exited the tree, emit signal.
    this.treeExitedSignal.emit(previousTree);
  }

  /**
   * Adds a child node to the node.
   * @param node The child node to add.
   * @throws An error if the child node is the node itself.
   * @throws An error if the child node already has a parent.
   */
  public addChild(node: Node) {
    if (this === node) {
      // Attempting to add self as a child, throw error.
      throw Node.CircularRelationshipError;
    }

    if (node.parent !== null) {
      // Attempting to add parented node as a child, throw error.
      throw Node.ChildHasParentError;
    }

    // Add node to children.
    this._children.add(node);

    // Set node's parent to this node.
    node.parent = this;

    // Child has been fully added, emit signal.
    this.childAddedSignal.emit(node);
  }

  /**
   * Removes a child node from the node.
   * @param node The child node to remove.
   * @returns True if the child was removed and false if not.
   */
  public removeChild(node: Node) {
    if (!this._children.delete(node)) {
      // Passed node is not a child of this node, return false.
      return false;
    }

    // Set removed child node's parent to null.
    node.parent = null;

    // Child has been fully removed, emit signal.
    this.childRemovedSignal.emit(node);

    // Child was removed, return true.
    return true;
  }

  /** Thrown when attempting to enter a node into a tree while already in a tree. */
  public static get AlreadyInTreeError() {
    return new Error('Cannot enter a tree when already in a tree.');
  }

  /** Thrown when attempting to add a child node that already has a parent. */
  public static get ChildHasParentError() {
    return new Error('Cannot add parented child as a child.');
  }

  /** Thrown when attempting to add a parent node that would create a circular relationship. */
  public static get CircularRelationshipError() {
    return new Error('Cannot create a circular relationship.');
  }
}
