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
  private _children = new Set<Node>();
  private _parent: Node | null = null;

  constructor(options: NodeOptions) {
    this.id = options.id;
  }

  /** The node's child nodes. */
  public get children() {
    return Array.from(this._children);
  }

  /** The node's parent node, or null if it has no parent. */
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
      throw Node.CircularRelationshipError;
    }

    this._parent = node;
  }

  /** The scene tree to which the node belongs to or null if the node does not belong to a scene tree. */
  public get tree(): SceneTree | null {
    return this.parent?.tree ?? null;
  }

  /**
   * Adds a child node to the node.
   * @param node The child node to add.
   * @throws An error if the child node is the node itself.
   * @throws An error if the child node already has a parent.
   */
  public addChild(node: Node) {
    if (this === node) {
      throw Node.CircularRelationshipError;
    }

    if (node.parent !== null) {
      throw Node.ChildHasParentError;
    }

    this._children.add(node);
    node.parent = this;
    this.childAddedSignal.emit(node);
  }

  /**
   * Removes a child node from the node.
   * @param node The child node to remove.
   */
  public removeChild(node: Node) {
    if (this._children.delete(node)) {
      node.parent = null;
      this.childRemovedSignal.emit(node);
    }
  }

  public static get ChildHasParentError() {
    return new Error('Cannot add parented child as a child.');
  }

  public static get CircularRelationshipError() {
    return new Error('Cannot create a circular relationship.');
  }
}
