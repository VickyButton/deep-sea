import type { NodeBaseOptions } from './nodeBase.types';
import { Signal } from '../../signal/Signal';

/** The base node class for all nodes. */
export abstract class NodeBase {
  /** Emits when a child node is added to the node. */
  public readonly childAddedSignal = new Signal<NodeBase>();
  /** Emits when a child node is removed from the node. */
  public readonly childRemovedSignal = new Signal<NodeBase>();
  /** The node's unique ID. */
  public readonly id: string;
  private _children = new Set<NodeBase>();
  private _parent: NodeBase | null = null;

  constructor(options: NodeBaseOptions) {
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
   * Adds a child node to the node.
   * @param node The child node to add.
   * @throws An error if the child node is the node itself.
   * @throws An error if the child node already has a parent.
   */
  public addChild(node: NodeBase) {
    if (this === node) {
      throw NodeBase.CircularRelationshipError;
    }

    if (node.parent !== null) {
      throw NodeBase.ChildHasParentError;
    }

    this._children.add(node);
    this.childAddedSignal.emit(node);
  }

  /**
   * Removes a child node from the node.
   * @param node The child node to remove.
   */
  public removeChild(node: NodeBase) {
    if (!this.isParentOf(node)) {
      return;
    }

    this._children.delete(node);
    this.childRemovedSignal.emit(node);
  }

  private isParentOf(node: NodeBase) {
    return this._children.has(node);
  }

  /**
   * Sets the node's parent node.
   * @param node The parent node to set.
   * @throws An error if the parent node is the node itself.
   */
  public setParent(node: NodeBase) {
    if (this === node) {
      throw NodeBase.CircularRelationshipError;
    }

    this._parent = node;
  }

  /** Unsets the node's parent node. */
  public unsetParent() {
    this._parent = null;
  }

  public static get ChildHasParentError() {
    return new Error('Cannot add parented child as a child.');
  }

  public static get CircularRelationshipError() {
    return new Error('Cannot create a circular relationship.');
  }
}
